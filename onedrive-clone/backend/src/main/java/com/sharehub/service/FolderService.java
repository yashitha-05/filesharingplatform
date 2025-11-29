package com.sharehub.service;

import com.sharehub.dto.CreateFolderRequest;
import com.sharehub.dto.FolderDto;
import com.sharehub.exception.BadRequestException;
import com.sharehub.exception.ResourceNotFoundException;
import com.sharehub.model.Folder;
import com.sharehub.model.User;
import com.sharehub.repository.FolderRepository;
import com.sharehub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FolderService {
    
    private final FolderRepository folderRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public FolderDto createFolder(CreateFolderRequest request, String userEmail) {
        User user = getUserByEmail(userEmail);
        
        Folder parent = null;
        String path = "/" + request.getName();
        
        if (request.getParentId() != null) {
            parent = folderRepository.findByIdAndOwner(request.getParentId(), user)
                    .orElseThrow(() -> new ResourceNotFoundException("Parent folder not found"));
            path = parent.getPath() + "/" + request.getName();
        }
        
        Folder folder = Folder.builder()
                .name(request.getName())
                .path(path)
                .parent(parent)
                .owner(user)
                .isShared(false)
                .build();
        
        folder = folderRepository.save(folder);
        return mapToFolderDto(folder);
    }
    
    public List<FolderDto> getFolders(Long parentId, String userEmail) {
        User user = getUserByEmail(userEmail);
        
        List<Folder> folders;
        if (parentId == null) {
            folders = folderRepository.findByOwnerAndParentIsNull(user);
        } else {
            Folder parent = folderRepository.findByIdAndOwner(parentId, user)
                    .orElseThrow(() -> new ResourceNotFoundException("Parent folder not found"));
            folders = folderRepository.findByOwnerAndParent(user, parent);
        }
        
        return folders.stream().map(this::mapToFolderDto).collect(Collectors.toList());
    }
    
    public FolderDto getFolder(Long folderId, String userEmail) {
        User user = getUserByEmail(userEmail);
        Folder folder = folderRepository.findByIdAndOwner(folderId, user)
                .orElseThrow(() -> new ResourceNotFoundException("Folder not found"));
        return mapToFolderDto(folder);
    }
    
    @Transactional
    public FolderDto updateFolder(Long folderId, CreateFolderRequest request, String userEmail) {
        User user = getUserByEmail(userEmail);
        Folder folder = folderRepository.findByIdAndOwner(folderId, user)
                .orElseThrow(() -> new ResourceNotFoundException("Folder not found"));
        
        folder.setName(request.getName());
        
        // Update path
        if (folder.getParent() != null) {
            folder.setPath(folder.getParent().getPath() + "/" + request.getName());
        } else {
            folder.setPath("/" + request.getName());
        }
        
        folder = folderRepository.save(folder);
        return mapToFolderDto(folder);
    }
    
    @Transactional
    public void deleteFolder(Long folderId, String userEmail) {
        User user = getUserByEmail(userEmail);
        Folder folder = folderRepository.findByIdAndOwner(folderId, user)
                .orElseThrow(() -> new ResourceNotFoundException("Folder not found"));
        
        folderRepository.delete(folder);
    }
    
    public List<FolderDto> searchFolders(String query, String userEmail) {
        User user = getUserByEmail(userEmail);
        List<Folder> folders = folderRepository.searchByName(user, query);
        return folders.stream().map(this::mapToFolderDto).collect(Collectors.toList());
    }
    
    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
    
    private FolderDto mapToFolderDto(Folder folder) {
        return FolderDto.builder()
                .id(folder.getId())
                .name(folder.getName())
                .path(folder.getPath())
                .parentId(folder.getParent() != null ? folder.getParent().getId() : null)
                .isShared(folder.getIsShared())
                .createdAt(folder.getCreatedAt())
                .updatedAt(folder.getUpdatedAt())
                .build();
    }
}
