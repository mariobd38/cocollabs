package com.stringwiz.app.task.controller;

import com.stringwiz.app.task.model.Task;
import com.stringwiz.app.user.model.User;
import com.stringwiz.app.user.repository.UserRepository;
import com.stringwiz.app.task.service.TaskService;
import com.stringwiz.app.auth.util.JwtUtil;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Controller
public class TaskWebSocketController {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final TaskService taskService;

    public TaskWebSocketController(UserRepository userRepository,JwtUtil jwtUtil,TaskService taskService) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.taskService = taskService;
    }

    @MessageMapping("/tasks")
    @SendTo("/topic/tasks")
    public List<Task> sendTasks(SimpMessageHeaderAccessor headerAccessor) {
        try {
            String jwt = null;
            for(String k : Objects.requireNonNull(headerAccessor.getSessionAttributes()).keySet()) {
                if (k.equals("jwt")) {
                    jwt = headerAccessor.getSessionAttributes().get(k).toString();
                }
            }
            if (jwt == null) {
                throw new IllegalArgumentException("JWT token is missing");
            }

            Optional<User> optionalUser = userRepository.findByEmail(jwtUtil.getUserEmailFromToken(jwt));
            if (optionalUser.isPresent()) {
                List<Task> tasks = taskService.get(optionalUser.get());
                Collections.reverse(tasks);
                return tasks;
            }
            throw new IllegalArgumentException("User does not exist");
        } catch(NullPointerException npe) {
            throw new NullPointerException("User not found");
        } catch (Exception e) {
            throw new IllegalArgumentException("Error processing task request", e);
        }
    }


    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public String handleMessage(String message) {
        // Just echo the received message for simplicity
        return "Echo: " + message;
    }
}
