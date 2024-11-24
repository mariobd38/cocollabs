package com.stringwiz.app.user.controller;

import com.stringwiz.app.user.model.User;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final UserTokenRepository userTokenRepository;

    public UserController(
            UserRepository userRepository,
            JwtUtil jwtUtil,
            UserTokenRepository userTokenRepository) {
        this.userRepository = userRepository;
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
