package com.stringwiz.app.comment.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.stringwiz.app.task.model.Task;
import com.stringwiz.app.user.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@Entity()
@Table(name = "comments_dim")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id")
    private Task task;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id") // Name of the foreign key column in the comments table
    private User user;

    private String content;

    @CreationTimestamp
    @Column(name="created_on", nullable = false)
    private Timestamp createdOn;

    @UpdateTimestamp
    @Column(name="last_edited_on")
    private Timestamp lastEditedOn;

    @Column(name="number_of_likes")
    private Integer likesNum;


}
