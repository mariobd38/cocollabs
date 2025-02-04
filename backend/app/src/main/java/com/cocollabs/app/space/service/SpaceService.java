package com.cocollabs.app.space.service;

import com.cocollabs.app.profile.service.ProfileService;
import com.cocollabs.app.space.dto.SpaceDto;
import com.cocollabs.app.space.model.Space;
import com.cocollabs.app.space.repository.SpaceRepository;
import com.cocollabs.app.space.util.SpaceSlugGenerationUtil;
import com.cocollabs.app.userSpace.model.UserSpaceActivity;
import com.cocollabs.app.userSpace.repository.UserSpaceActivityRepository;
import com.cocollabs.app.space.model.Space.SpaceVisibility;
import com.cocollabs.app.user.model.User;
import com.cocollabs.app.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashSet;
import java.util.Map;

@Service
public class SpaceService {
    private final Logger log = LoggerFactory.getLogger(ProfileService.class);
    private final SpaceRepository spaceRepository;
    private final UserRepository userRepository;
    private final UserSpaceActivityRepository userSpaceActivityRepository;
    @Value("${COCOLLABS_BASE_URL}")
    private String baseUrl;

    public SpaceService(SpaceRepository spaceRepository,
                        UserRepository userRepository,
                        UserSpaceActivityRepository userSpaceActivityRepository) {
        this.spaceRepository = spaceRepository;
        this.userRepository = userRepository;
        this.userSpaceActivityRepository = userSpaceActivityRepository;
    }

    @Transactional
    public Space save(User user, SpaceDto space) {
        if (user == null || space == null) {
            throw new IllegalArgumentException("User or Space cannot be null");
        }

        User currentUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + user.getId()));

        try {
            String spaceSlug = generateUniqueSlug();
            Timestamp currentTime = new Timestamp(new Date().getTime());

            Space newSpace = Space.builder()
                    .name(space.getName())
                    .description(space.getDescription())
                    .icon(space.getIcon())
                    .visibility(space.getVisibility() != null ? space.getVisibility() : SpaceVisibility.PRIVATE)
                    .type(space.getType())
                    .slug(spaceSlug)
                    .url(baseUrl + "/" + spaceSlug)
                    .createdOn(currentTime)
                    .lastUpdatedOn(currentTime)
                    .users(new HashSet<>())
                    .build();
            currentUser.addSpace(newSpace);
            UserSpaceActivity newActivity = UserSpaceActivity.builder()
                    .user(currentUser)
                    .space(newSpace)
                    .lastActiveAt(currentTime)
                    .build();

            userRepository.save(currentUser);
            userSpaceActivityRepository.save(newActivity);

            //Space spaceDetails = new Space(space.getName(), space.getIcon(), baseUrl, space.getSlug(),space.getVisibility());
//            currentUser.addSpace(spaceDetails);
//
//            UserSpaceActivity newActivity = new UserSpaceActivity(user,spaceDetails);
//
//            spaceDetails = userRepository.save(currentUser).getSpaces()
//                    .stream()
//                    .filter(s -> s.getName().equals(space.getName()))
//                    .findFirst()
//                    .orElseThrow(() -> new RuntimeException("Failed to save space"));
//
//            userSpaceActivityRepository.save(newActivity);

            return spaceRepository.save(newSpace);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save space", e);
        }
    }

    public Space getUserPersonalSpace(User user) {
        return userRepository.findById(user.getId())
            .map(foundUser ->
                spaceRepository.findByVisibilityAndUsers(SpaceVisibility.PERSONAL, user)
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

    @Transactional
    public String generateUniqueSlug() {
        String slug;
        do {
            slug = SpaceSlugGenerationUtil.generateSlug();
        } while (spaceRepository.existsBySlug(slug)); // Ensure uniqueness
        return slug;
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
