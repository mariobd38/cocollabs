package com.cocollabs.app.user.util;

import com.cocollabs.app.user.error.OnboardingProfileErrorResponse;

import java.util.Set;
import java.util.regex.Pattern;

public class OnboardingProfileValidationUtil {
    private static final int MAX_NAME_LENGTH = 100;
    private static final int MIN_NAME_LENGTH = 3;
    private static final Pattern VALID_NAME_PATTERN = Pattern.compile("^[A-Za-zÀ-ÿ'-]+(\\s[A-Za-zÀ-ÿ'-]+)*$");

    private static final int MAX_USERNAME_LENGTH = 40;
    private static final int MIN_USERNAME_LENGTH = 3;
    private static final Pattern VALID_USERNAME_PATTERN = Pattern.compile("^[a-zA-Z0-9._-]{3,40}");

    private static final Set<String> ALLOWED_AVATAR_IDS = Set.of(
        "avatar_01.svg", "avatar_02.svg", "avatar_03.svg", "avatar_04.svg", "avatar_05.svg", "avatar_06.svg", "avatar_07.svg",
        "avatar_08.svg", "avatar_09.svg", "avatar_10.svg", "avatar_11.svg", "avatar_12.svg", "avatar_13.svg", "avatar_14.svg",
        "avatar_15.svg", "avatar_16.svg", "avatar_17.svg", "avatar_18.svg", "avatar_19.svg", "avatar_20.svg", "avatar_21.svg"
    );

    public static OnboardingProfileErrorResponse validateFullName(String fullName) {
        ProfileErrorType type = ProfileErrorType.fullName;
        if (fullName == null || fullName.trim().isEmpty()) {
            return new OnboardingProfileErrorResponse("Full name cannot be empty", type.toString());
        }
        fullName = fullName.trim();

        if (fullName.length() < MIN_NAME_LENGTH) {
            return new OnboardingProfileErrorResponse("Full name must be at least " + MIN_NAME_LENGTH + " characters", type.toString());
        }
        if (fullName.length() >= MAX_NAME_LENGTH) {
            return new OnboardingProfileErrorResponse("Full name cannot (maximum " + MAX_NAME_LENGTH + " characters)", type.toString());
        }
        if (!VALID_NAME_PATTERN.matcher(fullName).matches()) {
            return new OnboardingProfileErrorResponse("Full name contains invalid characters", type.toString());
        }
        if (fullName.split("\\s+").length < 2) {
            return new OnboardingProfileErrorResponse("Full name must contain at least two words", type.toString());
        }
        return null;
    }

    public static OnboardingProfileErrorResponse validateUsername(String username) {
        ProfileErrorType type = ProfileErrorType.username;
        if (username == null || username.trim().isEmpty()) {
            return new OnboardingProfileErrorResponse("Username cannot be empty", type.toString());
        }

        if (username.length() < MIN_USERNAME_LENGTH) {
            return new OnboardingProfileErrorResponse("Username must be at least " + MIN_USERNAME_LENGTH + " characters", type.toString());
        }
        if (username.length() >= MAX_USERNAME_LENGTH) {
            return new OnboardingProfileErrorResponse("Username is too long (maximum " + MAX_USERNAME_LENGTH + " characters)", type.toString());
        }
        if (!VALID_USERNAME_PATTERN.matcher(username).matches()) {
            return new OnboardingProfileErrorResponse("Username contains invalid characters", type.toString());
        }
        if (username.equals("admin")) {
            return new OnboardingProfileErrorResponse("Invalid username", type.toString());
        }
        return null;
    }

    public static OnboardingProfileErrorResponse validateAvatarName(String avatarName) {
        ProfileErrorType type = ProfileErrorType.avatarName;
        if (avatarName != null && !ALLOWED_AVATAR_IDS.contains(avatarName)) {
            return new OnboardingProfileErrorResponse("Invalid avatar", type.toString());
        }
        return null;
    }
}

enum ProfileErrorType { fullName, username, avatarName }
