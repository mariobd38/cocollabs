package com.stringwiz.app.auth.controller;

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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomUserService customUserService;
    private final PasswordEncoder passwordEncoder;

    private final String jwtCookieName;


    public AuthController(
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil,
            CustomUserService customUserService,
            PasswordEncoder passwordEncoder,
            @Value("${JWT_COOKIE_ATTRIBUTE_NAME}") String jwtCookieName ) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.customUserService = customUserService;
        this.passwordEncoder = passwordEncoder;
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
            String sanitizedEmail = HtmlUtils.htmlEscape(requestBody.getEmail().toLowerCase().trim());
            String sanitizedFullName = HtmlUtils.htmlEscape(requestBody.getFullName().trim());
            String encodedPassword = passwordEncoder.encode(requestBody.getPassword());

            if (requestBody.getPassword().length() < 8) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Password must be at least 8 characters long");
            }

            if (!EmailValidator.getInstance().isValid(sanitizedEmail)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid email format");
            }
            // Check if user already exists
            if (customUserService.existsByEmail(sanitizedEmail)) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email already registered");
            }

            //TODO: add password validation check

            User user = new User(
                sanitizedFullName,
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
}
