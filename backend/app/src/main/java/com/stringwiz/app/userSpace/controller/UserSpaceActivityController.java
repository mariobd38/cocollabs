package com.stringwiz.app.userSpace.controller;

import com.stringwiz.app.space.model.Space;
import com.stringwiz.app.space.repository.SpaceRepository;
import com.stringwiz.app.space.service.SpaceService;
import com.stringwiz.app.user.model.User;
import com.stringwiz.app.userSpace.model.UserSpaceActivity;
import com.stringwiz.app.userSpace.repository.UserSpaceActivityRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/userSpacesActivity")
@PreAuthorize("isAuthenticated()")
public class UserSpaceActivityController {
    private final UserSpaceActivityRepository userSpaceActivityRepository;
    private final SpaceRepository spaceRepository;
    private final SpaceService spaceService;

    public UserSpaceActivityController(UserSpaceActivityRepository userSpaceActivityRepository,
                                       SpaceRepository spaceRepository, SpaceService spaceService) {
        this.userSpaceActivityRepository = userSpaceActivityRepository;
        this.spaceRepository = spaceRepository;
        this.spaceService = spaceService;
    }

    @PostMapping("/activatePersonal")
    public ResponseEntity<?> activatePersonalSpace(@AuthenticationPrincipal User user) {
        try {
            Space space = spaceService.getUserPersonalSpace(user);
            userSpaceActivityRepository.save(new UserSpaceActivity(user,space));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.ok(new Space());
        }
    }

    @PostMapping("/activateCurrent")
    public ResponseEntity<?> activateCurrentSpace(@AuthenticationPrincipal User user, @RequestParam("spaceName") String spaceName) {
        try {
            spaceRepository.findByName(spaceName).ifPresent(space ->
                    userSpaceActivityRepository.save(new UserSpaceActivity(user, space))
            );
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.ok(new Space());
        }
    }
}
