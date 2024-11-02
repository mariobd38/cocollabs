package com.stringwiz.app.web;

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
