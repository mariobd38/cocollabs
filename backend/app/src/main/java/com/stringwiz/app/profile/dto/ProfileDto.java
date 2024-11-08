package com.stringwiz.app.profile.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {
    private String color;
    private ProfileFileDto pfd;
    private String avatarType;
}
