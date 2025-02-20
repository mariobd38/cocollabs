package com.cocollabs.app.user.util;

import com.cocollabs.app.organization.dto.OrganizationDto;
import com.cocollabs.app.organization.model.Organization;
import com.cocollabs.app.profile.dto.ProfileDto;
import com.cocollabs.app.profile.service.ProfileService;
import com.cocollabs.app.space.dto.UserSpaceDto;
import com.cocollabs.app.space.model.Space;
import com.cocollabs.app.user.dto.UserDto;
import com.cocollabs.app.user.dto.UserPreferenceDto;
import com.cocollabs.app.user.model.ThemePreference;
import com.cocollabs.app.user.model.UserPreference;
import com.cocollabs.app.user.model.User;
import com.cocollabs.app.user.dto.UserPlatformDto;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@Transactional
public class UserPlatformDtoConverter {
    private  final Logger log = LoggerFactory.getLogger(UserPlatformDtoConverter.class);
    private final ProfileService profileService;

    public UserPlatformDtoConverter(ProfileService profileService) {
        this.profileService = profileService;
    }

    public UserPlatformDto convertToDto(User user) {
        try {
            return UserPlatformDto.builder()
                    .userDto(getUserDto(user))
                    .profileDto(getProfileDto(user))
                    .userPreferenceDto(getUserPreferenceDto(user.getUserPreference()))
                    .userSpaceDto(getUserSpacesDto(user))
                    .organizationDto(getOrganizationsDto(user))
                    .build();
        } catch (Exception ex) {
            log.error("Error while converting user to UserPlatformDto: ", ex);
            throw new RuntimeException("Error while converting user to UserPlatformDto");
        }
    }

    private UserDto getUserDto(User user) {
        return UserDto.builder()
                .email(user.getEmail())
                .username(user.getUsername())
                .onboardingStep(user.getOnboardingStep())
                .build();
    }

    public ProfileDto getProfileDto(User user) {
        return Optional.ofNullable(user.getProfile())
                .map(profile -> ProfileDto.builder()
                        .firstName(profile.getFirstName())
                        .lastName(profile.getLastName())
                        .fullName(profile.getFullName())
                        .color(profile.getColor())
                        .type(profile.getType())
                        .svg(profile.getSvg())
                        .preSignedUrl(profileService.getProfileImageUrl(user, profile))
                        .build())
                .orElse(null);
    }

    private UserPreferenceDto getUserPreferenceDto(UserPreference userPreference) {
        return UserPreferenceDto.builder()
                .theme(Optional.ofNullable(userPreference)
                        .map(UserPreference::getTheme)
                        .orElse(ThemePreference.DARK))
                .build();
    }

    public Set<UserSpaceDto> getUserSpacesDto(User user) {
        return user.getSpaces().stream()
                .sorted(Comparator.comparing(Space::getCreatedOn))
                .map(space -> UserSpaceDto.builder()
                        .name(space.getName())
                        .icon(space.getIcon())
                        .description(space.getDescription())
                        .slug(space.getSlug())
                        .visibility(space.getVisibility())
                        .build())
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    public Set<OrganizationDto> getOrganizationsDto(User user) {
        return user.getOrganizations().stream()
                .sorted(Comparator.comparing(Organization::getCreatedOn))
                .map(OrganizationDto::mapper)
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

}