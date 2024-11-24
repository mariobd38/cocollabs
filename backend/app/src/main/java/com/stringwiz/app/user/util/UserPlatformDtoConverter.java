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
        Profile profile = user.getProfile();
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

        UserPreference userPreference = user.getUserPreference();
        UserPreferenceDto userPreferenceDto = null;

//        if (userPreference != null) {
//            userPreferenceDto = new UserPreferenceDto(
//                    userPreference.getTheme()
//            );
//        }
        userPreferenceDto = new UserPreferenceDto(
            userPreference != null ? userPreference.getTheme() : ThemePreference.DARK
        );

        return new UserPlatformDto(
                user.getFullName(),
                user.getEmail(),
                user.getPicture(),
                profileDto,
                userPreferenceDto
        );
    }
}