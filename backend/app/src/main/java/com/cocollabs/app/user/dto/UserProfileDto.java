package com.cocollabs.app.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto {
    @NotBlank
    private String fullName;
    @NotBlank
    private String username;
    private String avatarName;
}
