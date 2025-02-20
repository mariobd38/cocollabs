package com.cocollabs.app.space.model;

import com.cocollabs.app.task.model.Task;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.cocollabs.app.space.util.SpaceIconConverter;
import com.cocollabs.app.user.model.User;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@Entity()
@Table(name = "spaces_dim")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Space {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String name;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String description;

    @Column(unique = true,nullable = false)
    private String slug;

    @Column(unique = true,nullable = false)
    private String url;

    @Convert(converter = SpaceIconConverter.class)
    @Column(columnDefinition = "TEXT")
    private SpaceIcon icon;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "VARCHAR(255) NOT NULL DEFAULT 'PRIVATE'")
    private SpaceVisibility visibility = SpaceVisibility.PRIVATE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SpaceType type = SpaceType.PERSONAL;

    @CreationTimestamp
    @Column(name="created_on", nullable = false)
    private Timestamp createdOn;

    @UpdateTimestamp
    @Column(name="last_updated_on")
    private Timestamp lastUpdatedOn;

    @OneToMany(mappedBy = "space", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Task> tasks = new ArrayList<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "spaces", fetch = FetchType.LAZY)
    private Set<User> users = new LinkedHashSet<>();


    public enum SpaceType {
        PERSONAL,SMALL_TEAM, STARTUP,COMPANY;

        @JsonCreator
        public static SpaceType fromString(String value) {
            return SpaceType.valueOf(value.toUpperCase());
        }

        @JsonValue
        public String toValue() {
            return name().toLowerCase(); // Optional: if you want to serialize it as lowercase
        }
    }

    public enum SpaceVisibility {
        PERSONAL, PUBLIC, PRIVATE;

        @JsonCreator
        public static SpaceVisibility fromString(String value) {
            return SpaceVisibility.valueOf(value.toUpperCase());
        }

        @JsonValue
        public String toValue() {
            return name().toLowerCase(); // Optional: if you want to serialize it as lowercase
        }
    }


//    public void addTask(Task task) {
//        tasks.add(task);
//        task.getSpace().add(this);
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (!(o instanceof Task)) return false;
//        return id != null && id.equals(((Space) o).getId());
//    }
//
//    @Override
//    public int hashCode() {
//        return getClass().hashCode();
//    }
}
