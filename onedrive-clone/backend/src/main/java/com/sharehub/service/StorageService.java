package com.sharehub.service;

import com.sharehub.exception.StorageException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@Slf4j
public class StorageService {
    
    @Value("${app.storage.location}")
    private String storageLocation;
    
    private Path rootLocation;
    
    @PostConstruct
    public void init() {
        this.rootLocation = Paths.get(storageLocation);
        try {
            Files.createDirectories(rootLocation);
            log.info("Storage location initialized at: {}", rootLocation.toAbsolutePath());
        } catch (IOException e) {
            throw new StorageException("Could not initialize storage location", e);
        }
    }
    
    public String store(MultipartFile file, Long userId) {
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file");
            }
            
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            
            String filename = UUID.randomUUID().toString() + extension;
            Path userDirectory = rootLocation.resolve(userId.toString());
            Files.createDirectories(userDirectory);
            
            Path destinationFile = userDirectory.resolve(filename).normalize().toAbsolutePath();
            
            if (!destinationFile.getParent().equals(userDirectory.toAbsolutePath())) {
                throw new StorageException("Cannot store file outside current directory");
            }
            
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
            }
            
            return userId + "/" + filename;
        } catch (IOException e) {
            throw new StorageException("Failed to store file", e);
        }
    }
    
    public Resource loadAsResource(String storagePath) {
        try {
            Path file = rootLocation.resolve(storagePath);
            Resource resource = new UrlResource(file.toUri());
            
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new StorageException("Could not read file: " + storagePath);
            }
        } catch (MalformedURLException e) {
            throw new StorageException("Could not read file: " + storagePath, e);
        }
    }
    
    public void delete(String storagePath) {
        try {
            Path file = rootLocation.resolve(storagePath);
            Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new StorageException("Failed to delete file", e);
        }
    }
}
