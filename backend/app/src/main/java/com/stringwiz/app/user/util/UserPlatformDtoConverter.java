package com.stringwiz.app.user.util;

import com.stringwiz.app.profile.model.Profile;
import com.stringwiz.app.profile.model.ProfileFile;
import com.stringwiz.app.space.dto.UserSpaceDto;
import com.stringwiz.app.space.model.Space;
import com.stringwiz.app.user.dto.UserDto;
import com.stringwiz.app.user.dto.UserPreferenceDto;
import com.stringwiz.app.user.model.ThemePreference;
import com.stringwiz.app.user.model.User;
import com.stringwiz.app.profile.dto.ProfileDto;
import com.stringwiz.app.profile.dto.ProfileFileDto;
import com.stringwiz.app.user.dto.UserPlatformDto;
import com.stringwiz.app.user.model.UserPreference;

import java.util.LinkedHashSet;
import java.util.Set;

public class UserPlatformDtoConverter {
    public static UserPlatformDto convertToDto(User user) {
        try {
            UserDto userDto = getUserDto(user);
            ProfileDto profileDto = getProfileDto(user.getProfile());
            UserPreferenceDto userPreferenceDto = getUserPreferenceDto(user.getUserPreference());
            Set<UserSpaceDto> userSpaceDtos = getUserSpacesDto(user);

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
        return new UserDto(user.getFullName(), user.getEmail(), user.getPicture());
    }


    private static ProfileDto getProfileDto(Profile profile) {
        ProfileDto profileDto = null;

        if (profile != null) {
            ProfileFile profileFile = profile.getProfileFile();
            ProfileFileDto profileFileDto = profileFile != null ? new ProfileFileDto(
                    profileFile.getBase64Data(),
                    profileFile.getName(),
                    profileFile.getType()
            ) : null;

            profileDto = new ProfileDto(
                    profile.getColor(),
                    profileFileDto,
                    profile.getType()
            );
        }
        return profileDto;
    }

    private static UserPreferenceDto getUserPreferenceDto(UserPreference userPreference) {
        return new UserPreferenceDto(
                userPreference != null ? userPreference.getTheme() : ThemePreference.DARK
        );
    }

    public static Set<UserSpaceDto> getUserSpacesDto(User user) {
        Set<Space> spaces = user.getSpaces();
        Set<UserSpaceDto> spaceDtos = new LinkedHashSet<>();
        for (Space space : spaces) {
            spaceDtos.add(new UserSpaceDto(
                    space.getName(),
                    space.getIcon(),
                    space.getDescription(),
                    space.getVisibility()
            ));
        }
        return spaceDtos;
    }

}