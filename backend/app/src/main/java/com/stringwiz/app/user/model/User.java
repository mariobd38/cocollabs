package com.stringwiz.app.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stringwiz.app.comment.model.Comment;
import com.stringwiz.app.profile.model.Profile;
import com.stringwiz.app.role.model.Role;
import com.stringwiz.app.space.model.Space;
import com.stringwiz.app.tag.model.Tag;
import com.stringwiz.app.task.model.Task;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
import java.util.Arrays;
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

    @Column(name = "first_name")
    @Setter private String firstName;

    @Column(name = "last_name")
    @Setter private String lastName;

    @Column(name = "full_name")
    private String fullName;

    @Column(nullable = false,unique = true)
    private String email;

    @Column(length = 60)
    private String password;

    @Column
    private String picture;

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

    @Column(name="is_onboarding_complete")
    private boolean isOnboardingComplete = false;

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
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "user_space_dim",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "space_id")})
    private Set<Space> spaces = new LinkedHashSet<>();


    public User(String fullName, String email, String password, String picture) {
        setFullName(fullName);
        this.email = email;
        this.password = password;
        this.picture = picture;
        Timestamp currentTime = new Timestamp(new Date().getTime());
        this.createdOn = currentTime;
        this.lastUpdatedOn = currentTime;
        this.isOnboardingComplete = false;
    }

    private void setFullName(String fullName) {
        this.fullName = fullName;
        String[] names = fullName.split(" ");
        this.firstName = names.length > 0 ? names[0] : "";
        this.lastName = names.length > 1 ? names[names.length - 1] : "";
    }

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
}
