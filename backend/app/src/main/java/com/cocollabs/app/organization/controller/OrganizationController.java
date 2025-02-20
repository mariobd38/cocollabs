package com.cocollabs.app.organization.controller;

import com.cocollabs.app.organization.dto.OrganizationDto;
import com.cocollabs.app.organization.model.Organization;
import com.cocollabs.app.organization.repository.OrganizationRepository;
import com.cocollabs.app.organization.service.OrganizationService;
import com.cocollabs.app.user.model.User;
import com.cocollabs.app.userOrganization.model.UserOrganizationActivity;
import com.cocollabs.app.userOrganization.repository.UserOrganizationActivityRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/organizations")
public class OrganizationController {
    private final OrganizationService organizationService;
    private final OrganizationRepository organizationRepository;
    private final UserOrganizationActivityRepository userOrganizationActivityRepository;

    public OrganizationController(
            OrganizationService organizationService,
            OrganizationRepository organizationRepository,
            UserOrganizationActivityRepository userOrganizationActivityRepository) {
        this.organizationService = organizationService;
        this.organizationRepository = organizationRepository;
        this.userOrganizationActivityRepository = userOrganizationActivityRepository;
    }

    @PostMapping("/create")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createSpace(@AuthenticationPrincipal User user, @RequestBody OrganizationDto organization) {
        return ResponseEntity.ok(
                Optional.ofNullable(organizationService.save(user, organization))
                        .orElseThrow(() -> new RuntimeException("Failed to create space")));
    }

    @PostMapping("/activate")
    public ResponseEntity<?> activateOrganization(@AuthenticationPrincipal User user, @RequestParam("organizationName") String organizationName) {
        try {
            organizationRepository.findByName(organizationName).ifPresent(organization ->
                    userOrganizationActivityRepository.save(
                            UserOrganizationActivity.builder()
                                    .user(user)
                                    .organization(organization)
                                    .lastActiveAt(LocalDateTime.now())
                                    .build())
            );
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.ok(new Organization());
        }
    }
}
