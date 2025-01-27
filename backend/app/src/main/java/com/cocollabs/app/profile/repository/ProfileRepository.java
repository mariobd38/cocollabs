package com.cocollabs.app.profile.repository;

import com.cocollabs.app.profile.model.Profile;
import com.cocollabs.app.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, String> {
    Profile findByUser(User user);
}