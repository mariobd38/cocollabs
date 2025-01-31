package com.cocollabs.app.user.service;

import com.cocollabs.app.aws.service.S3Service;
import com.cocollabs.app.role.model.RoleNames;
import com.cocollabs.app.role.repository.RoleRepository;
import com.cocollabs.app.role.util.RoleSelectorUtil;
import com.cocollabs.app.role.model.Role;
import com.cocollabs.app.user.error.OnboardingProfileErrorResponse;
import com.cocollabs.app.user.model.User;
import com.cocollabs.app.user.repository.UserRepository;
import com.cocollabs.app.user.util.OnboardingProfileValidationUtil;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomUserService extends User implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public CustomUserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }


    public void createUser(User user) {
        List<RoleNames> roleNames = new RoleSelectorUtil().getRolesFromEmail(user.getEmail());
        List<Role> roleList = new ArrayList<>();
        for(RoleNames names : roleNames) {
            String roleName = names.name();
            Role role = roleRepository.findByName(roleName);
            if (role == null) {
                Role r = new Role(roleName);
                roleRepository.save(r);
                roleList.add(r);
            } else {
                roleList.add(role);
            }
        }
        user.setRoles(roleList);
        user.setOnboardingStep(User.UserOnboardingStep.PROFILE);
        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(email);
        return user.orElseThrow(() -> new UsernameNotFoundException("Invalid username or password."));
    }

    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public String transformFullName(String fullName) {
        return Arrays.stream(fullName.trim().split("\\s+"))
                .map(word -> Character.toUpperCase(word.charAt(0)) + word.substring(1).toLowerCase())
                .collect(Collectors.joining(" "));
    }

    public OnboardingProfileErrorResponse getFullNameValidationErrors(String fullName) {
        return OnboardingProfileValidationUtil.validateFullName(fullName);
    }

    public OnboardingProfileErrorResponse getUsernameValidationErrors(String username) {
        return OnboardingProfileValidationUtil.validateUsername(username);
    }

    public OnboardingProfileErrorResponse getAvatarNameValidationErrors(String avatarName) {
        return OnboardingProfileValidationUtil.validateAvatarName(avatarName);
    }

}
