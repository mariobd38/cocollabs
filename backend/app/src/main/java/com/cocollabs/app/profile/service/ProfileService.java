package com.cocollabs.app.profile.service;

import com.cocollabs.app.aws.S3Buckets;
import com.cocollabs.app.aws.service.S3Service;
import com.cocollabs.app.profile.model.Profile;
import com.cocollabs.app.user.model.User;
import com.cocollabs.app.profile.repository.ProfileRepository;
import com.cocollabs.app.user.repository.UserRepository;
import com.cocollabs.app.profile.dto.ProfileDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProfileService {
    private final Logger log = LoggerFactory.getLogger(ProfileService.class);
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final S3Service s3Service;
    private final String bucketName;

    public ProfileService(UserRepository userRepository,
                          ProfileRepository profileRepository,
                          S3Service s3Service,
                          S3Buckets s3Bucket) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.s3Service = s3Service;
        this.bucketName = s3Bucket.getClient();
    }

    public Profile handleAvatarCreation(User user, String avatarName) {
        Profile profile = profileRepository.findByUser(user)
                .orElseGet(() -> Profile.builder()
                        .user(user)
                        .build());

        profile.setType(Profile.ProfileType.AVATAR);
        profile.setSvg(avatarName);
        //profile.setS3Key(null);

        return profileRepository.save(profile);
    }

    public Profile handleFileUpload(User user, MultipartFile file) throws IOException {
        Profile profile = profileRepository.findByUser(user)
                .map(existingProfile -> {
                    // If there's an existing image, delete it from S3
                    if (existingProfile.getS3Key() != null) {
                        String oldObjectKey = getS3Key(user, existingProfile);
                        s3Service.deleteObject(bucketName, oldObjectKey); // Delete the old image from S3
                        log.info("Deleted old file from S3 with key: " + oldObjectKey);
                    }
                    // Update profile to mark the new image upload
                    existingProfile.setType(Profile.ProfileType.S3_IMAGE);
                    existingProfile.setSvg(null);
                    return existingProfile;
                })
                .orElseGet(() -> Profile.builder()
                        .type(Profile.ProfileType.S3_IMAGE)
                        .user(user)
                        .build());

        String key = UUID.randomUUID().toString();
        String objectKey = "images/user_id=" + user.getId() + "/" + key + ".jpg";

        s3Service.putObject(bucketName, objectKey, file.getBytes());
        log.info("File uploaded to S3 with key: " + objectKey);

        profile.setS3Key(key);
        return profileRepository.save(profile);
    }

    public String getProfileImageUrl(Profile profile) {
//        Profile profile = profileRepository.findByUser(user)
//                .orElseThrow(() -> new RuntimeException("Profile not found"));

        if (profile.getS3Key() == null) {
            return null;
        }

        return s3Service.generatePreSignedUrl(bucketName, profile.getS3Key());
    }

//    public ProfileDto handleDefaultAvatar(User user) {
//        user.setProfile(null);
//        userRepository.save(user);
//        return new ProfileDto(null,null,"default");
//    }

    private String getS3Key(User user, Profile profile) {
        String key = profile.getS3Key();
        return "images/user_id=" + user.getId() + "/" + key + ".jpg";
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
