package com.cocollabs.app.user.util;

import com.cocollabs.app.user.error.OnboardingProfileErrorResponse;

import java.util.regex.Pattern;

public class OnboardingProfileValidationUtil {
    private static final int MAX_NAME_LENGTH = 100;
    private static final int MIN_NAME_LENGTH = 3;
    private static final Pattern VALID_NAME_PATTERN = Pattern.compile("^[A-Za-zÀ-ÿ'-]+(\\s[A-Za-zÀ-ÿ'-]+)*$");

    private static final int MAX_USERNAME_LENGTH = 40;
    private static final int MIN_USERNAME_LENGTH = 3;
    private static final Pattern VALID_USERNAME_PATTERN = Pattern.compile("^[a-zA-Z0-9._-]{3,40}");

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
}

enum ProfileErrorType { fullName, username }
