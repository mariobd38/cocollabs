package com.stringwiz.app.auth.service;

import com.stringwiz.app.auth.controller.AuthController;
import com.stringwiz.app.auth.model.CustomJwt;
import com.stringwiz.app.auth.repository.CustomJwtRepository;
import com.stringwiz.app.user.model.User;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;

@Service
@Transactional
public class CustomJwtService {
    private final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final CustomJwtRepository customJwtRepository;
    private static final long CLEANUP_INTERVAL = 86400L;

    public CustomJwtService(CustomJwtRepository customJwtRepository) {
        this.customJwtRepository = customJwtRepository;
    }

    public void createToken(User user, String token, long validityInSeconds) {
        String tokenHash = hashToken(token);
        CustomJwt jwtToken = new CustomJwt(user, tokenHash, validityInSeconds);
        customJwtRepository.save(jwtToken);
    }

    public Optional<CustomJwt> findValidToken(String token, User user) {
        return customJwtRepository.findValidTokensByUser(user, new Timestamp(System.currentTimeMillis()))
                .stream()
                .filter(storedToken -> verifyToken(token, storedToken.getTokenHash()))
                .findFirst();
    }

    public Optional<CustomJwt> findByTokenHash(String tokenHash) {
        return customJwtRepository.findByTokenHash(tokenHash);
    }

    public void revokeToken(CustomJwt token) {
        logger.info("Revoking token: {}", token.getId());
        token.setRevoked(true);
        customJwtRepository.save(token);
    }

    public void revokeAllUserTokens(User user) {
        customJwtRepository.revokeAllUserTokens(user);
    }

    @Scheduled(fixedRate = CLEANUP_INTERVAL * 1000)
    public void cleanupExpiredTokens() {
        customJwtRepository.deleteExpiredTokens(new Timestamp(System.currentTimeMillis()));
    }

    private String hashToken(String token) {
        return BCrypt.hashpw(token, BCrypt.gensalt(12));
    }

    private boolean verifyToken(String token, String hashedToken) {
        try {
            return BCrypt.checkpw(token, hashedToken);
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

}
