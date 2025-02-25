package com.cocollabs.app.profile.dto;

import com.cocollabs.app.organization.dto.OrganizationDto;
import com.cocollabs.app.organization.model.Organization;
import com.cocollabs.app.profile.model.Profile;
import com.cocollabs.app.profile.model.Profile.ProfileType;
import com.cocollabs.app.space.model.Space;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotBlank
    private String fullName;
    private ProfileType type;
    private String svg;
    private String preSignedUrl;
}
