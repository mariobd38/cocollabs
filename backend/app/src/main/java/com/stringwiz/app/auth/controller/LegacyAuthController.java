//package com.stringwiz.app.auth.controller;
//
//import com.stringwiz.app.auth.model.CustomJwt;
//import com.stringwiz.app.auth.service.CustomJwtService;
//import com.stringwiz.app.auth.util.AuthValidationUtil;
//import com.stringwiz.app.user.repository.UserRepository;
//import com.stringwiz.app.user.repository.UserTokenRepository;
//import com.stringwiz.app.user.service.CustomUserService;
//import com.stringwiz.app.auth.util.CookieUtil;
//import com.stringwiz.app.auth.util.JwtUtil;
//import com.stringwiz.app.user.util.UserPlatformDtoConverter;
//import com.stringwiz.app.user.dto.UserAuthenticationDto;
//import com.stringwiz.app.user.dto.UserRegistrationDto;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import jakarta.transaction.Transactional;
//import jakarta.validation.Valid;
//import org.apache.commons.validator.routines.EmailValidator;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import com.stringwiz.app.user.model.User;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.CookieValue;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.util.HtmlUtils;
//
//import java.util.Map;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/auth")
//public class LegacyAuthController {
//    private final Logger logger = LoggerFactory.getLogger(LegacyAuthController.class);
//    //private static final String ACCESS_TOKEN_COOKIE_NAME = "access_token";
//    private static final String REFRESH_TOKEN_COOKIE_NAME = "refresh_token";
//    private final AuthenticationManager authenticationManager;
//    private final JwtUtil jwtUtil;
//    private final CustomUserService customUserService;
//    private final CustomJwtService customJwtService;
//    private final PasswordEncoder passwordEncoder;
//    private final UserDetailsService userDetailsService;
//    private final UserRepository userRepository;
//    private final UserTokenRepository userTokenRepository;
//    @Value("${APP_ACCESS_TOKEN_NAME}")
//    private String APP_ACCESS_TOKEN_NAME;
//
//
//    public LegacyAuthController(
//            AuthenticationManager authenticationManager,
//            JwtUtil jwtUtil,
//            CustomUserService customUserService,
//            CustomJwtService customJwtService,
//            PasswordEncoder passwordEncoder,
//            UserDetailsService userDetailsService,
//            UserRepository userRepository,
//            UserTokenRepository userTokenRepository ) {
//        this.authenticationManager = authenticationManager;
//        this.jwtUtil = jwtUtil;
//        this.customUserService = customUserService;
//        this.customJwtService = customJwtService;
//        this.passwordEncoder = passwordEncoder;
//        this.userDetailsService = userDetailsService;
//        this.userRepository = userRepository;
//        this.userTokenRepository = userTokenRepository;
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@Valid @RequestBody UserAuthenticationDto request, HttpServletResponse response) {
//        try {
//            String sanitizedEmail = HtmlUtils.htmlEscape(request.getEmail().toLowerCase().trim());
//            if (!EmailValidator.getInstance().isValid(sanitizedEmail)) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                        .body("Invalid email format");
//            }
//
//            Authentication authenticate = authenticationManager
//                    .authenticate(
//                            new UsernamePasswordAuthenticationToken(
//                                    sanitizedEmail,
//                                    request.getPassword()
//                            )
//                    );
//
//            User user = (User) authenticate.getPrincipal();
//            addTokensAsCookies(response, user);
//            //user.setPassword(null);
//
//
//            //CookieUtil.addCookie(response, jwtCookieName, jwtUtil.generateToken(user),jwtUtil.getTokenValidityInSeconds());
//            //CookieUtil.addCookie(response, jwtCookieName, jwtUtil.generateAccessToken(user),jwtUtil.getTokenValidityInSeconds());
//
//            //UserPlatformDto userDto = new UserPlatformDto(user.getFullName(), user.getEmail(), user.getPicture(), null);
//            return ResponseEntity.ok().body(UserPlatformDtoConverter.convertToDto(user));
//        } catch (BadCredentialsException ex) {
//            logger.atError().log("Invalid user credentials");
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body("Invalid credentials");
//        }
//        catch (Exception ex) {
//            logger.atError().log("Unexpected error occurred during authentication");
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("An error occurred during authentication");
//        }
//    }
//
//    @PostMapping("/signup")
//    public ResponseEntity<?> signup(@RequestBody UserRegistrationDto requestBody, HttpServletResponse response) {
//        try {
//            String sanitizedFullName = HtmlUtils.htmlEscape(requestBody.getFullName().trim());
//            String sanitizedEmail = HtmlUtils.htmlEscape(requestBody.getEmail().toLowerCase().trim());
//
//            //full name validation check
//            AuthValidationUtil.ValidationResult fullNameValidation = AuthValidationUtil.validateFullName(sanitizedFullName);
//            if (!fullNameValidation.isValid()) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                        .body(fullNameValidation.getErrors().get(0));
//            }
//
//            //email validation check
//            AuthValidationUtil.ValidationResult emailValidation = AuthValidationUtil.validateEmail(sanitizedEmail);
//            if (!emailValidation.isValid()) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                        .body(emailValidation.getErrors().get(0));
//            }
//
//            // Check if user already exists
//            if (customUserService.existsByEmail(sanitizedEmail)) {
//                return ResponseEntity.status(HttpStatus.CONFLICT)
//                        .body("Email already registered");
//            }
//
//            //password validation check
//            AuthValidationUtil.ValidationResult passwordValidation = AuthValidationUtil.validatePassword(requestBody.getPassword());
//            if (!passwordValidation.isValid()) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                        .body(passwordValidation.getErrors().get(0));
//            }
//            String encodedPassword = passwordEncoder.encode(requestBody.getPassword());
//
//            User user = new User(
//                    AuthValidationUtil.capitalizeName(sanitizedFullName),
//                    sanitizedEmail,
//                    encodedPassword,
//                    null
//            );
//            customUserService.createUser(user);
//
//            CookieUtil.deleteCookie(response,APP_ACCESS_TOKEN_NAME);
//            //CookieUtil.addCookie(response, jwtCookieName, jwtUtil.generateToken(user),jwtUtil.getTokenValidityInSeconds());
//            CookieUtil.addCookie(response, APP_ACCESS_TOKEN_NAME, jwtUtil.generateAccessToken(user),jwtUtil.getTokenValidityInSeconds());
//
//            return ResponseEntity.ok().build();
//        } catch (Exception ex) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("An error occurred during registration");
//        }
//    }
//
//    @GetMapping("/status")
//    public ResponseEntity<?> checkAuthStatus(@CookieValue(name = "${APP_ACCESS_TOKEN_NAME}", required = false) String jwt) {
//        if (jwt == null) {
//            logger.atError().log("No JWT found");
////            return ResponseEntity.ok(Map.of(
////                    "isAuthenticated", false,
////                    "isOnboarded", false
////            ));
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT not found");
//        }
//        try {
//            String email = jwtUtil.getUserEmailFromToken(jwt);
//            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
//
//            Optional<User> optionalUser = userRepository.findByEmail(email);
//
//            if (optionalUser.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
//            }
//            boolean isOnboarded = optionalUser.get().isOnboardingComplete();
//            if (!jwtUtil.validateToken(jwt, userDetails)) {
//                // Return 401 specifically for expired token
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                        .body(Map.of("error", "Token expired"));
//            }
//
//            return ResponseEntity.ok(Map.of(
//                    "isAuthenticated", true,
//                    "isOnboarded", isOnboarded
//            ));
//        } catch(Exception e) {
//            logger.atDebug().log("Error occurred while checking authentication status");
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("isAuthenticated", false, "isOnboarded",false));
//        }
//    }
//
//    @PostMapping("/refresh")
//    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
//        logger.info("Received request to refresh token");
//        try {
//            String refreshToken = CookieUtil.getCookieValue(request, REFRESH_TOKEN_COOKIE_NAME);
//            if (refreshToken == null) {
//                logger.warn("No refresh token found in request");
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No refresh token");
//            }
//
//            // Validate JWT format and expiration
//            String userEmail = jwtUtil.getUserEmailFromToken(refreshToken);
//            Optional<User> user = userRepository.findByEmail(userEmail);
//
//            if (user.isEmpty() || !jwtUtil.validateToken(refreshToken, user.get())) {
//                logger.warn("Invalid refresh token for user");
//                CookieUtil.deleteAllCookies(request, response);
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
//            }
//
//            // Find and validate token in database
//            Optional<CustomJwt> storedToken = customJwtService.findValidToken(refreshToken, user.get());
//            if (storedToken.isEmpty()) {
//                logger.warn("Refresh token revoked or expired for user");
//                CookieUtil.deleteAllCookies(request, response);
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token revoked or expired");
//            }
//            logger.info("Generating new tokens for user");
//
//            // Generate new tokens
//            String newAccessToken = jwtUtil.generateAccessToken(user.get());
//            String newRefreshToken = jwtUtil.generateRefreshToken(user.get());
//
//            // Revoke old token and create new one
//            customJwtService.revokeToken(storedToken.get());
//            customJwtService.createToken(user.get(), newRefreshToken, jwtUtil.getRefreshTokenValidityInSeconds());
//            // Set new cookies
//            CookieUtil.addCookie(response, APP_ACCESS_TOKEN_NAME, newAccessToken, jwtUtil.getAccessTokenValidityInSeconds());
//            CookieUtil.addCookie(response, REFRESH_TOKEN_COOKIE_NAME, newRefreshToken, jwtUtil.getRefreshTokenValidityInSeconds());
//
//            logger.info("Successfully refreshed tokens for user");
//            return ResponseEntity.ok().build();
//        } catch (Exception ex) {
//            logger.error("Error refreshing token", ex);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Error refreshing token");
//        }
//    }
//
//    @GetMapping("/logout")
//    @Transactional
//    @PreAuthorize("isAuthenticated()")
//    public ResponseEntity<?> logout(@AuthenticationPrincipal User user, HttpServletRequest request, HttpServletResponse response) {
//        String sessionId = request.getSession(false) != null ? request.getSession(false).getId() : null;
//
//        if (sessionId != null) {
//            // Delete token and invalidate session atomically
//            userTokenRepository.findByUserIdAndSessionId(user.getId(), sessionId)
//                    .ifPresent(token -> {
//                        userTokenRepository.deleteByUserIdAndSessionId(user.getId(), sessionId);
//                        request.getSession(false).invalidate();
//                    });
//        }
//
//        CookieUtil.deleteAllCookies(request, response);
//        return ResponseEntity.noContent().build();
//    }
//
//    private void addTokensAsCookies(HttpServletResponse response, User user) {
//        String accessToken = jwtUtil.generateAccessToken(user);
//        String refreshToken = jwtUtil.generateRefreshToken(user);
//
//        customJwtService.createToken(user, refreshToken, jwtUtil.getRefreshTokenValidityInSeconds());
//
//        CookieUtil.addCookie(response, APP_ACCESS_TOKEN_NAME, accessToken, jwtUtil.getAccessTokenValidityInSeconds());
//        CookieUtil.addCookie(response, REFRESH_TOKEN_COOKIE_NAME, refreshToken, jwtUtil.getRefreshTokenValidityInSeconds());
//        if (refreshToken == null) {
//            logger.error("Refresh token is null");
//        }
//
//    }
//
//}
