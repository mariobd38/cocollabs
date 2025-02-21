package com.cocollabs.app.organization.controller;

import com.cocollabs.app.organization.dto.OrganizationDto;
import com.cocollabs.app.organization.model.Organization;
import com.cocollabs.app.organization.repository.OrganizationRepository;
import com.cocollabs.app.organization.service.OrganizationService;
import com.cocollabs.app.user.model.User;
import com.cocollabs.app.user.repository.UserRepository;
import com.cocollabs.app.user.util.UserPlatformDtoConverter;
import com.cocollabs.app.userOrganization.model.UserOrganizationActivity;
import com.cocollabs.app.userOrganization.repository.UserOrganizationActivityRepository;
import jakarta.persistence.EntityNotFoundException;
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

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/organizations")
public class OrganizationController {
    private final Logger log = LoggerFactory.getLogger(OrganizationController.class);
    private final OrganizationService organizationService;
    private final OrganizationRepository organizationRepository;
    private final UserRepository userRepository;
    private final UserOrganizationActivityRepository userOrganizationActivityRepository;
    private final UserPlatformDtoConverter userPlatform;

    public OrganizationController(
            OrganizationService organizationService,
            OrganizationRepository organizationRepository,
            UserRepository userRepository,
            UserOrganizationActivityRepository userOrganizationActivityRepository,
            UserPlatformDtoConverter userPlatform) {
        this.organizationService = organizationService;
        this.userRepository = userRepository;
        this.organizationRepository = organizationRepository;
        this.userOrganizationActivityRepository = userOrganizationActivityRepository;
        this.userPlatform = userPlatform;
    }

    @PostMapping("/create")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createOrganization(@AuthenticationPrincipal User user, @RequestBody OrganizationDto organization) {
        return ResponseEntity.ok(
                Optional.ofNullable(organizationService.save(user, organization))
                        .orElseThrow(() -> new RuntimeException("Failed to create organization")));
    }

    @Transactional
    @GetMapping("/getAll")
    public ResponseEntity<?> getAllUserOrganizations(@AuthenticationPrincipal User authenticatedUser) {
        try {
            User user = userRepository.findById(authenticatedUser.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            return ResponseEntity.ok(userPlatform.getOrganizationsDto(user));
        } catch(HttpClientErrorException.Unauthorized e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized to retrieve user organizations");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching user organizations: " + e.getMessage());
        }
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

    @PostMapping("/assign")
    public ResponseEntity<?> assignOrganization(@AuthenticationPrincipal User user, @RequestParam("organizationName") String organizationName) {
        try {
            User currentUser = userRepository.findById(user.getId())
                    .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + user.getId()));
            Organization organization = organizationRepository.findByName(organizationName)
                    .orElseThrow(() -> new EntityNotFoundException("Organization not found with name: " + organizationName));
            currentUser.addOrganization(organization);
            userRepository.save(currentUser);

            UserOrganizationActivity newActivity = UserOrganizationActivity.builder()
                    .user(currentUser)
                    .organization(organization)
                    .lastActiveAt(LocalDateTime.now())
                    .build();

            userOrganizationActivityRepository.save(newActivity);

            organizationRepository.save(organization);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.ok(new Organization());
        }
    }

    @GetMapping("/getLastActive")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getLastActive(@AuthenticationPrincipal User user) {
        try {
            Optional<Organization> lastActiveOrg = userOrganizationActivityRepository.findLastActiveOrganizationForUser(user.getId());
            return lastActiveOrg.map(ResponseEntity::ok).orElse(ResponseEntity.ok(new Organization()));
        } catch (Exception e) {
            log.error("Error fetching user last active organization");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching user last active organization");
        }
    }
}
