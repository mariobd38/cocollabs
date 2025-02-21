package com.cocollabs.app.organization.dto;

import com.cocollabs.app.organization.model.Organization;
import com.cocollabs.app.organization.model.Organization.OrganizationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrganizationDto {
    private String name;
    private String description;
    private String slug;
    private Boolean isPublic;
    private OrganizationType type;

    public static OrganizationDto mapper(Organization org) {
        return OrganizationDto.builder()
                .name(org.getName())
                .description(org.getDescription())
                .slug(org.getSlug())
                .isPublic(org.getIsPublic())
                .type(org.getType())
                .build();
    }
}
