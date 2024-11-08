package com.stringwiz.app.task.controller;

import com.stringwiz.app.task.model.Task;
import com.stringwiz.app.user.model.User;
import com.stringwiz.app.user.repository.UserRepository;
import com.stringwiz.app.task.service.TaskService;
import com.stringwiz.app.user.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
//@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired TaskService taskService;
    @Autowired UserRepository userRepository;
    @Autowired JwtUtil jwtUtil;

    @PostMapping("/api/tasks/create")
    public ResponseEntity<?> createTask(@AuthenticationPrincipal User user, @RequestBody Task task, @RequestParam("spaceId") Long spaceId) {
        try {
            Task newTask = taskService.save(user, task,spaceId);
            return ResponseEntity.ok(newTask);
        } catch (Exception e) {
            return ResponseEntity.ok(new Task());
        }
    }

    @GetMapping("/api/tasks/get")
    public ResponseEntity<?> getTasks(@CookieValue(name = "${JWT_COOKIE_ATTRIBUTE_NAME}", required = false) String jwt) {
        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT token not found in cookie");
        }
        try {
            Optional<User> optionalUser = userRepository.findByEmail(jwtUtil.getUserEmailFromToken(jwt));
            if (optionalUser.isPresent()) {
                List<Task> tasks = taskService.get(optionalUser.get());
                return ResponseEntity.ok(tasks);
            }
            throw new NullPointerException("User does not exist");
        } catch(NullPointerException e) {
            throw new NullPointerException("Task does not exist");
        }
    }

    @GetMapping("/api/tasks/getBySpace")
    public ResponseEntity<?> getTasksBySpace(@CookieValue(name = "${JWT_COOKIE_ATTRIBUTE_NAME}", required = false) String jwt, @RequestParam("spaceName") String spaceName) {
        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT token not found in cookie");
        }
        try {
            Optional<User> optionalUser = userRepository.findByEmail(jwtUtil.getUserEmailFromToken(jwt));
            if (optionalUser.isPresent()) {
                List<Task> tasks = taskService.getBySpace(optionalUser.get(),spaceName);
                return ResponseEntity.ok(tasks);
            }
            throw new NullPointerException("User does not exist");
        } catch(NullPointerException e) {
            throw new NullPointerException("Task does not exist");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/api/tasks/put")
    public ResponseEntity<?> updateTask(@RequestBody Task task) {
        Task myTask = taskService.update(task);
        return ResponseEntity.ok(myTask);
    }

    @DeleteMapping("/api/tasks/delete")
    public ResponseEntity<?> deleteTask(@RequestBody Task task) {
        taskService.delete(task);
        return ResponseEntity.noContent().build();
    }
}
