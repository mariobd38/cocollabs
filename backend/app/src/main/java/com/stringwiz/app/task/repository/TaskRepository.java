package com.stringwiz.app.task.repository;

import com.stringwiz.app.space.model.Space;
import com.stringwiz.app.task.model.Task;
import com.stringwiz.app.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
    List<Task> findBySpace(Space space);
}
