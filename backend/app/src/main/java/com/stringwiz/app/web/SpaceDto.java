package com.stringwiz.app.web;

import com.stringwiz.app.enums.Visibility;
import com.stringwiz.app.models.Space;
import com.stringwiz.app.models.SpaceIcon;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpaceDto {
    private String name;
    private SpaceIcon icon;
    private String description;
    private static final Visibility visibility = Visibility.PERSONAL;

    public Space toEntity() {
        return Space.builder()
                .name(this.name)
                .description(this.description)
                .icon(this.icon)
                .visibility(visibility)
                .build();
    }
}
