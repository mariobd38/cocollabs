package com.cocollabs.app.profile.repository;

import com.cocollabs.app.profile.model.ProfileFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<ProfileFile, String> {
}
