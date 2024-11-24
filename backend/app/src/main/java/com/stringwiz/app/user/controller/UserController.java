package com.stringwiz.app.user.controller;

import com.stringwiz.app.user.model.ThemePreference;
import com.stringwiz.app.user.model.User;
import com.stringwiz.app.user.model.UserPreference;
import com.stringwiz.app.user.repository.UserPreferenceRepository;
import com.stringwiz.app.user.repository.UserRepository;
import com.stringwiz.app.user.repository.UserTokenRepository;
import com.stringwiz.app.auth.util.CookieUtil;
import com.stringwiz.app.auth.util.JwtUtil;
import com.stringwiz.app.user.util.UserPlatformDtoConverter;
import com.stringwiz.app.user.dto.UserPlatformDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Email;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserRepository userRepository;
    private final UserPreferenceRepository userPreferenceRepository;
    private final JwtUtil jwtUtil;
    private final UserTokenRepository userTokenRepository;

    public UserController(
            UserRepository userRepository,
            UserPreferenceRepository userPreferenceRepository,
            JwtUtil jwtUtil,
            UserTokenRepository userTokenRepository) {
        this.userRepository = userRepository;
        this.userPreferenceRepository = userPreferenceRepository;
        this.jwtUtil = jwtUtil;
        this.userTokenRepository = userTokenRepository;
    }

    @GetMapping("/getInfo")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getUserInfo(@CookieValue(name = "${JWT_COOKIE_ATTRIBUTE_NAME}", required = false) String jwt) {
        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication required");
        }
        try {
            String email = jwtUtil.getUserEmailFromToken(jwt);
            Optional<User> optionalUser = userRepository.findByEmail(email);

            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found");
            }

            User user = optionalUser.get();
            UserPlatformDto userPlatformDto = UserPlatformDtoConverter.convertToDto(user);
            return ResponseEntity.ok(userPlatformDto);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred while processing the request");
        }
    }

    @PutMapping("/updateTheme")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateTheme(@AuthenticationPrincipal User user, @RequestBody ThemePreference newTheme) {
        try {
            if (user == null) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body("User not authenticated");
            }

            UserPreference userPreference = user.getUserPreference();

            if (userPreference == null) {
                // Create and save UserPreference first
                userPreference = new UserPreference(newTheme);
                userPreference = userPreferenceRepository.save(userPreference);
                user.setUserPreference(userPreference); // Link saved preference to user
            } else {
                // Update the existing UserPreference
                userPreference.setTheme(newTheme);
                userPreferenceRepository.save(userPreference);
            }

            // Save the user with updated preference
            userRepository.save(user);

            return ResponseEntity.ok().build();
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while updating the theme preference");
        }
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> doesUserExist(@RequestParam("email") @Email String email) {
        return ResponseEntity.ok(userRepository.findByEmail(email).isPresent());
    }

    @GetMapping("/isOAuth")
    public ResponseEntity<Boolean> isOAuthUser(@RequestParam("email") @Email String email) {
        return ResponseEntity.ok(userRepository.findByEmail(email)
            .map(user -> !StringUtils.hasLength(user.getPassword()))
            .orElse(false));
    }

    @GetMapping("/isUserOnboarded")
    public ResponseEntity<Boolean> isUserOnboarded(@RequestParam("email") @Email String email) {
        return ResponseEntity.ok(userRepository.findByEmail(email)
                .map(User::isOnboardingComplete)
                .orElse(false));
    }

    @GetMapping("/logout")
    @Transactional
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> logout(@AuthenticationPrincipal User user, HttpServletRequest request, HttpServletResponse response) {
        String sessionId = request.getSession().getId();

        // Delete token and invalidate session atomically
        userTokenRepository.findByUserIdAndSessionId(user.getId(), sessionId)
            .ifPresent(token -> {
                userTokenRepository.deleteByUserIdAndSessionId(user.getId(), sessionId);
                request.getSession().invalidate();
            });

        CookieUtil.deleteAllCookies(request,response);
        return ResponseEntity.noContent().build();
    }
}
