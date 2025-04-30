package com.cocollabs.app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity()
@Table(name = "waitlist_dim")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Waitlist {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    private String email;

    private boolean invited = false;

    @Column(name = "invite_token")
    private String inviteToken;

    @Column(name = "created_on", updatable = false)
    private LocalDateTime createdOn;

    @Column(name = "updated_on")
    private LocalDateTime updatedOn;

    @PrePersist
    protected void onCreate() {
        this.createdOn = LocalDateTime.now();
        this.updatedOn = this.createdOn;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedOn = LocalDateTime.now();
    }
}
