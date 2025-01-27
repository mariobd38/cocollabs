package com.cocollabs.app.auth.repository;

import com.cocollabs.app.auth.model.CustomJwt;
import com.cocollabs.app.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public interface CustomJwtRepository extends JpaRepository<CustomJwt, Long> {
    Optional<CustomJwt> findByTokenHash(String tokenHash);

    @Query("SELECT t FROM CustomJwt t WHERE t.user = :user AND t.revoked = false AND t.expiryDate > :now")
    List<CustomJwt> findValidTokensByUser(@Param("user") User user, @Param("now") Timestamp now);

    @Modifying
    @Query("UPDATE CustomJwt t SET t.revoked = true WHERE t.user = :user")
    void revokeAllUserTokens(@Param("user") User user);

    @Modifying
    @Query("DELETE FROM CustomJwt t WHERE t.expiryDate < :now")
    void deleteExpiredTokens(@Param("now") Timestamp now);

    @Modifying
    @Query("DELETE FROM CustomJwt t WHERE t.revoked = true AND t.issuedAt < :cutoffTime")
    void deleteRevokedTokens(@Param("cutoffTime") Timestamp cutoffTime);
}
