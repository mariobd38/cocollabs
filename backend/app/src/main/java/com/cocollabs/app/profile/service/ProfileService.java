package com.cocollabs.app.profile.service;

import com.cocollabs.app.profile.model.Profile;
import com.cocollabs.app.profile.model.ProfileFile;
import com.cocollabs.app.user.model.User;
import com.cocollabs.app.profile.repository.ProfileRepository;
import com.cocollabs.app.user.repository.UserRepository;
import com.cocollabs.app.profile.dto.ProfileDto;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;

    public ProfileService(UserRepository userRepository, ProfileRepository profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    public ProfileDto handleDefaultAvatar(User user) {
        user.setProfile(null);
        userRepository.save(user);
        return new ProfileDto(null,null,"default");
    }

    public ProfileDto handleColorChange(User user, String color) {
        Profile profile = profileRepository.findByUser(user);
        if (profile == null) {
            profile = new Profile();
            profile.setUser(user);
        }
        profile.setType("color");
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
        profile.setType("image");
        profile.setColor(null);
        profileRepository.save(profile);

        user.setProfile(profile);
        userRepository.save(user);
        return new ProfileDto(null,request.getPfd(),"image");
    }
}
