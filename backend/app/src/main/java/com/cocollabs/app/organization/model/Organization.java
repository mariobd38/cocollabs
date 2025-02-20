package com.cocollabs.app.organization.model;

import com.cocollabs.app.user.model.User;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity()
@Table(name = "organizations_dim")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Organization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(unique = true, nullable = false)
    private String url;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private Boolean isPublic = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrganizationType type = OrganizationType.PERSONAL;

    @JsonIgnore
    @ManyToMany(mappedBy = "organizations", fetch = FetchType.LAZY)
    private Set<User> users = new LinkedHashSet<>();

    @Column(nullable = false)
    private LocalDateTime createdOn;

    @Column(nullable = false)
    private LocalDateTime lastUpdatedOn;


    public enum OrganizationType {
        PERSONAL,SMALL_TEAM,STARTUP,COMPANY;

        @JsonCreator
        public static OrganizationType fromString(String value) {
            return OrganizationType.valueOf(value.toUpperCase());
        }

        @JsonValue
        public String toValue() {
            return name().toLowerCase();
        }
    }
}
