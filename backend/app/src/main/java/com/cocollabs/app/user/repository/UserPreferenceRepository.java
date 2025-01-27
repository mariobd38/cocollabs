package com.cocollabs.app.user.repository;

import com.cocollabs.app.user.model.UserPreference;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPreferenceRepository extends JpaRepository<UserPreference, Long> {
}
