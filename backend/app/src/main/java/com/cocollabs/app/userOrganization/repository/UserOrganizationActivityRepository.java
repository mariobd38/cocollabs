package com.cocollabs.app.userOrganization.repository;

import com.cocollabs.app.organization.model.Organization;
import com.cocollabs.app.userOrganization.model.UserOrganizationActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserOrganizationActivityRepository extends JpaRepository<UserOrganizationActivity, Long> {
    @Query("SELECT uoa.organization FROM UserOrganizationActivity uoa " +
            "WHERE uoa.user.id = :userId " +
            "ORDER BY uoa.lastActiveAt DESC LIMIT 1")
    Optional<Organization> findLastActiveOrganizationForUser(@Param("userId") Long userId);
}
