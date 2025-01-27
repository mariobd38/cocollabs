package com.cocollabs.app.userSpace.repository;

import com.cocollabs.app.userSpace.model.UserSpaceActivity;
import com.cocollabs.app.space.model.Space;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserSpaceActivityRepository extends JpaRepository<UserSpaceActivity, Long> {
    @Query("SELECT usa.space FROM UserSpaceActivity usa " +
            "WHERE usa.user.id = :userId " +
            "ORDER BY usa.lastActiveAt DESC LIMIT 1")
    Optional<Space> findLastActiveSpaceForUser(@Param("userId") Long userId);
}
