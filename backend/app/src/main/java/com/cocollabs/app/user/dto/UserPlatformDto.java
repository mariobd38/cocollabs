package com.cocollabs.app.user.dto;

import com.cocollabs.app.profile.dto.ProfileDto;
import com.cocollabs.app.space.dto.UserSpaceDto;
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
