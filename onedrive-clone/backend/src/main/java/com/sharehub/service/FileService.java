package com.sharehub.service;

import com.sharehub.dto.FileDto;
import com.sharehub.exception.BadRequestException;
import com.sharehub.exception.ResourceNotFoundException;
import com.sharehub.model.FileEntity;
import com.sharehub.model.Folder;
import com.sharehub.model.User;
import com.sharehub.repository.FileRepository;
import com.sharehub.repository.FolderRepository;
import com.sharehub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FileService {
    
    private final FileRepository fileRepository;
    private final FolderRepository folderRepository;
    private final UserRepository userRepository;
    private final StorageService storageService;
    
    @Transactional
    public FileDto uploadFile(MultipartFile file, Long folderId, String userEmail) {
        User user = getUserByEmail(userEmail);
        
        // Check storage limit
        long fileSize = file.getSize();
        if (user.getStorageUsed() + fileSize > user.getStorageLimit()) {
            throw new BadRequestException("Storage limit exceeded");
        }
        
        Folder folder = null;
        if (folderId != null) {
            folder = folderRepository.findByIdAndOwner(folderId, user)
                    .orElseThrow(() -> new ResourceNotFoundException("Folder not found"));
        }
        
        String storagePath = storageService.store(file, user.getId());
        
        FileEntity fileEntity = FileEntity.builder()
                .name(file.getOriginalFilename())
                .storagePath(storagePath)
                .size(fileSize)
                .mimeType(file.getContentType())
                .folder(folder)
                .owner(user)
                .isShared(false)
                .isFavorite(false)
                .isTrashed(false)
                .build();
        
        fileEntity = fileRepository.save(fileEntity);
        
        // Update user storage
        user.setStorageUsed(user.getStorageUsed() + fileSize);
        userRepository.save(user);
        
        return mapToFileDto(fileEntity);
    }
    
    public List<FileDto> getFiles(Long folderId, String userEmail) {
        User user = getUserByEmail(userEmail);
        
        List<FileEntity> files;
        if (folderId == null) {
            files = fileRepository.findByOwnerAndFolderIsNullAndIsTrashedFalse(user);
        } else {
            Folder folder = folderRepository.findByIdAndOwner(folderId, user)
                    .orElseThrow(() -> new ResourceNotFoundException("Folder not found"));
            files = fileRepository.findByOwnerAndFolderAndIsTrashedFalse(user, folder);
        }
        
        return files.stream().map(this::mapToFileDto).collect(Collectors.toList());
    }
    
    public FileDto getFile(Long fileId, String userEmail) {
        User user = getUserByEmail(userEmail);
        FileEntity file = fileRepository.findByIdAndOwner(fileId, user)
                .orElseThrow(() -> new ResourceNotFoundException("File not found"));
        return mapToFileDto(file);
    }
    
    public Resource downloadFile(Long fileId, String userEmail) {
        User user = getUserByEmail(userEmail);
        FileEntity file = fileRepository.findByIdAndOwner(fileId, user)
                .orElseThrow(() -> new ResourceNotFoundException("File not found"));
        
        return storageService.loadAsResource(file.getStoragePath());
    }
    
    @Transactional
    public void deleteFile(Long fileId, String userEmail) {
        User user = getUserByEmail(userEmail);
        FileEntity file = fileRepository.findByIdAndOwner(fileId, user)
                .orElseThrow(() -> new ResourceNotFoundException("File not found"));
        
        // Move to trash
        file.setIsTrashed(true);
        file.setTrashedAt(LocalDateTime.now());
        fileRepository.save(file);
    }
    
    @Transactional
    public void permanentlyDeleteFile(Long fileId, String userEmail) {
        User user = getUserByEmail(userEmail);
        FileEntity file = fileRepository.findByIdAndOwner(fileId, user)
                .orElseThrow(() -> new ResourceNotFoundException("File not found"));
        
        // Delete from storage
        storageService.delete(file.getStoragePath());
        
        // Update user storage
        user.setStorageUsed(user.getStorageUsed() - file.getSize());
        userRepository.save(user);
        
        // Delete from database
        fileRepository.delete(file);
    }
    
    @Transactional
    public FileDto restoreFile(Long fileId, String userEmail) {
        User user = getUserByEmail(userEmail);
        FileEntity file = fileRepository.findByIdAndOwner(fileId, user)
                .orElseThrow(() -> new ResourceNotFoundException("File not found"));
        
        file.setIsTrashed(false);
        file.setTrashedAt(null);
        file = fileRepository.save(file);
        
        return mapToFileDto(file);
    }
    
    @Transactional
    public FileDto toggleFavorite(Long fileId, String userEmail) {
        User user = getUserByEmail(userEmail);
        FileEntity file = fileRepository.findByIdAndOwner(fileId, user)
                .orElseThrow(() -> new ResourceNotFoundException("File not found"));
        
        file.setIsFavorite(!file.getIsFavorite());
        file = fileRepository.save(file);
        
        return mapToFileDto(file);
    }
    
    public List<FileDto> getTrashedFiles(String userEmail) {
        User user = getUserByEmail(userEmail);
        List<FileEntity> files = fileRepository.findByOwnerAndIsTrashedTrue(user);
        return files.stream().map(this::mapToFileDto).collect(Collectors.toList());
    }
    
    public List<FileDto> getFavoriteFiles(String userEmail) {
        User user = getUserByEmail(userEmail);
        List<FileEntity> files = fileRepository.findByOwnerAndIsFavoriteTrueAndIsTrashedFalse(user);
        return files.stream().map(this::mapToFileDto).collect(Collectors.toList());
    }
    
    public List<FileDto> searchFiles(String query, String userEmail) {
        User user = getUserByEmail(userEmail);
        List<FileEntity> files = fileRepository.searchByName(user, query);
        return files.stream().map(this::mapToFileDto).collect(Collectors.toList());
    }
    
    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
    
    @Transactional
    public FileDto renameFile(Long fileId, String newName, String userEmail) {
        User user = getUserByEmail(userEmail);
        FileEntity file = fileRepository.findByIdAndOwner(fileId, user)
                .orElseThrow(() -> new ResourceNotFoundException("File not found"));
        
        file.setName(newName);
        file = fileRepository.save(file);
        
        return mapToFileDto(file);
    }
    
    @Transactional
    public FileDto moveFile(Long fileId, Long folderId, String userEmail) {
        User user = getUserByEmail(userEmail);
        FileEntity file = fileRepository.findByIdAndOwner(fileId, user)
                .orElseThrow(() -> new ResourceNotFoundException("File not found"));
        
        Folder folder = null;
        if (folderId != null) {
            folder = folderRepository.findByIdAndOwner(folderId, user)
                    .orElseThrow(() -> new ResourceNotFoundException("Folder not found"));
        }
        
        file.setFolder(folder);
        file = fileRepository.save(file);
        
        return mapToFileDto(file);
    }
    
    @Transactional
    public List<FileDto> moveMultipleFiles(List<Long> fileIds, Long folderId, String userEmail) {
        User user = getUserByEmail(userEmail);
        
        Folder folder = null;
        if (folderId != null) {
            folder = folderRepository.findByIdAndOwner(folderId, user)
                    .orElseThrow(() -> new ResourceNotFoundException("Folder not found"));
        }
        
        List<FileEntity> files = fileRepository.findAllById(fileIds);
        Folder finalFolder = folder;
        files.forEach(file -> {
            if (file.getOwner().getId().equals(user.getId())) {
                file.setFolder(finalFolder);
            }
        });
        
        files = fileRepository.saveAll(files);
        return files.stream().map(this::mapToFileDto).collect(Collectors.toList());
    }
    
    private FileDto mapToFileDto(FileEntity file) {
        return FileDto.builder()
                .id(file.getId())
                .name(file.getName())
                .size(file.getSize())
                .mimeType(file.getMimeType())
                .folderId(file.getFolder() != null ? file.getFolder().getId() : null)
                .folderName(file.getFolder() != null ? file.getFolder().getName() : null)
                .isShared(file.getIsShared())
                .isFavorite(file.getIsFavorite())
                .isTrashed(file.getIsTrashed())
                .createdAt(file.getCreatedAt())
                .updatedAt(file.getUpdatedAt())
                .trashedAt(file.getTrashedAt())
                .build();
    }
}
