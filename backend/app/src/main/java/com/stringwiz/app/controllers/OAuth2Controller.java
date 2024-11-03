package com.stringwiz.app.controllers;

import com.stringwiz.app.models.User;
import com.stringwiz.app.models.UserToken;
import com.stringwiz.app.repositories.UserRepository;
import com.stringwiz.app.repositories.UserTokenRepository;
import com.stringwiz.app.services.CustomUserService;
import com.stringwiz.app.services.OAuth2TokenRetrievalService;
import com.stringwiz.app.services.UserTokenService;
import com.stringwiz.app.utils.CookieUtil;
import com.stringwiz.app.utils.JwtOAuth2Util;
import com.stringwiz.app.utils.JwtUtil;
import com.stringwiz.app.utils.UserPlatformDtoConverter;
import com.stringwiz.app.web.UserPlatformDto;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

@RestController
public class OAuth2Controller {
    @Autowired private UserRepository userRepository;
    @Autowired private OAuth2TokenRetrievalService oAuth2TokenRetrievalService;
    @Autowired private JwtOAuth2Util jwtOAuth2Util;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private CustomUserService customUserService;
    @Autowired private UserTokenService userTokenService;
    @Autowired private UserTokenRepository userTokenRepository;
    @Value("${JWT_COOKIE_ATTRIBUTE_NAME}")
    private String JWT_COOKIE_NAME;

    @GetMapping("/google/callback")
    public ResponseEntity<?> exchangeAuthorizationForUserData(@RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response) {
        try {
            Map<String, String> tokens = oAuth2TokenRetrievalService.getTokens(code);
            String jwt = tokens.get("jwt");
            String accessToken = tokens.get("accessToken");
            String refreshToken = tokens.get("refreshToken");

            Map<String, String> userData = jwtOAuth2Util.getUserDataFromToken(jwt);

            User newUser = new User(userData.get("fullName"), userData.get("email"), null, userData.get("picture"));
            Optional<User> existingUser = userRepository.findByEmail(newUser.getEmail());
            User userToSave = existingUser.orElse(newUser);

            customUserService.saveUser(userToSave);

            Long userId = userToSave.getId();
            String sessionId = request.getSession().getId();

            Optional<UserToken> existingToken = userTokenRepository.findByUserIdAndSessionId(userId,sessionId);

            if (existingToken.isPresent()) {
                UserToken userToken = existingToken.get();
                updateUserToken(userToken, accessToken, refreshToken, sessionId);
            } else {
                UserToken userToken = createUserToken(userId, accessToken, refreshToken,sessionId);
                userTokenService.saveUserToken(userToken);
            }

            String appJwt = jwtUtil.generateToken(userToSave);
            CookieUtil.addCookie(response, JWT_COOKIE_NAME, appJwt,jwtUtil.getTokenValidityInSeconds());
            UserPlatformDto userDto = UserPlatformDtoConverter.convertToDto(userToSave);
            return ResponseEntity.ok().body(userDto);
            //return ResponseEntity.ok().body(user.orElse(newUser));
        } catch (UnsupportedJwtException jwtException) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Cannot verify JWS Signature");
        }
        catch(Exception exception) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    private void updateUserToken(UserToken userToken, String accessToken, String refereshToken, String sessionId) {
        userToken.setAccessToken(accessToken);
        userToken.setRefreshToken(refereshToken);
        userToken.setCreatedOn(new Timestamp(new Date().getTime()));
        userToken.setSessionId(sessionId);
        userTokenRepository.save(userToken);
    }

    private UserToken createUserToken(Long userId, String accessToken, String refreshToken, String sessionId) {
        return UserToken.builder()
                .userId(userId)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .createdOn(new Timestamp(new Date().getTime()))
                .sessionId(sessionId)
                .build();
    }
}