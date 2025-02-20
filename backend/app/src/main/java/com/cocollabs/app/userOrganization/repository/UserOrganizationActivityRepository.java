package com.cocollabs.app.userOrganization.repository;

import com.cocollabs.app.userOrganization.model.UserOrganizationActivity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserOrganizationActivityRepository extends JpaRepository<UserOrganizationActivity, Long> {
}
