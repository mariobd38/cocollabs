package com.stringwiz.app.task.service;

import com.stringwiz.app.space.model.Space;
import com.stringwiz.app.task.model.Task;
import com.stringwiz.app.user.model.User;
import com.stringwiz.app.space.repository.SpaceRepository;
import com.stringwiz.app.task.repository.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired private TaskRepository taskRepository;
    @Autowired private SpaceRepository spaceRepository;

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
        List<Task> taskList = taskRepository.findByUser(user);
        taskList.forEach(this::convertTaskDueDateToSystemZone);
        return taskList;
    }

    public List<Task> getBySpace(User user, String spaceName) throws NoSuchElementException {
        Optional<Space> optionalSpace = spaceRepository.findByNameAndUsers(spaceName,user);

        if (!optionalSpace.isPresent()) {
            throw new NoSuchElementException("Space not found with name: " + spaceName);
        }

        List<Task> taskList = taskRepository.findBySpace(optionalSpace.get());

        taskList.forEach(this::convertTaskDueDateToSystemZone);

        return taskList;
    }
    public Task update(Task task) {
        try {
            Task existingTask = taskRepository.findById(task.getId()).orElse(null);
            assert existingTask != null;
            existingTask.setName(task.getName());
            existingTask.setDescription(task.getDescription());
            existingTask.setDescriptionHtml(task.getDescriptionHtml());
            existingTask.setDueDate(task.getDueDate());
            existingTask.setDueDateTime(task.getDueDateTime());
            existingTask.setPriority(task.getPriority());
            existingTask.setStatus(task.getStatus());
            existingTask.setLastUpdatedOn(new Timestamp(new Date().getTime()));
            return taskRepository.save(existingTask);
        } catch (NullPointerException npe) {
            throw new NullPointerException("Task does not exist");
        }
    }

    public void delete(Task task) {
        taskRepository.deleteById(task.getId());
    }

    private void convertTaskDueDateToSystemZone(Task task) {
        if (task.getDueDate() != null) {
            // Parse and convert the ZonedDateTime
            ZoneId pstZone = ZoneId.systemDefault();
            ZonedDateTime convertedDate = task.getDueDate().withZoneSameInstant(pstZone);
            task.setDueDate(convertedDate);
        }
    }
}
