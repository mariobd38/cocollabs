package com.stringwiz.app.space.controller;

import com.stringwiz.app.space.model.Space;
import com.stringwiz.app.user.model.User;
import com.stringwiz.app.space.service.SpaceService;
import com.stringwiz.app.user.repository.UserRepository;
import com.stringwiz.app.user.util.UserPlatformDtoConverter;
import com.stringwiz.app.userSpace.repository.UserSpaceActivityRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/spaces")
public class SpaceController {
    private final SpaceService spaceService;
    private final UserRepository userRepository;
    private final UserSpaceActivityRepository userSpaceActivityRepository;

    public SpaceController(SpaceService spaceService,
                           UserRepository userRepository,
                           UserSpaceActivityRepository userSpaceActivityRepository) {
        this.spaceService = spaceService;
        this.userRepository = userRepository;
        this.userSpaceActivityRepository = userSpaceActivityRepository;
    }

    @PostMapping("/create")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createSpace(@AuthenticationPrincipal User user, @RequestBody Space space) {
        return ResponseEntity.ok(
            Optional.ofNullable(spaceService.save(user, space))
                    .orElseThrow(() -> new RuntimeException("Failed to create space")));
    }

    @GetMapping("/getPersonal")
    public ResponseEntity<?> getPersonalSpace(@AuthenticationPrincipal User user) {
        try {
            return ResponseEntity.ok(spaceService.getUserPersonalSpace(user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching user's personal space: " + e.getMessage());
        }
    }

    @Transactional
    @GetMapping("/getAll")
    public ResponseEntity<?> getAllUserSpaces(@AuthenticationPrincipal User authenticatedUser) {
        try {
            User user = userRepository.findById(authenticatedUser.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            return ResponseEntity.ok(UserPlatformDtoConverter.getUserSpacesDto(user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching user spaces: " + e.getMessage());
        }
    }

    @GetMapping("/getByName")
    public ResponseEntity<?> getSpaceByName(@AuthenticationPrincipal User user, @RequestParam("spaceName") String spaceName) {
        try {
            return ResponseEntity.ok(spaceService.getByUser(user, spaceName));
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

    /*@PutMapping("/api/spaces/linkTasks")
    public ResponseEntity<?> linkTasks(@AuthenticationPrincipal User user, @RequestBody Space space) {
        try {
            spaceService.linkWithTasks(user, space);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.ok(new Space());
        }
    }*/
}
