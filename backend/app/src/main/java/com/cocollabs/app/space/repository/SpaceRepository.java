package com.cocollabs.app.space.repository;

import com.cocollabs.app.space.model.Visibility;
import com.cocollabs.app.space.model.Space;
import com.cocollabs.app.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

@Repository
public interface SpaceRepository extends JpaRepository<Space, Long> {
    Optional<Space> findByName(String name);
    Optional<Space> findByNameAndUsers(String name, User user);
    @Query("SELECT s FROM Space s WHERE s.visibility = :visibility AND :user MEMBER OF s.users")
    Optional<Space> findByVisibilityAndUsers(@Param("visibility") Visibility visibility, @Param("user") User user);
}
