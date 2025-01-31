package com.cocollabs.app.space.controller;

import com.cocollabs.app.space.model.Space;
import com.cocollabs.app.space.service.SpaceService;
import com.cocollabs.app.userSpace.repository.UserSpaceActivityRepository;
import com.cocollabs.app.auth.controller.AuthController;
import com.cocollabs.app.user.model.User;
import com.cocollabs.app.user.repository.UserRepository;
import com.cocollabs.app.user.util.UserPlatformDtoConverter;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import org.springframework.web.client.HttpClientErrorException;

import java.util.Optional;

@RestController
@RequestMapping("/api/spaces")
public class SpaceController {
    private final Logger log = LoggerFactory.getLogger(AuthController.class);
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
        } catch(HttpClientErrorException.Unauthorized e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized to retrieve user spaces");
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
            log.error("Error space with name: {}", spaceName);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error fetching space by name" );
        }
    }

    @GetMapping("/getLastActive")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getLastActive(@AuthenticationPrincipal User user) {
        try {
            Optional<Space> lastActiveSpace = userSpaceActivityRepository.findLastActiveSpaceForUser(user.getId());
            return lastActiveSpace.map(ResponseEntity::ok).orElse(ResponseEntity.ok(new Space()));
        } catch (Exception e) {
            log.error("Error fetching user last active space");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching user last active space");
        }
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
