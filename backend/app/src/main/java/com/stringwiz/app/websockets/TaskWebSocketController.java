package com.stringwiz.app.websockets;

import com.stringwiz.app.task.model.Task;
import com.stringwiz.app.user.model.User;
import com.stringwiz.app.user.repository.UserRepository;
import com.stringwiz.app.task.service.TaskService;
import com.stringwiz.app.user.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Controller
public class TaskWebSocketController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private TaskService taskService;

    @MessageMapping("/tasks")
    @SendTo("/topic/tasks")
    public List<Task> sendTasks(SimpMessageHeaderAccessor headerAccessor) {
        String jwt = null;
        for(String k : headerAccessor.getSessionAttributes().keySet()) {
            if (k.equals("jwt")) {
                jwt = headerAccessor.getSessionAttributes().get(k).toString();
            }
        }
        if (jwt == null) {
            throw new IllegalArgumentException("JWT token is missing");
        }

        try {
            Optional<User> optionalUser = userRepository.findByEmail(jwtUtil.getUserEmailFromToken(jwt));
            if (optionalUser.isPresent()) {
                List<Task> tasks = taskService.get(optionalUser.get());
                Collections.reverse(tasks);
                return tasks;
            }
            throw new IllegalArgumentException("User does not exist");
        } catch (Exception e) {
            throw new IllegalArgumentException("Error processing task request", e);
        }
    }


    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public String handleMessage(String message) {
        System.out.println("message");
        // Just echo the received message for simplicity
        return "Echo: " + message;
    }
}
