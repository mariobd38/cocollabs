package com.stringwiz.app.space.service;

import com.stringwiz.app.space.model.Visibility;
import com.stringwiz.app.space.model.Space;
import com.stringwiz.app.space.util.SpaceSlugGenerationUtil;
import com.stringwiz.app.user.model.User;
import com.stringwiz.app.space.repository.SpaceRepository;
import com.stringwiz.app.user.repository.UserRepository;
import com.stringwiz.app.userSpace.model.UserSpaceActivity;
import com.stringwiz.app.userSpace.repository.UserSpaceActivityRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SpaceService {
    private final SpaceRepository spaceRepository;
    private final UserRepository userRepository;
    private final UserSpaceActivityRepository userSpaceActivityRepository;

    public SpaceService(SpaceRepository spaceRepository,
                        UserRepository userRepository,
                        UserSpaceActivityRepository userSpaceActivityRepository) {
        this.spaceRepository = spaceRepository;
        this.userRepository = userRepository;
        this.userSpaceActivityRepository = userSpaceActivityRepository;
    }

    @Transactional
    public Space save(User user, Space space) {
        if (user == null || space == null) {
            throw new IllegalArgumentException("User and Space cannot be null");
        }

        User currentUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + user.getId()));

        try {
            Space spaceDetails = new Space(space.getName(), space.getDescription(), space.getIcon(),
                        space.getVisibility(),SpaceSlugGenerationUtil.generateSlug(space.getName()));

            currentUser.addSpace(spaceDetails);

            UserSpaceActivity newActivity = new UserSpaceActivity(user,spaceDetails);

            spaceDetails = userRepository.save(currentUser).getSpaces()
                    .stream()
                    .filter(s -> s.getName().equals(space.getName()))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Failed to save space"));

            userSpaceActivityRepository.save(newActivity);

            return spaceDetails;
        } catch (Exception e) {
            throw new RuntimeException("Failed to save space", e);
        }
    }

    public Space getUserPersonalSpace(User user) {
        return userRepository.findById(user.getId())
            .map(foundUser ->
                spaceRepository.findByVisibilityAndUsers(Visibility.PERSONAL, user)
                    .orElseThrow(() -> new IllegalArgumentException(
                        "Personal space not found for user: " + user.getEmail())
                    )
            )
            .orElseThrow(() -> new IllegalArgumentException(
                    "User not found with email: " + user.getEmail())
            );
    }

    public Space getByUser(User user, String spaceName) {
        return userRepository.findById(user.getId())
            .map(foundUser ->
                spaceRepository.findByNameAndUsers(spaceName, foundUser)
                    .orElseThrow(() -> new IllegalArgumentException(
                        "Space not found with name: " + spaceName + " for user: " + user.getEmail())
                    )
            )
            .orElseThrow(() -> new IllegalArgumentException(
                "User not found with email: " + user.getEmail())
            );
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
