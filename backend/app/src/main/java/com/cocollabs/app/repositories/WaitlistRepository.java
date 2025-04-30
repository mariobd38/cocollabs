package com.cocollabs.app.repositories;

import com.cocollabs.app.models.Waitlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WaitlistRepository extends JpaRepository<Waitlist, Long> {
    Waitlist findByEmail(String email);
    Boolean existsByEmail(String email);
}
