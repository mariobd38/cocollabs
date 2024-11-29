package com.stringwiz.app.user.dto;

import com.stringwiz.app.profile.dto.ProfileDto;
import com.stringwiz.app.space.dto.UserSpaceDto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPlatformDto {
    private UserDto userDto;
    private ProfileDto profileDto;
    private UserPreferenceDto userPreferenceDto;
    private Set<UserSpaceDto> userSpaceDto;
}
