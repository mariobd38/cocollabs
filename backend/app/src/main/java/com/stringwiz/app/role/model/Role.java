package com.stringwiz.app.role.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stringwiz.app.user.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name="roles_dim")
public class Role {
//    USER, ADMIN
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @Column(nullable=false, unique=true)
    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy="roles")
    private List<User> users;

    @CreationTimestamp
    @Column(name="created_on")
    private Timestamp createdOn;

    public Role(String name) {
        this.name = name;
    }

    public Role(RoleNames roleNames) {

    }
}
