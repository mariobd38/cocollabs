package com.stringwiz.app.user.dto;

import com.stringwiz.app.profile.dto.ProfileDto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPlatformDto {
    @NotBlank
    private String fullName;
    @NotBlank
    @Email
    private String email;
    private String picture;
    private ProfileDto profileDto;
}
