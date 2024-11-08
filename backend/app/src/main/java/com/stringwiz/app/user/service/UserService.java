package com.stringwiz.app.user.service;

import com.stringwiz.app.user.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    void saveUser(User user);
}
