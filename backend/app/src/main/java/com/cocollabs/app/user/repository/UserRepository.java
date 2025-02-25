package com.cocollabs.app.user.repository;

import com.cocollabs.app.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Boolean existsByActualUsername(String username);
}
