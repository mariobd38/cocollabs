package com.cocollabs.app.profile.controller;

import com.cocollabs.app.profile.repository.ProfileRepository;
import com.cocollabs.app.profile.service.ProfileService;
import com.cocollabs.app.user.dto.UserProfileDto;
import com.cocollabs.app.general.error.ErrorResponse;
import com.cocollabs.app.user.model.User;
import com.cocollabs.app.user.repository.UserRepository;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final Logger log = LoggerFactory.getLogger(ProfileController.class);
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final ProfileService profileService;

    public ProfileController(
            ProfileRepository profileRepository,
            UserRepository userRepository,
            ProfileService profileService ) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
        this.profileService = profileService;
    }

    @PutMapping(value = "/create",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createUserProfile(@AuthenticationPrincipal User user,
                                               @RequestPart("onboardingProfileDto") @Valid UserProfileDto userProfileDto,
                                               @RequestPart(value = "file", required = false) MultipartFile file) {
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
        try {
            String fullName = userProfileDto.getFullName();
            String username = userProfileDto.getUsername();
            String avatarName = userProfileDto.getAvatarName();

            //validation checks
            if (profileService.getUsernameValidationErrors(username) != null) {
                return ResponseEntity.badRequest().body(profileService.getUsernameValidationErrors(username));
            }
            if (userRepository.existsByUsername(username)) {
                return ResponseEntity.badRequest().body(new ErrorResponse("Username is not available", "username"));
            }
            if (profileService.getFullNameValidationErrors(fullName) != null) {
                return ResponseEntity.badRequest().body(profileService.getFullNameValidationErrors(fullName));
            }
            if (profileService.getAvatarNameValidationErrors(avatarName) != null) {
                return ResponseEntity.badRequest().body(profileService.getAvatarNameValidationErrors(avatarName));
            }

            //user.setFullName(customUserService.transformFullName(fullName));
            user.setProfile(profileService.updateFullName(user,fullName));
            user.setUsername(username);
            if (file != null && !file.isEmpty()) {
                if (!profileService.isFileValid(file)) {
                    return ResponseEntity.badRequest().body(new ErrorResponse("Invalid file. Please upload a valid image.", "file"));
                }
                user.setProfile(profileService.handleFileUpload(user, file));
            } else {
                user.setProfile(profileService.handleAvatarCreation(user, avatarName));
            }

            user.setOnboardingStep(User.UserOnboardingStep.ORGANIZATION);
            userRepository.save(user);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Profile creation failed for user {}: {}", user.getId(), e.getMessage());
            return ResponseEntity.internalServerError().body(new ErrorResponse("Unexpected error, please try again later", "username"));

        }
    }

}
