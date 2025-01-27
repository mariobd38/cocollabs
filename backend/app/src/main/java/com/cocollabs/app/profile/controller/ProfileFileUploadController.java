package com.cocollabs.app.profile.controller;

import com.cocollabs.app.profile.model.ProfileFile;
import com.cocollabs.app.profile.service.FileStorageService;
import com.cocollabs.app.profile.dto.ProfileFileDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class ProfileFileUploadController {
    private final FileStorageService storageService;

    public ProfileFileUploadController(FileStorageService storageService) {
        this.storageService = storageService;
    }


    @PostMapping("/upload")
    public ResponseEntity<ProfileFileDto> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            ProfileFile storedFile = storageService.store(file);
            ProfileFileDto responseMessage = new ProfileFileDto(storedFile.getBase64Data(), storedFile.getName(), storedFile.getType());
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
        }
    }

}