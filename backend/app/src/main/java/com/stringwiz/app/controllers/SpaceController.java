package com.stringwiz.app.controllers;

import com.stringwiz.app.models.Space;
import com.stringwiz.app.models.User;
import com.stringwiz.app.repositories.UserRepository;
import com.stringwiz.app.services.SpaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SpaceController {
    @Autowired SpaceService spaceService;
    @Autowired UserRepository userRepository;

    @PostMapping("/api/spaces/create")
    public ResponseEntity<?> createSpace(@AuthenticationPrincipal User user, @RequestBody Space space) {
        try {
            Space newSpace = spaceService.save(user, space);
            return ResponseEntity.ok(newSpace);
        } catch (Exception e) {
            return ResponseEntity.ok(new Space());
        }
    }

    @GetMapping("/api/spaces/getPersonal")
    public ResponseEntity<?> getPersonalSpace(@AuthenticationPrincipal User user) {
        try {
            return ResponseEntity.ok(spaceService.getUserPersonalSpace(user));
        } catch (Exception e) {
            return ResponseEntity.ok(new Space());
        }
    }

    @GetMapping("/api/spaces/getByName")
    public ResponseEntity<?> getSpaceByName(@AuthenticationPrincipal User user, @RequestParam("spaceName") String spaceName) {
        try {
            return ResponseEntity.ok(spaceService.getByUser(user, spaceName));
        } catch (Exception e) {
            return ResponseEntity.ok(new Space());
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
