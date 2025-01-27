package com.cocollabs.app.task.service;

import com.cocollabs.app.space.model.Space;
import com.cocollabs.app.space.repository.SpaceRepository;
import com.cocollabs.app.task.model.Task;
import com.cocollabs.app.task.repository.TaskRepository;
import com.cocollabs.app.user.model.User;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final SpaceRepository spaceRepository;

    public TaskService(TaskRepository taskRepository, SpaceRepository spaceRepository) {
        this.taskRepository = taskRepository;
        this.spaceRepository = spaceRepository;
    }

    public Task save(User user, Task task, Long space_id) {
        Optional<Space> optionalSpace = spaceRepository.findById(space_id);
        if (optionalSpace.isPresent()) {
            Space currentSpace = optionalSpace.get();

            Task taskDetails = new Task(task.getName(),task.getDescription(),task.getDescriptionHtml(), task.getStatus(),
                    task.getPriority(), user, task.getDueDate(), task.getDueDateTime());
            taskDetails.setSpace(currentSpace);

            Task newTask = taskRepository.save(taskDetails);
            currentSpace.getTasks().add(newTask);
            spaceRepository.save(currentSpace);
            return newTask;
        }
        // Handle case when space is not found
        throw new EntityNotFoundException("Space with id " + space_id + " not found");
    }

    public List<Task> get(User user) {
        return taskRepository.findByUser(user)
                .map(tasks -> tasks.stream()
                        .peek(this::convertTaskDueDateToSystemZone)
                        .collect(Collectors.toList()))
                .orElseThrow(() -> new NoSuchElementException("User could not found"));
    }

    public List<Task> getBySpace(User user, String spaceName) {
        return spaceRepository.findByNameAndUsers(spaceName, user)
                .map(space -> taskRepository.findBySpace(space)
                        .map(tasks -> tasks.stream()
                                .peek(this::convertTaskDueDateToSystemZone)
                                .collect(Collectors.toList()))
                        .orElse(Collections.emptyList()))
                .orElse(Collections.emptyList());
    }

    public Task getById(Long taskId) {
        return taskRepository.findById(taskId).orElse(null);
    }

    public Task update(Task task) {
        return taskRepository.findById(task.getId())
            .map(existingTask -> {
                BeanUtils.copyProperties(task, existingTask, getNullPropertyNames(task));
                existingTask.setLastUpdatedOn(Timestamp.from(Instant.now()));
                return taskRepository.save(existingTask);
            })
            .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + task.getId()));
    }


    public void delete(Task task) {
        taskRepository.deleteById(task.getId());
    }

    private void convertTaskDueDateToSystemZone(Task task) {
        if (task.getDueDate() != null) {
            ZoneId pstZone = ZoneId.systemDefault();
            ZonedDateTime convertedDate = task.getDueDate().withZoneSameInstant(pstZone);
            task.setDueDate(convertedDate);
        }
    }

    // Helper method to get null property names
    private String[] getNullPropertyNames(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<>();
        for (java.beans.PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }
        return emptyNames.toArray(new String[0]);
    }
}
