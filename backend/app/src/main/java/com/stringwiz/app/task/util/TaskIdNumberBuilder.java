package com.stringwiz.app.task.util;

import java.util.Random;

public class TaskIdNumberBuilder {
    public String buildTaskIdNumber() {
        final int TASK_ID_NUMBER_LENGTH = 8;
        Random rand = new Random();
        String characters = "abcdefghijklmnopqrstuvwxyz0123456789";

        StringBuilder taskIdNumber = new StringBuilder();
        for (int i = 0; i < TASK_ID_NUMBER_LENGTH; i++) {
            int index = rand.nextInt(characters.length());
            char character = characters.charAt(index);
            taskIdNumber.append(character);
        }

        return taskIdNumber.toString();
    }
}
