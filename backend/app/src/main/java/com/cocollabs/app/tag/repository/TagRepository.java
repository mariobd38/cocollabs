package com.cocollabs.app.tag.repository;

import com.cocollabs.app.tag.model.Tag;
import com.cocollabs.app.task.model.Task;
import com.cocollabs.app.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Set<Tag> findByTasks(Task task);
    List<Tag> findByUser(User user);
}
