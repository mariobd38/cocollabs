package com.cocollabs.app.space.dto;

import com.cocollabs.app.space.model.Space.SpaceVisibility;
import com.cocollabs.app.space.model.Space.SpaceType;
import com.cocollabs.app.space.model.Space;
import com.cocollabs.app.space.model.SpaceIcon;
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
    private SpaceType type;
    //private static final Visibility visibility = Visibility.PERSONAL;
    private SpaceVisibility visibility;

    public Space toEntity() {
        return Space.builder()
                .name(this.name)
                .description(this.description)
                .icon(this.icon)
                .visibility(this.visibility)
                .build();
    }
}
