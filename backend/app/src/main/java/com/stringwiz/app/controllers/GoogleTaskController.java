package com.stringwiz.app.controllers;

/*
import com.google.api.services.tasks.model.TaskList;
import com.stringwiz.app.models.User;
import com.stringwiz.app.services.GoogleTaskService;
import com.stringwiz.app.services.UserTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

@RestController
public class GoogleTaskController {

    @Autowired
    private GoogleTaskService googleTasksService;
    @Autowired private UserTokenService userTokenService;

    @GetMapping("/api/tasks/get/google")
    public void getTaskLists(@AuthenticationPrincipal User user) throws IOException, GeneralSecurityException {
        String accessToken = userTokenService.getUserToken(user.getId()).getAccessToken();
//        List<TaskList> list = googleTasksService.getTaskLists(accessToken);
//        for(TaskList t : list) {
//            System.out.println(t);
//        }
        googleTasksService.getTaskLists(accessToken);
    }

//    @GetMapping("/api/google-tasks/tasks")
//    public List<Task> getTasksFromTaskList(@RequestParam String accessToken, @RequestParam String taskListId) throws IOException {
//        return googleTasksService.getTasksFromTaskList(accessToken, taskListId);
//    }
}

 */