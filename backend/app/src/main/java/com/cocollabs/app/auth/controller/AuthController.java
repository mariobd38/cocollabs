package com.cocollabs.app.auth.controller;

import com.cocollabs.app.auth.model.CustomJwt;
import com.cocollabs.app.auth.service.CustomJwtService;
import com.cocollabs.app.auth.util.AuthValidationUtil;
import com.cocollabs.app.auth.util.CookieUtil;
import com.cocollabs.app.auth.util.JwtUtil;
import com.cocollabs.app.config.AppConfiguration;
import com.cocollabs.app.user.dto.UserAuthenticationDto;
import com.cocollabs.app.user.dto.UserRegistrationDto;
import com.cocollabs.app.user.service.CustomUserService;
import com.cocollabs.app.user.util.UserPlatformDtoConverter;
import com.cocollabs.app.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.apache.commons.validator.routines.EmailValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import com.cocollabs.app.user.model.User;
import com.cocollabs.app.user.model.User.UserOnboardingStep;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final Logger log = LoggerFactory.getLogger(AuthController.class);
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomUserService customUserService;
    private final CustomJwtService customJwtService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserPlatformDtoConverter userPlatform;
    private final AppConfiguration appConfiguration;

    public AuthController(
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil,
            CustomUserService customUserService,
            CustomJwtService customJwtService,
            PasswordEncoder passwordEncoder,
            UserRepository userRepository,
            UserPlatformDtoConverter userPlatform,
            AppConfiguration appConfiguration
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.customUserService = customUserService;
        this.customJwtService = customJwtService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.userPlatform = userPlatform;
        this.appConfiguration = appConfiguration;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserAuthenticationDto data,
                                   HttpServletRequest request,
                                   HttpServletResponse response) {
        try {
            String sanitizedEmail = HtmlUtils.htmlEscape(data.getEmail().toLowerCase().trim());
            if (!EmailValidator.getInstance().isValid(sanitizedEmail)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Invalid email format");
            }


            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    sanitizedEmail,
                                    data.getPassword()
                            )
                    );

            User user = (User) authenticate.getPrincipal();

            CookieUtil.deleteAllCookies(request, response);
            addTokensAsCookies(response, user);

            return ResponseEntity.ok().body(userPlatform.convertToDto(user));
        } catch (BadCredentialsException ex) {
            log.atError().log("Invalid user credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials");
        }
        catch (Exception ex) {
            log.atError().log("Unexpected error occurred during authentication");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during authentication");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserRegistrationDto requestBody,
                                    HttpServletRequest request,
                                    HttpServletResponse response) {
        try {
            String sanitizedEmail = HtmlUtils.htmlEscape(requestBody.getEmail().toLowerCase().trim());

            //email validation check
            AuthValidationUtil.ValidationResult emailValidation = AuthValidationUtil.validateEmail(sanitizedEmail);
            if (!emailValidation.isValid()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(emailValidation.getErrors().get(0));
            }

            // Check if user already exists
            if (customUserService.existsByEmail(sanitizedEmail)) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Email already registered");
            }

            //password validation check
            AuthValidationUtil.ValidationResult passwordValidation = AuthValidationUtil.validatePassword(requestBody.getPassword());
            if (!passwordValidation.isValid()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(passwordValidation.getErrors().get(0));
            }
            String encodedPassword = passwordEncoder.encode(requestBody.getPassword());

            User user = new User(
                    sanitizedEmail,
                    encodedPassword,
                    null
            );

            customUserService.createUser(user);

            CookieUtil.deleteAllCookies(request, response);
            //CookieUtil.addCookie(response, APP_ACCESS_TOKEN_NAME, jwtUtil.generateAccessToken(user),jwtUtil.getTokenValidityInSeconds());
            addTokensAsCookies(response, user);

            return ResponseEntity.ok().build();
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during registration");
        }
    }

    @GetMapping("/status")
    public ResponseEntity<?> getAuthStatus(@CookieValue(name = "${APP_ACCESS_TOKEN_LABEL}", required = false) String jwt) {
        Map<String, Boolean> statusResponse = new HashMap<>();

        if (jwt == null) {
            log.info("No JWT found, returning unauthenticated status");
            statusResponse.put("isAuthenticated", false);
            statusResponse.put("isOnboarded", false);
            return ResponseEntity.ok(statusResponse);
        }

        try {
            // Validate JWT and get user details
            String userEmail = jwtUtil.getUserEmailFromToken(jwt);
            Optional<User> user = userRepository.findByEmail(userEmail);

            if (user.isEmpty() || !jwtUtil.validateToken(jwt, user.get())) {
                statusResponse.put("isAuthenticated", false);
                statusResponse.put("isOnboarded", false);
                return ResponseEntity.ok(statusResponse);
            }

            // User is authenticated, check onboarding status
            statusResponse.put("isAuthenticated", true);
            statusResponse.put("isOnboarded", user.get().getOnboardingStep().equals(UserOnboardingStep.COMPLETE));
            return ResponseEntity.ok(statusResponse);

        } catch (Exception e) {
            log.error("Error validating JWT", e);
            statusResponse.put("isAuthenticated", false);
            statusResponse.put("isOnboarded", false);
            return ResponseEntity.ok(statusResponse);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        log.info("Received request to refresh token");
        try {
            String refreshToken = CookieUtil.getCookieValue(request, appConfiguration.getRefreshTokenLabel());
            if (refreshToken == null) {
                log.warn("No refresh token found in request");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            // Validate JWT format and expiration
            String userEmail = jwtUtil.getUserEmailFromToken(refreshToken);
            Optional<User> user = userRepository.findByEmail(userEmail);

            if (user.isEmpty() || !jwtUtil.validateToken(refreshToken, user.get())) {
                log.warn("Invalid refresh token for user");
                CookieUtil.deleteAllCookies(request, response);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
            }

            // Find and validate token in database
            Optional<CustomJwt> storedToken = customJwtService.findValidToken(refreshToken, user.get());
            if (storedToken.isEmpty()) {
                log.warn("Refresh token revoked or expired for user");
                CookieUtil.deleteAllCookies(request, response);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token revoked or expired");
            }
            log.info("Generating new tokens for user");

            // Generate new tokens
            String newAccessToken = jwtUtil.generateAccessToken(user.get());
            String newRefreshToken = jwtUtil.generateRefreshToken(user.get());

            // Revoke old token and create new one
            customJwtService.revokeToken(storedToken.get());
            customJwtService.createToken(user.get(), newRefreshToken, jwtUtil.getRefreshTokenValidityInSeconds());
            // Set new cookies
            CookieUtil.addCookie(response, appConfiguration.getAccessTokenLabel(), newAccessToken, jwtUtil.getAccessTokenValidityInSeconds());
            CookieUtil.addCookie(response, appConfiguration.getRefreshTokenLabel(), newRefreshToken, jwtUtil.getRefreshTokenValidityInSeconds());

            log.info("Successfully refreshed tokens for user");
            return ResponseEntity.ok().build();
        } catch (Exception ex) {
            log.error("Error refreshing token", ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error refreshing token");
        }
    }

    @GetMapping("/logout")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        CookieUtil.deleteAllCookies(request, response);
        return ResponseEntity.noContent().build();
    }

    private void addTokensAsCookies(HttpServletResponse response, User user) {
        String accessToken = jwtUtil.generateAccessToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);

        customJwtService.createToken(user, refreshToken, jwtUtil.getRefreshTokenValidityInSeconds());

        CookieUtil.addCookie(response, appConfiguration.getAccessTokenLabel(), accessToken, jwtUtil.getAccessTokenValidityInSeconds());
        CookieUtil.addCookie(response, appConfiguration.getRefreshTokenLabel(), refreshToken, jwtUtil.getRefreshTokenValidityInSeconds());
    }

}
