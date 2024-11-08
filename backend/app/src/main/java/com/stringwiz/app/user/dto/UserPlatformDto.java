package com.stringwiz.app.user.dto;

import com.stringwiz.app.profile.dto.ProfileDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPlatformDto {
    @NonNull
    private String fullName;
    @NonNull
    private String email;
    private String picture;
    private ProfileDto profileDto;
}
