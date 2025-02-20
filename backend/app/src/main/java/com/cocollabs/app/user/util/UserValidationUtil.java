package com.cocollabs.app.user.util;

import com.cocollabs.app.general.error.ErrorResponse;
import org.apache.commons.validator.routines.EmailValidator;

import java.util.Set;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class UserValidationUtil {
    //email validator variables
    private static final int MAX_EMAIL_LENGTH = 255;
    private static final int MAX_NAME_LENGTH = 100;
    private static final int MIN_NAME_LENGTH = 3;
    private static final Pattern VALID_NAME_PATTERN = Pattern.compile("^[A-Za-zÀ-ÿ'-]+(\\s[A-Za-zÀ-ÿ'-]+)*$");
    //password validator variables
    private static final int MIN_PASSWORD_LENGTH = 8;
    private static final Pattern HAS_UPPERCASE = Pattern.compile("[A-Z]");
    private static final Pattern HAS_LOWERCASE = Pattern.compile("[a-z]");
    private static final Pattern HAS_NUMBER = Pattern.compile("\\d");
    private static final Pattern HAS_SPECIAL_CHAR = Pattern.compile("[\\W_]");
    //username validator variables
    private static final int MAX_USERNAME_LENGTH = 40;
    private static final int MIN_USERNAME_LENGTH = 3;
    private static final Pattern VALID_USERNAME_PATTERN = Pattern.compile("^[a-zA-Z0-9._-]{3,40}");
    //avatar validator variables
    private static final Set<String> ALLOWED_AVATAR_IDS = IntStream.rangeClosed(1, 21)
            .mapToObj(i -> String.format("avatar_%02d.svg", i))
            .collect(Collectors.toUnmodifiableSet());

    public static ErrorResponse validateEmail(String email) {
        ProfileErrorType type = ProfileErrorType.email;
        if (email == null || email.trim().isEmpty()) {
            return new ErrorResponse("Email is required", type.toString());
        }
        if (!EmailValidator.getInstance().isValid(email)) {
            return new ErrorResponse("Invalid email format", type.toString());
        }
        if (email.length() >= MAX_EMAIL_LENGTH) {
            return new ErrorResponse("Email is too long", type.toString());
        }
        return null;
    }

    public static ErrorResponse validatePassword(String password) {
        ProfileErrorType type = ProfileErrorType.password;
        if (password == null || password.isEmpty()) {
            return new ErrorResponse("Password is required", type.toString());
        }
        if (password.length() < MIN_PASSWORD_LENGTH) {
            return new ErrorResponse("Password must be at least " + MIN_PASSWORD_LENGTH + " characters", type.toString());
        }
        if (!HAS_LOWERCASE.matcher(password).find()) {
            return new ErrorResponse("Password must contain at least one lowercase letter", type.toString());
        }
        if (!HAS_UPPERCASE.matcher(password).find()) {
            return new ErrorResponse("Password must contain at least one uppercase letter", type.toString());
        }
        if (!HAS_NUMBER.matcher(password).find()) {
            return new ErrorResponse("Password must contain at least one number", type.toString());
        }
        if (!HAS_SPECIAL_CHAR.matcher(password).find()) {
            return new ErrorResponse("Password must contain at least one special character", type.toString());
        }
        return null;
    }

    public static ErrorResponse validateFullName(String fullName) {
        ProfileErrorType type = ProfileErrorType.fullName;
        if (fullName == null || fullName.trim().isEmpty()) {
            return new ErrorResponse("Full name cannot be empty", type.toString());
        }
        fullName = fullName.trim();

        if (fullName.length() < MIN_NAME_LENGTH) {
            return new ErrorResponse("Full name must be at least " + MIN_NAME_LENGTH + " characters", type.toString());
        }
        if (fullName.length() >= MAX_NAME_LENGTH) {
            return new ErrorResponse("Full name cannot (maximum " + MAX_NAME_LENGTH + " characters)", type.toString());
        }
        if (!VALID_NAME_PATTERN.matcher(fullName).matches()) {
            return new ErrorResponse("Full name contains invalid characters", type.toString());
        }
        if (fullName.split("\\s+").length < 2) {
            return new ErrorResponse("Full name must contain at least two words", type.toString());
        }
        return null;
    }

    public static ErrorResponse validateUsername(String username) {
        ProfileErrorType type = ProfileErrorType.username;
        if (username == null || username.trim().isEmpty()) {
            return new ErrorResponse("Username cannot be empty", type.toString());
        }

        if (username.length() < MIN_USERNAME_LENGTH) {
            return new ErrorResponse("Username must be at least " + MIN_USERNAME_LENGTH + " characters", type.toString());
        }
        if (username.length() >= MAX_USERNAME_LENGTH) {
            return new ErrorResponse("Username is too long (maximum " + MAX_USERNAME_LENGTH + " characters)", type.toString());
        }
        if (!VALID_USERNAME_PATTERN.matcher(username).matches()) {
            return new ErrorResponse("Username contains invalid characters", type.toString());
        }
        if (username.equals("admin")) {
            return new ErrorResponse("Invalid username", type.toString());
        }
        return null;
    }

    public static ErrorResponse validateAvatarName(String avatarName) {
        ProfileErrorType type = ProfileErrorType.avatarName;
        if (avatarName != null && !ALLOWED_AVATAR_IDS.contains(avatarName)) {
            return new ErrorResponse("Invalid avatar", type.toString());
        }
        return null;
    }
}

enum ProfileErrorType { email, password, fullName, username, avatarName }
