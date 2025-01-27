package com.cocollabs.app.onboarding.dto;

import com.cocollabs.app.space.dto.SpaceDto;
import com.cocollabs.app.profile.dto.ProfileDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OnboardingDto {
    private ProfileDto profileData;
    private SpaceDto spaceData;
}
