package com.cocollabs.app.services;

import com.cocollabs.app.models.Waitlist;
import com.cocollabs.app.rate_limit.RateLimit;
import com.cocollabs.app.repositories.WaitlistRepository;
import org.springframework.stereotype.Service;


@Service
public class WaitlistService {
    private final WaitlistRepository waitlistRepository;
     private final EmailService emailService;

    public WaitlistService(final WaitlistRepository waitlistRepository,
                           final EmailService emailService) {
        this.waitlistRepository = waitlistRepository;
        this.emailService = emailService;
    }


    @RateLimit(endpoint = "auth", capacity = 10, refillTokens = 5)
    public void addToWaitlist(String email) {
        if (waitlistRepository.existsByEmail(email)) {
            return;
        }
        waitlistRepository.save(Waitlist.builder()
                .email(email)
                .build());
        emailService.sendEmail(email);
    }
}
