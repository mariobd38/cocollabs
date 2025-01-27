package com.cocollabs.app.task.repository;

import com.cocollabs.app.task.model.Task;
import com.cocollabs.app.space.model.Space;
import com.cocollabs.app.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Optional<List<Task>> findByUser(User user);
    Optional<List<Task>> findBySpace(Space space);
}
