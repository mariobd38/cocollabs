package com.cocollabs.app.auth.service;

import com.cocollabs.app.general.error.ErrorResponse;
import com.cocollabs.app.user.util.UserValidationUtil;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    public ErrorResponse getEmailValidationErrors(String email) {
        return UserValidationUtil.validateEmail(email);
    }

    public ErrorResponse getPasswordValidationErrors(String password) {
        return UserValidationUtil.validatePassword(password);
    }
}
