package com.stringwiz.app.userSpace.repository;

import com.stringwiz.app.space.model.Space;
import com.stringwiz.app.userSpace.model.UserSpaceActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserSpaceActivityRepository extends JpaRepository<UserSpaceActivity, Long> {
    @Query("SELECT usa.space FROM UserSpaceActivity usa " +
            "WHERE usa.user.id = :userId " +
            "ORDER BY usa.lastActiveAt DESC")
    Optional<Space> findLastActiveSpaceForUser(@Param("userId") Long userId);
}
