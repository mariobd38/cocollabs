package com.cocollabs.app.controllers;

import com.cocollabs.app.services.WaitlistService;
import jakarta.validation.constraints.Email;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/waitlist")
public class WaitlistController {
    private final WaitlistService waitlistService;

    public WaitlistController(WaitlistService waitlistService) {
        this.waitlistService = waitlistService;
    }

    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestParam @Email String email) throws Exception {
        waitlistService.addToWaitlist(email);

        return ResponseEntity.ok("Waitlist join request received");
    }
}
