package com.stringwiz.app.task.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stringwiz.app.space.model.Space;
import com.stringwiz.app.tag.model.Tag;
import com.stringwiz.app.user.model.User;
import com.stringwiz.app.task.util.TaskIdNumberBuilder;
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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Set;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@Entity()
@Table(name = "tasks_dim")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String name;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String description;

    @Column(name = "description_html",columnDefinition = "MEDIUMTEXT")
    private String descriptionHtml;

    private String status;

    private String priority;

    @Column(name = "task_id_number", unique = true)
    private String taskIdNumber;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "space_id", referencedColumnName = "id")
    private Space space;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "task_tags_dim",
            joinColumns = {@JoinColumn(name = "task_id")},
            inverseJoinColumns = {@JoinColumn(name = "tag_id")})
    private Set<Tag> tags = new LinkedHashSet<>();

    //@OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    //private List<Comment> comments;

    @Column(name = "due_date")
    private ZonedDateTime dueDate;

    @Column(name = "due_date_time")
    private ZonedDateTime dueDateTime;

    @CreationTimestamp
    @Column(name="created_on", nullable = false)
    private Timestamp createdOn;

    @UpdateTimestamp
    @Column(name="last_updated_on")
    private Timestamp lastUpdatedOn;

    public Task(String name, String description, String descriptionHtml, String status, String priority, User user, ZonedDateTime dueDate, ZonedDateTime dueDateTime) {
        this.name = name;
        this.description = description;
        this.descriptionHtml = descriptionHtml;
        this.status = status;
        this.priority = priority;
        this.taskIdNumber = new TaskIdNumberBuilder().buildTaskIdNumber();
        this.user = user;
        this.dueDate = dueDate;
        this.dueDateTime = dueDateTime;
        Timestamp currentTime = new Timestamp(new Date().getTime());
        this.createdOn = currentTime;
        this.lastUpdatedOn = currentTime;
    }

    public void addTag(Tag tag) {
        tags.add(tag);
        tag.getTasks().add(this);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Task)) return false;
        return id != null && id.equals(((Task) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
