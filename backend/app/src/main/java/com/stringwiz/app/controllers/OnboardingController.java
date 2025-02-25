package com.stringwiz.app.controllers;

import com.stringwiz.app.exceptions.UserNotFoundException;
import com.stringwiz.app.models.Space;
import com.stringwiz.app.models.User;
import com.stringwiz.app.repositories.ProfileRepository;
import com.stringwiz.app.repositories.UserRepository;
import com.stringwiz.app.services.ProfileService;
import com.stringwiz.app.services.SpaceService;
import com.stringwiz.app.web.OnboardingDto;
import com.stringwiz.app.web.OnboardingResponseDto;
import com.stringwiz.app.web.ProfileDto;
import com.stringwiz.app.web.SpaceDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class OnboardingController {
    @Autowired ProfileRepository profileRepository;
    @Autowired UserRepository userRepository;
    @Autowired ProfileService profileService;
    @Autowired SpaceService spaceService;

    @PostMapping("/api/onboarding/complete")
    public ResponseEntity<?> completeOnboarding(@AuthenticationPrincipal User user, @RequestBody OnboardingDto onboardingDto) {
        try {
            ProfileDto profileData = onboardingDto.getProfileData();
            SpaceDto spaceData = onboardingDto.getSpaceData();

            ResponseEntity<ProfileDto> profileResponseDto = uploadProfile(user, profileData);
            ResponseEntity<SpaceDto> spaceResponseDto = createPersonalSpace(user, spaceData);

            OnboardingResponseDto combinedDtoReponse = new OnboardingResponseDto(profileResponseDto,spaceResponseDto);
            completeUserOnboarding(user);

            return ResponseEntity.ok(combinedDtoReponse);
        } catch(NullPointerException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    private void completeUserOnboarding(User user) {
        user.setOnboardingComplete(true);
        userRepository.save(user);
    }

    private ResponseEntity<ProfileDto> uploadProfile(User user,ProfileDto profileDto) {
        String avatarType = profileDto.getAvatarType();

        if ("default".equals(avatarType)) {
            return ResponseEntity.ok(profileService.handleDefaultAvatar(user));
        }
        String color = profileDto.getColor();
        if (color != null) {
            return ResponseEntity.ok(profileService.handleColorChange(user, color));
        }
        return ResponseEntity.ok(profileService.handleFileUpload(user, profileDto));
    }

    private ResponseEntity<SpaceDto> createPersonalSpace(User user, @Valid SpaceDto spaceData) {
        try {
            Space savedSpace = spaceService.save(user, spaceData.toEntity());
            return ResponseEntity.ok(convertToDto(savedSpace));
        } catch (UserNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "User not found while creating personal space"
            );
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error occurred while creating personal space"
            );
        }
    }

    private SpaceDto convertToDto(Space space) {
        return SpaceDto.builder()
                .name(space.getName())
                .description(space.getDescription())
                .icon(space.getIcon())
                .build();
    }
}
