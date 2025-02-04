package com.cocollabs.app.user.dto;

import com.cocollabs.app.user.model.User.UserOnboardingStep;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    @NotBlank
    private String fullName;
    @NotBlank
    @Email
    private String email;
    private String username;
    private String picture;
    private UserOnboardingStep onboardingStep;
}
