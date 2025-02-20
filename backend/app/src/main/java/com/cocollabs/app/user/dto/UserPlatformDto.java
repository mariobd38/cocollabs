package com.cocollabs.app.user.dto;

import com.cocollabs.app.organization.dto.OrganizationDto;
import com.cocollabs.app.profile.dto.ProfileDto;
import com.cocollabs.app.space.dto.UserSpaceDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPlatformDto {
    private UserDto userDto;
    private ProfileDto profileDto;
    private UserPreferenceDto userPreferenceDto;
    private Set<UserSpaceDto> userSpaceDto;
    private Set<OrganizationDto> organizationDto;

}
