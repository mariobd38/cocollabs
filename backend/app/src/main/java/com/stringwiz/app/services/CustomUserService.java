package com.stringwiz.app.services;


import com.stringwiz.app.enums.RoleNames;
import com.stringwiz.app.models.Role;
import com.stringwiz.app.models.User;
import com.stringwiz.app.repositories.RoleRepository;
import com.stringwiz.app.repositories.UserRepository;
import com.stringwiz.app.utils.RoleSelectorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomUserService implements UserService {
    @Autowired private UserRepository userRepository;
    @Autowired private RoleRepository roleRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Override
    public void saveUser(User user) {
        if (user.getPassword() != null)
            user.setPassword(passwordEncoder.encode(user.getPassword()));

        List<RoleNames> roleNames = new RoleSelectorUtil().getRolesFromEmail(user.getEmail());
        List<Role> roleList = new ArrayList<>();
        for(RoleNames names : roleNames) {
            String roleName = names.name();
            Role role = roleRepository.findByName(roleName);
            if (role == null) {
                Role r = new Role();
                r.setName(roleName);
                roleRepository.save(r);
                roleList.add(r);
            } else {
                roleList.add(role);
            }
        }
        user.setRoles(roleList);
        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(email);
        return user.orElseThrow(() -> new UsernameNotFoundException("Invalid username or password."));
    }
}
