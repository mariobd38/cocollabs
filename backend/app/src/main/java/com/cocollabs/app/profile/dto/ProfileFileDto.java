package com.cocollabs.app.profile.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfileFileDto {
    private String data;
    private String name;
    private String type;
}
