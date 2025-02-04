package com.cocollabs.app.user.util;

import com.cocollabs.app.profile.dto.ProfileDto;
import com.cocollabs.app.profile.dto.ProfileFileDto;
import com.cocollabs.app.profile.model.Profile;
import com.cocollabs.app.profile.model.ProfileFile;
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
//        try {
            UserDto userDto = getUserDto(user);
            ProfileDto profileDto = getProfileDto(user.getProfile());
            UserPreferenceDto userPreferenceDto = getUserPreferenceDto(user.getUserPreference());
            Set<UserSpaceDto> userSpaceDto = getUserSpacesDto(user);

            return UserPlatformDto.builder()
                    .userDto(userDto)
                    .profileDto(profileDto)
                    .userPreferenceDto(userPreferenceDto)
                    .userSpaceDto(userSpaceDto)
                    .build();
//        } catch (Exception ex) {
//            throw new RuntimeException("Error while converting user to UserPlatformDto");
//        }
    }

    private UserDto getUserDto(User user) {
        return UserDto.builder()
                .fullName(user.getFullName())
                .email(user.getEmail())
                .username(user.getUsername())
                .picture(user.getPicture())
                .onboardingStep(user.getOnboardingStep())
                .build();
    }

    public ProfileDto getProfileDto(Profile profile) {
        //Profile profile = user.getProfile();
        if (profile == null) return null;

        ProfileFile profileFile = profile.getProfileFile();
        ProfileFileDto profileFileDto = profileFile != null ? new ProfileFileDto(
                profileFile.getBase64Data(),
                profileFile.getName(),
                profileFile.getType()
        ) : null;

        return ProfileDto.builder()
                .color(profile.getColor())
                .pfd(null)
                .type(profile.getType())
                .svg(profile.getSvg())
                .preSignedUrl(profileService.getProfileImageUrl(profile))
                .build();
    }

    private UserPreferenceDto getUserPreferenceDto(UserPreference userPreference) {
        return new UserPreferenceDto(
                userPreference != null ? userPreference.getTheme() : ThemePreference.DARK
        );
    }

    public Set<UserSpaceDto> getUserSpacesDto(User user) {
        //TODO: change logic to extract most popular spaces rather than oldest spaces
        return user.getSpaces().stream()
                .sorted(Comparator.comparing(Space::getCreatedOn))
                .map(space -> new UserSpaceDto(
                        space.getName(),
                        space.getIcon(),
                        space.getDescription(),
                        space.getSlug(),
                        space.getVisibility()
                ))
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

}