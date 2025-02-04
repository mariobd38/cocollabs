package com.cocollabs.app.space.dto;

import com.cocollabs.app.space.model.SpaceIcon;
import com.cocollabs.app.space.model.Space.SpaceVisibility;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSpaceDto {
    private String name;
    private SpaceIcon icon;
    private String description;
    private String slug;
    private SpaceVisibility visibility;
}
