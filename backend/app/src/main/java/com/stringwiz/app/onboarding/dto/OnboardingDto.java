package com.stringwiz.app.onboarding.dto;

import com.stringwiz.app.space.dto.SpaceDto;
import com.stringwiz.app.profile.dto.ProfileDto;
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
