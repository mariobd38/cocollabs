package com.stringwiz.app.profile.service;

import java.io.IOException;
import java.util.stream.Stream;

import com.stringwiz.app.profile.model.ProfileFile;
import com.stringwiz.app.profile.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {
    @Autowired
    private FileRepository fileDBRepository;

    public ProfileFile store(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        ProfileFile fileDB = new ProfileFile(fileName, file.getContentType(), file.getBytes());
        return fileDBRepository.save(fileDB);
    }

    public ProfileFile getFile(String id) {
        return fileDBRepository.findById(id).get();
    }

    public Stream<ProfileFile> getAllFiles() {
        return fileDBRepository.findAll().stream();
    }
}
