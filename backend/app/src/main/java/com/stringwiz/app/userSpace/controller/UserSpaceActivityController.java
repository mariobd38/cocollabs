package com.stringwiz.app.userSpace.controller;

import com.stringwiz.app.space.model.Space;
import com.stringwiz.app.space.service.SpaceService;
import com.stringwiz.app.user.model.User;
import com.stringwiz.app.userSpace.model.UserSpaceActivity;
import com.stringwiz.app.userSpace.repository.UserSpaceActivityRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/userSpacesActivity")
public class UserSpaceActivityController {
    private final UserSpaceActivityRepository userSpaceActivityRepository;
    private final SpaceService spaceService;

    public UserSpaceActivityController(UserSpaceActivityRepository userSpaceActivityRepository, SpaceService spaceService) {
        this.userSpaceActivityRepository = userSpaceActivityRepository;
        this.spaceService = spaceService;
    }

    @PostMapping("/activate")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> activateSpace(@AuthenticationPrincipal User user) {
        try {
            Space space = spaceService.getUserPersonalSpace(user);
            UserSpaceActivity newActivity = new UserSpaceActivity(user,space);

            userSpaceActivityRepository.save(newActivity);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.ok(new Space());
        }
    }

    @GetMapping("/getLastActive")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getLastActive(@AuthenticationPrincipal User user) {
        Optional<Space> lastActiveSpace = userSpaceActivityRepository.findLastActiveSpaceForUser(user.getId());
        return lastActiveSpace.map(ResponseEntity::ok).orElse(ResponseEntity.ok(new Space()));
    }
}
