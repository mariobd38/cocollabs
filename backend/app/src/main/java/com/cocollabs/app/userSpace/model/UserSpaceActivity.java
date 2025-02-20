package com.cocollabs.app.userSpace.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.cocollabs.app.space.model.Space;
import com.cocollabs.app.user.model.User;
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
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.Date;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@Entity()
@Table(name = "user_space_activity_dim")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSpaceActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "space_id", nullable = false)
    private Space space;

    @UpdateTimestamp
    @Column(name="last_active_at")
    private Timestamp lastActiveAt;
}
