package com.cocollabs.app.onboarding.dto;

import com.cocollabs.app.space.dto.SpaceDto;
import com.cocollabs.app.profile.dto.ProfileDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OnboardingResponseDto {
    private ResponseEntity<ProfileDto> profileData;
    private ResponseEntity<SpaceDto> spaceData;
}
