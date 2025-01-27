package com.cocollabs.app.profile.service;

import java.io.IOException;
import java.util.stream.Stream;

import com.cocollabs.app.profile.model.ProfileFile;
import com.cocollabs.app.profile.repository.FileRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {
    private final FileRepository fileDBRepository;

    public FileStorageService(FileRepository fileDBRepository) {
        this.fileDBRepository = fileDBRepository;
    }

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
