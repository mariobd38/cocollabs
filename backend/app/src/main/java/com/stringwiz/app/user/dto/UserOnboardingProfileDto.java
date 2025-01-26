package com.stringwiz.app.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserOnboardingProfileDto {
    private String fullName;
    private String username;
}
