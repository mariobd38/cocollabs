package com.stringwiz.app.auth.controller;

import com.stringwiz.app.auth.util.AuthValidationUtil;
import com.stringwiz.app.user.repository.UserRepository;
import com.stringwiz.app.user.service.CustomUserService;
import com.stringwiz.app.auth.util.CookieUtil;
import com.stringwiz.app.auth.util.JwtUtil;
import com.stringwiz.app.user.util.UserPlatformDtoConverter;
import com.stringwiz.app.user.dto.UserAuthenticationDto;
import com.stringwiz.app.user.dto.UserRegistrationDto;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import com.stringwiz.app.user.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomUserService customUserService;
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final String jwtCookieName;


    public AuthController(
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil,
            CustomUserService customUserService,
            PasswordEncoder passwordEncoder,
            UserDetailsService userDetailsService,
            UserRepository userRepository,
            @Value("${JWT_COOKIE_ATTRIBUTE_NAME}") String jwtCookieName ) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.customUserService = customUserService;
        this.passwordEncoder = passwordEncoder;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
        this.jwtCookieName = jwtCookieName;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserAuthenticationDto request, HttpServletResponse response) {
        try {
            String sanitizedEmail = HtmlUtils.htmlEscape(request.getEmail().toLowerCase().trim());
            if (!EmailValidator.getInstance().isValid(sanitizedEmail)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid email format");
            }

            Authentication authenticate = authenticationManager
                .authenticate(
                    new UsernamePasswordAuthenticationToken(
                        sanitizedEmail,
                        request.getPassword()
                )
            );

            User user = (User) authenticate.getPrincipal();
            user.setPassword(null);
            CookieUtil.addCookie(response, jwtCookieName, jwtUtil.generateToken(user),jwtUtil.getTokenValidityInSeconds());

            //UserPlatformDto userDto = new UserPlatformDto(user.getFullName(), user.getEmail(), user.getPicture(), null);
            return ResponseEntity.ok().body(UserPlatformDtoConverter.convertToDto(user));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid credentials");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred during authentication");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserRegistrationDto requestBody, HttpServletResponse response) {
        try {
            AuthValidationUtil authValidationUtil = new AuthValidationUtil();
            String sanitizedFullName = HtmlUtils.htmlEscape(requestBody.getFullName().trim());
            String sanitizedEmail = HtmlUtils.htmlEscape(requestBody.getEmail().toLowerCase().trim());

            //full name validation check
            AuthValidationUtil.ValidationResult fullNameValidation = AuthValidationUtil.validateFullName(sanitizedFullName);
            if (!fullNameValidation.isValid()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(fullNameValidation.getErrors().get(0));
            }

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
                AuthValidationUtil.capitalizeName(sanitizedFullName),
                sanitizedEmail,
                encodedPassword,
                null
            );
            //emailUtil.sendEmail(request.getEmail());
            customUserService.createUser(user);

            CookieUtil.deleteCookie(response,jwtCookieName);
            CookieUtil.addCookie(response, jwtCookieName, jwtUtil.generateToken(user),jwtUtil.getTokenValidityInSeconds());

            return ResponseEntity.ok().build();
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred during registration");
        }
    }

    @GetMapping("/status")
    public ResponseEntity<?> checkAuthStatus(@CookieValue(name = "${JWT_COOKIE_ATTRIBUTE_NAME}", required = false) String jwt) {
        if (jwt == null) {
            return ResponseEntity.ok(Map.of(
                "isAuthenticated", false,
                "isOnboarded", false
        ));
        }
        try {
            String email = jwtUtil.getUserEmailFromToken(jwt);
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            Optional<User> optionalUser = userRepository.findByEmail(email);

            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
            }
            boolean isOnboarded = optionalUser.get().isOnboardingComplete();
            boolean isAuthenticated = jwtUtil.validateToken(jwt,userDetails);
            return ResponseEntity.ok(Map.of(
                    "isAuthenticated", isAuthenticated,
                    "isOnboarded", isOnboarded
            ));
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("isAuthenticated", false, "isOnboarded",false));
        }
    }
}
