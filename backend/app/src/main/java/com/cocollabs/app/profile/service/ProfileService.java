package com.cocollabs.app.profile.service;

import com.cocollabs.app.aws.S3Buckets;
import com.cocollabs.app.aws.service.S3Service;
import com.cocollabs.app.profile.model.Profile;
import com.cocollabs.app.general.error.ErrorResponse;
import com.cocollabs.app.user.model.User;
import com.cocollabs.app.profile.repository.ProfileRepository;
import com.cocollabs.app.user.util.UserValidationUtil;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class ProfileService {
    private final Logger log = LoggerFactory.getLogger(ProfileService.class);
    private final ProfileRepository profileRepository;
    private final S3Service s3Service;
    private final String bucketName;
    private final Cache<String, String> urlCache = Caffeine.newBuilder()
            .expireAfterWrite(8, TimeUnit.MINUTES)  // Slightly less than S3 URL expiry
            .build();

    public ProfileService(ProfileRepository profileRepository,
                          S3Service s3Service,
                          S3Buckets s3Bucket) {
        this.profileRepository = profileRepository;
        this.s3Service = s3Service;
        this.bucketName = s3Bucket.getClient();
    }

    public Profile updateFullName(User user, String fullName) {
        Profile profile = profileRepository.findByUser(user)
                .orElseGet(() -> Profile.builder()
                        .user(user)
                        .build());
        profile.setFullName(transformFullName(fullName));
        return profileRepository.save(profile);
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

    public String getProfileImageUrl(User user, Profile profile) {
        if (profile.getS3Key() == null) {
            return null;
        }

        // Try cache first
        String cachedUrl = urlCache.getIfPresent(profile.getS3Key());
        if (cachedUrl != null) {
            return cachedUrl;
        }

        // Generate new URL and cache it
        String newUrl = s3Service.generatePreSignedUrl(bucketName, getS3Key(user, profile));
        urlCache.put(profile.getS3Key(), newUrl);
        return newUrl;
    }

    public ErrorResponse getFullNameValidationErrors(String fullName) {
        return UserValidationUtil.validateFullName(fullName);
    }

    public ErrorResponse getUsernameValidationErrors(String username) {
        return UserValidationUtil.validateUsername(username);
    }

    public ErrorResponse getAvatarNameValidationErrors(String avatarName) {
        return UserValidationUtil.validateAvatarName(avatarName);
    }

    public boolean isFileValid(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return false;
        }
        // Validate file size (e.g., max 5MB)
        if (file.getSize() > 5 * 1024 * 1024) {
            return false;
        }
        // Validate file type (e.g., allow only images)
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image/");
    }

    private String getS3Key(User user, Profile profile) {
        String key = profile.getS3Key();
        return "images/user_id=" + user.getId() + "/" + key + ".jpg";
    }

    private String transformFullName(String fullName) {
        return Arrays.stream(fullName.trim().split("\\s+"))
                .map(word -> Character.toUpperCase(word.charAt(0)) + word.substring(1).toLowerCase())
                .collect(Collectors.joining(" "));
    }

}
