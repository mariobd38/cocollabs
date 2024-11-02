package com.stringwiz.app.web;

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
