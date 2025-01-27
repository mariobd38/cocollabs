package com.stringwiz.app.profile.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stringwiz.app.user.model.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity()
@Table(name = "profile_dim")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @Column
    private String type;

    @Column
    private String color;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String svg;

    @JoinColumn(name = "file_id", referencedColumnName = "id")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private ProfileFile profileFile;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Profile(String type, String color, ProfileFile profileFile, User user) {
        this.type = type;
        this.color = color;
        this.profileFile = profileFile;
        this.user = user;
    }

    public Profile(String type, String svg) {
        this.type = type;
        this.svg = svg;
    }

}
