package com.stringwiz.app.task.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.tasks.Tasks;
import com.google.api.services.tasks.model.TaskList;
import com.google.api.services.tasks.model.Task;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;

@Service
public class GoogleTaskService {

    private static final String APPLICATION_NAME = "Cocollabs";
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();


    public void getTaskLists(String accessToken) throws IOException, GeneralSecurityException {
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);


        Tasks tasksService = new Tasks.Builder(
                HTTP_TRANSPORT,
                JSON_FACTORY,
                credential)
                .setApplicationName(APPLICATION_NAME)
                .build();

        List<TaskList> taskLists =  tasksService.tasklists().list().execute().getItems();
        for(TaskList list : taskLists) {
            String id = list.getId();
            //System.out.println(list);
            List<Task> tasks = getTasksFromTaskList(HTTP_TRANSPORT,accessToken,id);
            //System.out.println(tasks);
        }
    }

    private List<Task> getTasksFromTaskList(NetHttpTransport HTTP_TRANSPORT,String accessToken, String taskListId) throws IOException, GeneralSecurityException {
        GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);

        Tasks tasksService = new Tasks.Builder(
                HTTP_TRANSPORT,
                JSON_FACTORY,
                credential)
                .setApplicationName(APPLICATION_NAME)
                .build();

        //get completed tasks
//        Tasks.TasksOperations.List request = tasksService.tasks().list(taskListId)
//                .setShowCompleted(true)
//                .setShowHidden(true)
//                .setMaxResults(100);
//        List<Task> allCompletedTasks = new ArrayList<>();
//        com.google.api.services.tasks.model.Tasks tasks = request.execute();
//
//        if (tasks.getItems() != null) {
//            for (Task task : tasks.getItems()) {
//                System.out.println(task);
//            }
//        }

        return tasksService.tasks().list(taskListId).execute().getItems();
    }

//    public List<Task> getTasksFromTaskList(String accessToken, String taskListId) throws IOException, GeneralSecurityException {
//        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
//        GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);
//
//        Tasks tasksService = new Tasks.Builder(
//                HTTP_TRANSPORT,
//                JSON_FACTORY,
//                credential)
//                .setApplicationName(APPLICATION_NAME)
//                .build();
//
//        return tasksService.tasks().list(taskListId).execute().getItems();
//    }
}