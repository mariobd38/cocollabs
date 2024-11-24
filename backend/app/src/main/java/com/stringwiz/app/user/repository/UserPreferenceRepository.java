package com.stringwiz.app.user.repository;

import com.stringwiz.app.user.model.UserPreference;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPreferenceRepository extends JpaRepository<UserPreference, Long> {
}
