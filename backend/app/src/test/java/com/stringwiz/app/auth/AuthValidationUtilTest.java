package com.stringwiz.app.auth;

import com.stringwiz.app.auth.util.AuthValidationUtil;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class AuthValidationUtilTest {
    @Test
    void testValidatePassword_NullPassword() {
        AuthValidationUtil.ValidationResult result = AuthValidationUtil.validatePassword(null);
        assertFalse(result.isValid());
        assertTrue(result.getErrors().contains("Password required"));
    }


    @Test
    void testValidatePassword_EmptyPassword() {
        AuthValidationUtil.ValidationResult result = AuthValidationUtil.validatePassword("");
        assertFalse(result.isValid());
        assertTrue(result.getErrors().contains("Password required"));
    }

    @Test
    void testValidatePassword_ValidPassword() {
        AuthValidationUtil.ValidationResult result = AuthValidationUtil.validatePassword("Str0ng@Password!");
        assertTrue(result.isValid());
        assertTrue(result.getErrors().isEmpty());
    }

    @Test
    void testValidatePassword_WeakPassword() {
        AuthValidationUtil.ValidationResult result = AuthValidationUtil.validatePassword("weakpass");
        assertFalse(result.isValid());
        assertTrue(result.getErrors().contains("Password must contain at least one uppercase letter"));
        assertTrue(result.getErrors().contains("Password must contain at least one special character"));
    }

    @Test
    void testValidateEmail_NullEmail() {
        AuthValidationUtil.ValidationResult result = AuthValidationUtil.validateEmail(null);
        assertFalse(result.isValid());
        assertTrue(result.getErrors().contains("Email required"));
    }

    @Test
    void testValidateEmail_InvalidFormat() {
        AuthValidationUtil.ValidationResult result = AuthValidationUtil.validateEmail("invalid-email@gmail.c");
        assertFalse(result.isValid());
        assertTrue(result.getErrors().contains("Invalid email format"));
    }

    @Test
    void testValidateEmail_TooLong() {
        String longEmail = "a".repeat(243) + "@example.com";
        AuthValidationUtil.ValidationResult result = AuthValidationUtil.validateEmail(longEmail);
        assertFalse(result.isValid());
        assertTrue(result.getErrors().contains("Email is too long"));
    }

    @Test
    void testValidateEmail_ValidEmail() {
        AuthValidationUtil.ValidationResult result = AuthValidationUtil.validateEmail("test@example.com");
        assertTrue(result.isValid());
        assertTrue(result.getErrors().isEmpty());
    }

    @Test
    void testValidateFullName_NullFullName() {
        AuthValidationUtil.ValidationResult result = AuthValidationUtil.validateFullName(null);
        assertFalse(result.isValid());
        assertTrue(result.getErrors().contains("Full name required"));
    }

    @Test
    void testValidateFullName_TooShort() {
        AuthValidationUtil.ValidationResult result = AuthValidationUtil.validateFullName("Ed");
        assertFalse(result.isValid());
        assertTrue(result.getErrors().contains("Full name must be at least 3 characters"));
    }

    @Test
    void testValidateFullName_TooLong() {
        String longName = "A".repeat(256);
        AuthValidationUtil.ValidationResult result = AuthValidationUtil.validateFullName(longName);
        assertFalse(result.isValid());
        assertTrue(result.getErrors().contains("Full name cannot exceed 255 characters"));
    }

    @Test
    void testValidateFullName_InvalidCharacters() {
        AuthValidationUtil.ValidationResult result = AuthValidationUtil.validateFullName("John123");
        assertFalse(result.isValid());
        assertTrue(result.getErrors().contains("Full name can only contain letters, hyphens, apostrophes, and spaces"));
    }

    @Test
    void testValidateFullName_ValidFullName() {
        AuthValidationUtil.ValidationResult result = AuthValidationUtil.validateFullName("John Doe");
        assertTrue(result.isValid());
        assertTrue(result.getErrors().isEmpty());
    }

    @Test
    void testValidateFullName_MissingLastName() {
        AuthValidationUtil.ValidationResult result = AuthValidationUtil.validateFullName("John");
        assertFalse(result.isValid());
        assertTrue(result.getErrors().contains("Please provide both first and last name"));
    }

    @Test
    void testCapitalizeName_SingleWord() {
        String result = AuthValidationUtil.capitalizeName("john");
        assertEquals("John", result);
    }

    @Test
    void testCapitalizeName_MultipleWords() {
        String result = AuthValidationUtil.capitalizeName("john doe");
        assertEquals("John Doe", result);
    }

    @Test
    void testCapitalizeName_ExtraSpaces() {
        String result = AuthValidationUtil.capitalizeName(" john   doe ");
        assertEquals("John Doe", result);
    }
    @Test
    void testCapitalizeName_mixedChars() {
        String result = AuthValidationUtil.capitalizeName(" jOHn   DoE    ");
        assertEquals("John Doe", result);
    }

}
