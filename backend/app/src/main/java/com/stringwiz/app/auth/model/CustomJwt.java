package com.stringwiz.app.auth.model;

import com.stringwiz.app.user.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity()
@Table(name = "custom_jwt_dim")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomJwt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 60)
    private String tokenHash;

    @Column(nullable = false)
    private Timestamp expiryDate;

    @Column(nullable = false)
    private Timestamp issuedAt;

    @Column(nullable = false)
    private boolean revoked;

    public CustomJwt(User user, String tokenHash, long validityInSeconds) {
        this.user = user;
        this.tokenHash = tokenHash;
        long currentMillis = System.currentTimeMillis();
        this.issuedAt = new Timestamp(currentMillis);
        this.expiryDate = new Timestamp(currentMillis + (validityInSeconds * 1000));
        this.revoked = false;
    }
}
