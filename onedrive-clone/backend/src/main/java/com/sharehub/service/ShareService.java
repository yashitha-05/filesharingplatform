package com.sharehub.service;

import com.sharehub.dto.ShareDto;
import com.sharehub.dto.ShareRequest;
import com.sharehub.exception.BadRequestException;
import com.sharehub.exception.ResourceNotFoundException;
import com.sharehub.model.FileEntity;
import com.sharehub.model.Folder;
import com.sharehub.model.Share;
import com.sharehub.model.User;
import com.sharehub.repository.FileRepository;
import com.sharehub.repository.FolderRepository;
import com.sharehub.repository.ShareRepository;
import com.sharehub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShareService {
    
    private final ShareRepository shareRepository;
    private final FileRepository fileRepository;
    private final FolderRepository folderRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public ShareDto createShare(ShareRequest request, String userEmail) {
        User sharedBy = getUserByEmail(userEmail);
        
        if (request.getFileId() == null && request.getFolderId() == null) {
            throw new BadRequestException("Either fileId or folderId must be provided");
        }
        
        if (request.getFileId() != null && request.getFolderId() != null) {
            throw new BadRequestException("Cannot share both file and folder at the same time");
        }
        
        FileEntity file = null;
        Folder folder = null;
        
        if (request.getFileId() != null) {
            file = fileRepository.findByIdAndOwner(request.getFileId(), sharedBy)
                    .orElseThrow(() -> new ResourceNotFoundException("File not found"));
            file.setIsShared(true);
            fileRepository.save(file);
        } else {
            folder = folderRepository.findByIdAndOwner(request.getFolderId(), sharedBy)
                    .orElseThrow(() -> new ResourceNotFoundException("Folder not found"));
            folder.setIsShared(true);
            folderRepository.save(folder);
        }
        
        User sharedWith = null;
        if (request.getSharedWithEmail() != null && !request.getSharedWithEmail().isEmpty()) {
            sharedWith = userRepository.findByEmail(request.getSharedWithEmail()).orElse(null);
        }
        
        String shareLink = null;
        if (request.getIsPublic()) {
            shareLink = UUID.randomUUID().toString();
        }
        
        Share share = Share.builder()
                .file(file)
                .folder(folder)
                .sharedBy(sharedBy)
                .sharedWith(sharedWith)
                .sharedWithEmail(request.getSharedWithEmail())
                .permission(Share.SharePermission.valueOf(request.getPermission().toUpperCase()))
                .shareLink(shareLink)
                .isPublic(request.getIsPublic())
                .expiresAt(request.getExpiresAt())
                .build();
        
        share = shareRepository.save(share);
        return mapToShareDto(share);
    }
    
    public List<ShareDto> getSharedByMe(String userEmail) {
        User user = getUserByEmail(userEmail);
        List<Share> shares = shareRepository.findBySharedBy(user);
        return shares.stream().map(this::mapToShareDto).collect(Collectors.toList());
    }
    
    public List<ShareDto> getSharedWithMe(String userEmail) {
        User user = getUserByEmail(userEmail);
        List<Share> shares = shareRepository.findSharedWithUser(user, user.getEmail());
        return shares.stream().map(this::mapToShareDto).collect(Collectors.toList());
    }
    
    public ShareDto getShareByLink(String shareLink) {
        Share share = shareRepository.findByShareLink(shareLink)
                .orElseThrow(() -> new ResourceNotFoundException("Share not found"));
        return mapToShareDto(share);
    }
    
    @Transactional
    public void deleteShare(Long shareId, String userEmail) {
        User user = getUserByEmail(userEmail);
        Share share = shareRepository.findById(shareId)
                .orElseThrow(() -> new ResourceNotFoundException("Share not found"));
        
        if (!share.getSharedBy().getId().equals(user.getId())) {
            throw new BadRequestException("You can only delete shares created by you");
        }
        
        shareRepository.delete(share);
        
        // Update file/folder shared status if no more shares exist
        if (share.getFile() != null) {
            List<Share> fileShares = shareRepository.findByFile(share.getFile());
            if (fileShares.isEmpty()) {
                share.getFile().setIsShared(false);
                fileRepository.save(share.getFile());
            }
        } else if (share.getFolder() != null) {
            List<Share> folderShares = shareRepository.findByFolder(share.getFolder());
            if (folderShares.isEmpty()) {
                share.getFolder().setIsShared(false);
                folderRepository.save(share.getFolder());
            }
        }
    }
    
    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
    
    private ShareDto mapToShareDto(Share share) {
        return ShareDto.builder()
                .id(share.getId())
                .fileId(share.getFile() != null ? share.getFile().getId() : null)
                .fileName(share.getFile() != null ? share.getFile().getName() : null)
                .folderId(share.getFolder() != null ? share.getFolder().getId() : null)
                .folderName(share.getFolder() != null ? share.getFolder().getName() : null)
                .sharedByEmail(share.getSharedBy().getEmail())
                .sharedWithEmail(share.getSharedWithEmail())
                .permission(share.getPermission().name())
                .shareLink(share.getShareLink())
                .isPublic(share.getIsPublic())
                .expiresAt(share.getExpiresAt())
                .createdAt(share.getCreatedAt())
                .build();
    }
}
