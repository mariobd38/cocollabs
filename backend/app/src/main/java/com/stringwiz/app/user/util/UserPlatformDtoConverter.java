package com.stringwiz.app.user.util;

import com.stringwiz.app.profile.model.Profile;
import com.stringwiz.app.profile.model.ProfileFile;
import com.stringwiz.app.user.dto.UserPreferenceDto;
import com.stringwiz.app.user.model.ThemePreference;
import com.stringwiz.app.user.model.User;
import com.stringwiz.app.profile.dto.ProfileDto;
import com.stringwiz.app.profile.dto.ProfileFileDto;
import com.stringwiz.app.user.dto.UserPlatformDto;
import com.stringwiz.app.user.model.UserPreference;

public class UserPlatformDtoConverter {
    public static UserPlatformDto convertToDto(User user) {
        ProfileDto profileDto = getProfileDto(user.getProfile());
        UserPreferenceDto userPreferenceDto = getUserPreferenceDto(user.getUserPreference());

        return new UserPlatformDto(
                user.getFullName(),
                user.getEmail(),
                user.getPicture(),
                profileDto,
                userPreferenceDto
        );
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

}