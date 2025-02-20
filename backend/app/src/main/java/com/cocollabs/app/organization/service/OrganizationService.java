package com.cocollabs.app.organization.service;

import com.cocollabs.app.config.AppConfiguration;
import com.cocollabs.app.organization.dto.OrganizationDto;
import com.cocollabs.app.organization.model.Organization;
import com.cocollabs.app.organization.repository.OrganizationRepository;
import com.cocollabs.app.user.model.User;
import com.cocollabs.app.user.repository.UserRepository;
import com.cocollabs.app.userOrganization.model.UserOrganizationActivity;
import com.cocollabs.app.userOrganization.repository.UserOrganizationActivityRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;

@Service
public class OrganizationService {
    private final OrganizationRepository organizationRepository;
    private final UserOrganizationActivityRepository userOrganizationActivityRepository;
    private final UserRepository userRepository;
    private final AppConfiguration appConfiguration;
    public OrganizationService(
            OrganizationRepository organizationRepository,
            UserOrganizationActivityRepository userOrganizationActivityRepository,
            UserRepository userRepository,
            AppConfiguration appConfiguration) {
        this.organizationRepository = organizationRepository;
        this.userOrganizationActivityRepository = userOrganizationActivityRepository;
        this.userRepository = userRepository;
        this.appConfiguration = appConfiguration;
    }
    @Transactional
    public Organization save(User user, OrganizationDto organization) {
        if (user == null || organization == null) {
            throw new IllegalArgumentException("User or Organization cannot be null");
        }

        User currentUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + user.getId()));

        try {
            LocalDateTime currentTime = LocalDateTime.now();

            Organization newOrganization = Organization.builder()
                    .name(organization.getName())
                    .description(organization.getDescription())
                    .url(appConfiguration.getBaseUrl() + "/" + organization.getSlug())
                    .isPublic(false)
                    .slug(organization.getSlug())
                    .type(organization.getType())
                    .users(new HashSet<>())
                    .createdOn(currentTime)
                    .lastUpdatedOn(currentTime)
                    .build();

            UserOrganizationActivity newActivity = UserOrganizationActivity.builder()
                    .user(currentUser)
                    .organization(newOrganization)
                    .lastActiveAt(currentTime)
                    .build();

            currentUser.addOrganization(newOrganization);
            userRepository.save(currentUser);
            userOrganizationActivityRepository.save(newActivity);

            return organizationRepository.save(newOrganization);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save organization", e);
        }
    }
}
