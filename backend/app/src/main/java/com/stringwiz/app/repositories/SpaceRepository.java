package com.stringwiz.app.repositories;

import com.stringwiz.app.enums.Visibility;
import com.stringwiz.app.models.Space;
import com.stringwiz.app.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SpaceRepository extends JpaRepository<Space, Long> {
    Optional<Space> findByName(String name);
    Optional<Space> findByNameAndUsers(String name, User user);
    Space findByVisibilityAndUsers(Visibility visibility, User user);
}
