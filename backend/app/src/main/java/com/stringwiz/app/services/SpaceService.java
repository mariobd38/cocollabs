package com.stringwiz.app.services;

import com.stringwiz.app.enums.Visibility;
import com.stringwiz.app.models.Space;
import com.stringwiz.app.models.Task;
import com.stringwiz.app.models.User;
import com.stringwiz.app.repositories.SpaceRepository;
import com.stringwiz.app.repositories.TaskRepository;
import com.stringwiz.app.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class SpaceService {
    @Autowired private SpaceRepository spaceRepository;
    @Autowired private UserRepository userRepository;
    @Autowired TaskRepository taskRepository;

    @Transactional
    public Space save(User user, Space space) {
        try {
            Optional<User> optionalUser = userRepository.findById(user.getId());
            if (optionalUser.isPresent()) {
                User currentUser = optionalUser.get();

                Space spaceDetails = new Space(space.getName(), space.getDescription(), space.getIcon(),
                        space.getVisibility());

                currentUser.addSpace(spaceDetails);
                userRepository.save(currentUser);
                return spaceDetails;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        throw new NoSuchElementException("User not found");

    }

    public Space getUserPersonalSpace(User user) {
        Optional<User> optionalUser = userRepository.findById(user.getId());
        if (optionalUser.isPresent()) {
            User foundUser = optionalUser.get();
            //System.out.println(spaceRepository.findByVisibilityAndUsers(Visibility.PERSONAL, foundUser));
            return spaceRepository.findByVisibilityAndUsers(Visibility.PERSONAL, foundUser);
        } else {
            throw new IllegalArgumentException("User not found with email: " + user.getEmail());
        }
    }

    public Space getByUser(User user, String spaceName) {
        Optional<User> optionalUser = userRepository.findById(user.getId());
        if (optionalUser.isPresent()) {
            User foundUser = optionalUser.get();
            Optional<Space> optionalSpace = spaceRepository.findByNameAndUsers(spaceName, foundUser);

            if (optionalSpace.isPresent()) {
                return optionalSpace.get();
            } else {
                throw new IllegalArgumentException("Space not found with name: " + spaceName + " for user: " + user.getEmail());
            }
        } else {
            throw new IllegalArgumentException("User not found with email: " + user.getEmail());
        }
    }

    /*public void linkWithTasks(User user, Space space) {
        try {
            Optional<User> optionalUser = userRepository.findById(user.getId());
            if (optionalUser.isPresent()) {
                User currentUser = optionalUser.get();
                System.out.println(currentUser.getFullName());
                List<Task> tasks = taskRepository.findByUser(currentUser);
                System.out.println(space.getDescription());

                Space spaceDetails = new Space(space.getName(), space.getDescription(), space.getIcon(),
                        space.getVisibility());
                currentUser.addSpace(spaceDetails);
                userRepository.save(currentUser);
                for(Task task : tasks) {
                    task.setSpace(spaceDetails);
                    taskRepository.save(task);
                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        throw new NoSuchElementException("User not found");
    }*/
}
