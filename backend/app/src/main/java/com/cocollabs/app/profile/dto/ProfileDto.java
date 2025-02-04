package com.cocollabs.app.profile.dto;

import com.cocollabs.app.profile.model.Profile.ProfileType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {
    private String color;
    private ProfileFileDto pfd;
    private ProfileType type;
    private String svg;
    private String preSignedUrl;
}
