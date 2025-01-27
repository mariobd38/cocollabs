package com.cocollabs.app.userSpace.controller;

import com.cocollabs.app.space.model.Space;
import com.cocollabs.app.space.repository.SpaceRepository;
import com.cocollabs.app.userSpace.model.UserSpaceActivity;
import com.cocollabs.app.userSpace.repository.UserSpaceActivityRepository;
import com.cocollabs.app.space.service.SpaceService;
import com.cocollabs.app.user.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
