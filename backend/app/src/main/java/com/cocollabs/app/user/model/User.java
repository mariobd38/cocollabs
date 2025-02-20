package com.cocollabs.app.user.model;

import com.cocollabs.app.comment.model.Comment;
import com.cocollabs.app.organization.model.Organization;
import com.cocollabs.app.profile.model.Profile;
import com.cocollabs.app.role.model.Role;
import com.cocollabs.app.space.model.Space;
import com.cocollabs.app.tag.model.Tag;
import com.cocollabs.app.task.model.Task;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity()
@Table(name = "users_dim")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @Column(nullable = false,unique = true)
    private String email;

    @Column(unique = true)
    private String username;

    @JsonIgnore
    @Column(length = 60)
    private String password;

    @CreationTimestamp
    @Column(name="created_on")
    private Timestamp createdOn;

    @UpdateTimestamp
    @Column(name="last_updated_on")
    private Timestamp lastUpdatedOn;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Task> tasks = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Tag> tags = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Profile profile;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "VARCHAR(255) NOT NULL DEFAULT 'PROFILE'")
    private UserOnboardingStep onboardingStep = UserOnboardingStep.PROFILE;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "preference_id")
    private UserPreference userPreference;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER, cascade= CascadeType.ALL)
    @JoinTable(
            name="users_roles",
            joinColumns={@JoinColumn(name="USER_ID", referencedColumnName="ID")},
            inverseJoinColumns={@JoinColumn(name="ROLE_ID", referencedColumnName="ID")})
    private List<Role> roles = new ArrayList<>();

    @JsonIgnore
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "user_space_dim",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "space_id")})
    private Set<Space> spaces = new LinkedHashSet<>();

    @JsonIgnore
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "user_organizations_dim",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "organization_id")})
    private Set<Organization> organizations = new LinkedHashSet<>();


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
        //List<RoleNames> roleNames = new RoleSelectorUtil().getRolesFromEmail(email);
        //List<SimpleGrantedAuthority> result = new ArrayList<>();
        //for(RoleNames roleName : roleNames) {
        //    result.add(new SimpleGrantedAuthority(roleName.name()));
        //}
        //return result;

        //return List.of(new SimpleGrantedAuthority(Role.RoleNames.USER.name()),new SimpleGrantedAuthority(Role.RoleNames.USER.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void addSpace(Space space) {
        spaces.add(space);
        space.getUsers().add(this);
    }

    public void addOrganization(Organization organization) {
        organizations.add(organization);
        organization.getUsers().add(this);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        return id != null && id.equals(((User) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    public enum UserOnboardingStep {
        PROFILE, ORGANIZATION, COMPLETE;

        @JsonCreator
        public static User.UserOnboardingStep fromString(String value) {
            return User.UserOnboardingStep.valueOf(value.toUpperCase());
        }

        @JsonValue
        public String toValue() {
            return name().toLowerCase(); // Optional: if you want to serialize it as lowercase
        }
    }

}
