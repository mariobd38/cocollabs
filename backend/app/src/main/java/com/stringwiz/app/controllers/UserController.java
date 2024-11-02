package com.stringwiz.app.controllers;

import com.stringwiz.app.models.User;
import com.stringwiz.app.models.UserToken;
import com.stringwiz.app.repositories.UserRepository;
import com.stringwiz.app.repositories.UserTokenRepository;
import com.stringwiz.app.utils.JwtUtil;
import com.stringwiz.app.utils.UserPlatformDtoConverter;
import com.stringwiz.app.web.UserPlatformDto;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired UserRepository userRepository;
    @Autowired JwtUtil jwtUtil;
    @Autowired UserTokenRepository userTokenRepository;

    @GetMapping("/api/user/getInfo")
    public ResponseEntity<?> getUserInfo(@CookieValue(name = "${JWT_COOKIE_ATTRIBUTE_NAME}", required = false) String jwt) {
        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT token not found in cookie");
        }
        try {
            String email = jwtUtil.getUserEmailFromToken(jwt);
            Optional<User> optionalUser = userRepository.findByEmail(email);

            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            User user = optionalUser.get();
            //ProfileDto profileDto = new UserPlatformDto().getProfileDto(user.getProfile());
            //UserPlatformDto userPlatformDto = new UserPlatformDto(user.getFullName(),user.getEmail(), user.getPicture(), profileDto);
            UserPlatformDto userPlatformDto = UserPlatformDtoConverter.convertToDto(user);
            return ResponseEntity.ok(userPlatformDto);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the request");
        }
    }

    @GetMapping("/api/user/exists")
    public ResponseEntity<Boolean> doesUserExist(@RequestParam("email") String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return ResponseEntity.ok(user.isPresent());
    }

    @GetMapping("/api/user/isOAuth")
    public ResponseEntity<Boolean> isOAuthUser(@RequestParam("email") String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            User existing = user.get();
            return ResponseEntity.ok(existing.getPassword() == null || existing.getPassword().isEmpty());
        }
        return ResponseEntity.ok(false);
    }

    @GetMapping("/api/user/isUserOnboarded")
    public ResponseEntity<Boolean> isUserOnboarded(@RequestParam("email") String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            User existing = user.get();
            return ResponseEntity.ok(existing.isOnboardingComplete());
        }
        return ResponseEntity.ok(false);
    }

    @GetMapping("/api/user/logout")
    @Transactional
    public ResponseEntity<?> logout(@AuthenticationPrincipal User user, HttpServletRequest request, HttpServletResponse response) {

        String sessionId = request.getSession().getId(); // Retrieve session ID before invalidating the session
        // Find the token using the session ID
        Optional<UserToken> userToken = userTokenRepository.findByUserIdAndSessionId(user.getId(), sessionId);

        if (userToken.isPresent()) {
            userTokenRepository.deleteByUserIdAndSessionId(user.getId(), sessionId);
        }

        request.getSession().invalidate();

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                cookie.setMaxAge(0);
                cookie.setValue(null);
                cookie.setPath("/");
                response.addCookie(cookie);
            }
        }
        return ResponseEntity.noContent().build();
    }
}
