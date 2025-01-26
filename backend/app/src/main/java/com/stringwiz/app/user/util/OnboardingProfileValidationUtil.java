package com.stringwiz.app.user.util;

import com.stringwiz.app.user.error.OnboardingProfileErrorResponse;

import java.util.regex.Pattern;

public class OnboardingProfileValidationUtil {
    private static final int MAX_NAME_LENGTH = 100;
    private static final int MIN_NAME_LENGTH = 3;
    private static final Pattern VALID_NAME_PATTERN = Pattern.compile("^[A-Za-zÀ-ÿ'-]+(\\s[A-Za-zÀ-ÿ'-]+)*$");

    public static OnboardingProfileErrorResponse validateFullName(String fullName) {
        ProfileErrorType type = ProfileErrorType.fullName;
        if (fullName == null || fullName.trim().isEmpty()) {
            return new OnboardingProfileErrorResponse("Full name cannot be empty", type.toString());
        }
        fullName = fullName.trim();
        System.out.println(fullName);
        System.out.println(fullName.length());

        if (fullName.length() < MIN_NAME_LENGTH) {
            return new OnboardingProfileErrorResponse("Full name must be at least " + MIN_NAME_LENGTH + " characters", type.toString());
        }
        if (fullName.length() >= MAX_NAME_LENGTH) {
            return new OnboardingProfileErrorResponse("Full name cannot exceed " + MAX_NAME_LENGTH + " characters", type.toString());
        }
        if (!VALID_NAME_PATTERN.matcher(fullName).matches()) {
            return new OnboardingProfileErrorResponse("Full name contains invalid characters", type.toString());
        }
        if (fullName.split("\\s+").length < 2) {
            return new OnboardingProfileErrorResponse("Full name must contain at least two words", type.toString());
        }
        return null;
    }
}

enum ProfileErrorType { fullName, username }
