package com.stringwiz.app.services;

import com.stringwiz.app.models.Profile;
import com.stringwiz.app.models.ProfileFile;
import com.stringwiz.app.models.User;
import com.stringwiz.app.repositories.ProfileRepository;
import com.stringwiz.app.repositories.UserRepository;
import com.stringwiz.app.web.ProfileDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    @Autowired UserRepository userRepository;
    @Autowired ProfileRepository profileRepository;

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
