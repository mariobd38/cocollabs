package com.cocollabs.app.profile.service;

import com.cocollabs.app.profile.model.Profile;
import com.cocollabs.app.user.model.User;
import com.cocollabs.app.profile.repository.ProfileRepository;
import com.cocollabs.app.user.repository.UserRepository;
import com.cocollabs.app.profile.dto.ProfileDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
public class ProfileService {
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;

    public ProfileService(UserRepository userRepository, ProfileRepository profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    //new
    public Profile handleAvatarCreation(User user, String avatarName) {
        Optional<Profile> existingProfile = profileRepository.findByUser(user);

        Profile profile = existingProfile.orElseGet(() -> Profile.builder()
                .type(Profile.ProfileType.AVATAR)
                .svg(avatarName)
                .user(user)
                .build());

        if (existingProfile.isPresent()) {
            profile.setType(Profile.ProfileType.AVATAR);
            profile.setSvg(avatarName);
        }

        return profileRepository.save(profile);
    }

    public Profile handleFileUpload(User user, MultipartFile file) {
        Profile profile = profileRepository.findByUser(user)
                .map(existingProfile -> {
                    existingProfile.setType(Profile.ProfileType.AVATAR);
                    return existingProfile;
                })
                .orElseGet(() -> Profile.builder()
                        .type(Profile.ProfileType.S3_IMAGE)
                        .user(user)
                        .build());

        return profileRepository.save(profile);
    }

    public ProfileDto handleDefaultAvatar(User user) {
        user.setProfile(null);
        userRepository.save(user);
        return new ProfileDto(null,null,"default");
    }
    /*

    public ProfileDto handleColorChange(User user, String color) {
        Optional<Profile> profile = profileRepository.findByUser(user);
        if (profile.isEmpty()) {
            profile = new Profile();
            profile.setUser(user);
        }
        profile.setType(Profile.ProfileType.COLOR);
        profile.setColor(color);
        profile.setProfileFile(null);
        user.setProfile(profile);
        profileRepository.save(profile);
        userRepository.save(user);
        return new ProfileDto(color,null,"color");
    }

    public ProfileDto handleFileUpload(User user, ProfileDto request) {
        String name = request.getPfd().getName();
        String type = request.getPfd().getType();
        String data = request.getPfd().getData();

        ProfileFile profileFile = new ProfileFile(name, type);
        profileFile.setBase64Data(data);

        Profile profile = profileRepository.findByUser(user);
        if (profile == null) {
            profile = new Profile();
            profile.setUser(user);
        }
        profile.setProfileFile(profileFile);
        profile.setType(Profile.ProfileType.IMAGE);
        profile.setColor(null);
        profileRepository.save(profile);

        user.setProfile(profile);
        userRepository.save(user);
        return new ProfileDto(null,request.getPfd(),"image");
    }
    */

}
