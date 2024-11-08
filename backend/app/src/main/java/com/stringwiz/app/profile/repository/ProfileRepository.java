package com.stringwiz.app.profile.repository;

import com.stringwiz.app.profile.model.Profile;
import com.stringwiz.app.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, String> {
    Profile findByUser(User user);
}