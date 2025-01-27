package com.cocollabs.app.auth.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.apache.commons.validator.routines.EmailValidator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class AuthValidationUtil {
    private static final int MAX_EMAIL_LENGTH = 255;
    private static final int MAX_NAME_LENGTH = 255;
    private static final int MIN_NAME_LENGTH = 3;
    private static final Pattern VALID_NAME_PATTERN = Pattern.compile("^[A-Za-zÀ-ÿ'-]+(\\s[A-Za-zÀ-ÿ'-]+)*$");

    private static final int MIN_PASSWORD_LENGTH = 8;
    private static final Pattern HAS_UPPERCASE = Pattern.compile("[A-Z]");
    private static final Pattern HAS_LOWERCASE = Pattern.compile("[a-z]");
    private static final Pattern HAS_NUMBER = Pattern.compile("\\d");
    private static final Pattern HAS_SPECIAL_CHAR = Pattern.compile("[$&+,:;~=?@#|'<>.^*({})%!-]");

    public static ValidationResult validatePassword(String password) {
        List<String> errors = new ArrayList<>();

        if (password == null || password.isEmpty()) {
            errors.add("Password required");
            return new ValidationResult(false, errors);
        }

        // Check length
        if (password.length() < MIN_PASSWORD_LENGTH) {
            errors.add("Password must be at least " + MIN_PASSWORD_LENGTH + " characters long");
            return new ValidationResult(false, errors);
        }

        // Check complexity requirements
        if (!HAS_UPPERCASE.matcher(password).find()) {
            errors.add("Password must contain at least one uppercase letter");
        }

        if (!HAS_LOWERCASE.matcher(password).find()) {
            errors.add("Password must contain at least one lowercase letter");
        }

        if (!HAS_NUMBER.matcher(password).find()) {
            errors.add("Password must contain at least one number");
        }

        if (!HAS_SPECIAL_CHAR.matcher(password).find()) {
            errors.add("Password must contain at least one special character");
        }

        return new ValidationResult(errors.size() < 3, errors);
    }

    public static ValidationResult validateEmail(String email) {
        List<String> errors = new ArrayList<>();
        if (email == null || email.trim().isEmpty()) {
            errors.add("Email required");
            return new ValidationResult(false, errors);
        }
        if (!EmailValidator.getInstance().isValid(email)) {
            errors.add("Invalid email format");
        }
        if (email.length() >= MAX_EMAIL_LENGTH) {
            errors.add("Email is too long");
        }
        return new ValidationResult(errors.isEmpty(), errors);
    }

    public static ValidationResult validateFullName(String fullName) {
        List<String> errors = new ArrayList<>();
        if (fullName == null || fullName.trim().isEmpty()) {
            errors.add("Full name required");
            return new ValidationResult(false, errors);
        }
        fullName = fullName.trim();

        if (fullName.length() < MIN_NAME_LENGTH) {
            errors.add("Full name must be at least " + MIN_NAME_LENGTH + " characters");
        }
        if (fullName.length() >= MAX_NAME_LENGTH) {
            errors.add("Full name cannot exceed " + MAX_NAME_LENGTH + " characters");
        }
        if (!VALID_NAME_PATTERN.matcher(fullName).matches()) {
            errors.add("Full name can only contain letters, hyphens, apostrophes, and spaces");
        }
        if (fullName.split("\\s+").length < 2) {
            errors.add("Please provide both first and last name");
        }
        return new ValidationResult(errors.isEmpty(), errors);
    }

    public static String capitalizeName(String fullName) {
        return Arrays.stream(fullName.trim().split("\\s+"))
                .map(word -> Character.toUpperCase(word.charAt(0)) + word.substring(1).toLowerCase())
                .collect(Collectors.joining(" "));
    }

    @Data
    @AllArgsConstructor
    public static class ValidationResult {
        private final boolean isValid;
        private final List<String> errors;
    }

}

