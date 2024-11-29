package com.stringwiz.app.space.dto;

import com.stringwiz.app.space.model.SpaceIcon;
import com.stringwiz.app.space.model.Visibility;
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
    private Visibility visibility;
}
