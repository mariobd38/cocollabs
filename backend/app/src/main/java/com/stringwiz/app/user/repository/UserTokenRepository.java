package com.stringwiz.app.user.repository;

import com.stringwiz.app.user.model.UserToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserTokenRepository extends JpaRepository<UserToken, Long>  {
    Optional<UserToken> findByUserId(Long id);

    Optional<UserToken> findByUserIdAndSessionId(Long userId, String sessionId);

    Optional<UserToken> findTopByUserIdOrderByCreatedOnDesc(Long userId);

    void deleteByUserIdAndSessionId(Long userId, String sessionId);
}
