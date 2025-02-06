package com.cocollabs.app.user.controller;

import com.cocollabs.app.profile.service.ProfileService;
import com.cocollabs.app.user.repository.UserPreferenceRepository;
import com.cocollabs.app.user.dto.UserProfileDto;
import com.cocollabs.app.user.error.OnboardingProfileErrorResponse;
import com.cocollabs.app.user.model.ThemePreference;
import com.cocollabs.app.user.model.User;
import com.cocollabs.app.user.model.User.UserOnboardingStep;
import com.cocollabs.app.user.model.UserPreference;
import com.cocollabs.app.user.repository.UserRepository;
import com.cocollabs.app.auth.util.JwtUtil;
import com.cocollabs.app.user.service.CustomUserService;
import com.cocollabs.app.user.util.UserPlatformDtoConverter;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final Logger log = LoggerFactory.getLogger(UserController.class);
    private final UserRepository userRepository;
    private final UserPreferenceRepository userPreferenceRepository;
    private final JwtUtil jwtUtil;
    private final CustomUserService customUserService;
    private final ProfileService profileService;
    private final UserPlatformDtoConverter userPlatform;

    public UserController(
            UserRepository userRepository,
            UserPreferenceRepository userPreferenceRepository,
            JwtUtil jwtUtil,
            CustomUserService customUserService,
            ProfileService profileService,
            UserPlatformDtoConverter userPlatform
    ) {
        this.userRepository = userRepository;
        this.userPreferenceRepository = userPreferenceRepository;
        this.jwtUtil = jwtUtil;
        this.customUserService = customUserService;
        this.profileService = profileService;
        this.userPlatform = userPlatform;
    }

    @GetMapping("/getInfo")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getUserInfo(@CookieValue(name = "${APP_ACCESS_TOKEN_NAME}", required = false) String jwt) {
        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication required");
        }
        try {
            String email = jwtUtil.getUserEmailFromToken(jwt);
            Optional<User> optionalUser = userRepository.findByEmail(email);

            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found");
            }

            return ResponseEntity.ok(userPlatform.convertToDto(optionalUser.get()));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred while processing the request");
        }
    }

    @PutMapping(value = "/createProfile",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createUserProfile(@AuthenticationPrincipal User user,
                                           @RequestPart("onboardingProfileDto") @Valid UserProfileDto onboardingProfileDto,
                                           @RequestPart(value = "file", required = false) MultipartFile file) {
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
        try {
            String fullName = onboardingProfileDto.getFullName();
            String username = onboardingProfileDto.getUsername();
            String avatarName = onboardingProfileDto.getAvatarName();

            //validation checks
            if (customUserService.getUsernameValidationErrors(username) != null) {
                return ResponseEntity.badRequest().body(customUserService.getUsernameValidationErrors(username));
            }
            if (userRepository.existsByUsername(username)) {
                return ResponseEntity.badRequest().body(new OnboardingProfileErrorResponse("Username is not available", "username"));
            }
            if (customUserService.getFullNameValidationErrors(fullName) != null) {
                return ResponseEntity.badRequest().body(customUserService.getFullNameValidationErrors(fullName));
            }
            if (customUserService.getAvatarNameValidationErrors(avatarName) != null) {
                return ResponseEntity.badRequest().body(customUserService.getAvatarNameValidationErrors(avatarName));
            }

            user.setFullName(customUserService.transformFullName(fullName));
            user.setUsername(username);
            if (file != null && !file.isEmpty()) {
                user.setProfile(profileService.handleFileUpload(user, file));
            } else {
                user.setProfile(profileService.handleAvatarCreation(user, avatarName));
            }

            user.setOnboardingStep(UserOnboardingStep.SPACE);
            userRepository.save(user);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Profile creation failed for user {}: {}", user.getId(), e.getMessage());
            return ResponseEntity.internalServerError().body(new OnboardingProfileErrorResponse("Unexpected error, please try again later", "username"));

        }
    }

    @PutMapping("/updateTheme")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateTheme(@AuthenticationPrincipal User user, @RequestBody ThemePreference newTheme) {
        try {
            if (user == null) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body("User not authenticated");
            }

            UserPreference userPreference = user.getUserPreference();

            if (userPreference == null) {
                // Create and save UserPreference first
                userPreference = new UserPreference(newTheme);
                userPreference = userPreferenceRepository.save(userPreference);
                user.setUserPreference(userPreference);
            } else {
                // Update the existing UserPreference
                userPreference.setTheme(newTheme);
                userPreferenceRepository.save(userPreference);
            }

            // Save the user with updated preference
            userRepository.save(user);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while updating the theme preference");
        }
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> doesUserExist(@RequestParam("email") @Email String email) {
        return ResponseEntity.ok(userRepository.findByEmail(email).isPresent());
    }

    @GetMapping("/isOAuth")
    public ResponseEntity<Boolean> isOAuthUser(@RequestParam("email") @Email String email) {
        return ResponseEntity.ok(userRepository.findByEmail(email)
            .map(user -> !StringUtils.hasLength(user.getPassword()))
            .orElse(false));
    }

    @GetMapping("/isUserOnboarded")
    public ResponseEntity<Boolean> isUserOnboarded(@RequestParam("email") @Email String email) {
        return ResponseEntity.ok(userRepository.findByEmail(email)
                .map(User::isOnboardingComplete)
                .orElse(false));
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/completeOnboarding")
    public ResponseEntity<?> completeUserOnboarding(@AuthenticationPrincipal User user) {
        user.setOnboardingComplete(true);
        user.setOnboardingStep(UserOnboardingStep.COMPLETE);
        userRepository.save(user);
        Optional<User> user2 = userRepository.findById(user.getId());
        user2.ifPresent(value -> System.out.println(value.getProfile().getType().toValue()));

        return ResponseEntity.ok(userPlatform.convertToDto(user2.get()));
//        return ResponseEntity.ok(UserPlatformDtoConverter.convertToDto(user)
//                .map(User::isOnboardingComplete)
//                .orElse(false));

    }

    @PostMapping("/changeProfile")
    public ResponseEntity<?> changeProfile(@AuthenticationPrincipal User user,
                                           @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        try {
            if (file != null && !file.isEmpty()) {
                profileService.handleFileUpload(user, file);
            }
            return ResponseEntity.ok().body("upload successful");
        }   catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("An error occurred while changing profile");
        }

    }

}
