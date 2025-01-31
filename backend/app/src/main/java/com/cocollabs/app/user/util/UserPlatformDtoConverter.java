package com.cocollabs.app.user.util;

import com.cocollabs.app.profile.dto.ProfileDto;
import com.cocollabs.app.profile.dto.ProfileFileDto;
import com.cocollabs.app.profile.model.Profile;
import com.cocollabs.app.profile.model.ProfileFile;
import com.cocollabs.app.space.dto.UserSpaceDto;
import com.cocollabs.app.space.model.Space;
import com.cocollabs.app.user.dto.UserDto;
import com.cocollabs.app.user.dto.UserPreferenceDto;
import com.cocollabs.app.user.model.ThemePreference;
import com.cocollabs.app.user.model.UserPreference;
import com.cocollabs.app.user.model.User;
import com.cocollabs.app.user.dto.UserPlatformDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class UserPlatformDtoConverter {
    private static final Logger log = LoggerFactory.getLogger(UserPlatformDtoConverter.class);

    public static UserPlatformDto convertToDto(User user) {
        try {
            UserDto userDto = getUserDto(user);
            ProfileDto profileDto = getProfileDto(user.getProfile());
            UserPreferenceDto userPreferenceDto = getUserPreferenceDto(user.getUserPreference());
            Set<UserSpaceDto> userSpaceDtos = getUserSpacesDto(user);
            log.info("UserPlatformDto created successfully");

            return new UserPlatformDto(
                userDto,
                profileDto,
                userPreferenceDto,
                userSpaceDtos
            );
        } catch (Exception ex) {
            throw new RuntimeException("Error while converting user to UserPlatformDto");
        }
    }

    private static UserDto getUserDto(User user) {
        return new UserDto(user.getFullName(), user.getEmail(), user.getPicture(),user.getOnboardingStep());
    }


    private static ProfileDto getProfileDto(Profile profile) {
        if (profile == null) return null;

        ProfileFile profileFile = profile.getProfileFile();
        ProfileFileDto profileFileDto = profileFile != null ? new ProfileFileDto(
                profileFile.getBase64Data(),
                profileFile.getName(),
                profileFile.getType()
        ) : null;

        return new ProfileDto(
                profile.getColor(),
                profileFileDto,
                profile.getType().toValue()
        );
    }

    private static UserPreferenceDto getUserPreferenceDto(UserPreference userPreference) {
        return new UserPreferenceDto(
                userPreference != null ? userPreference.getTheme() : ThemePreference.DARK
        );
    }

    public static Set<UserSpaceDto> getUserSpacesDto(User user) {
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