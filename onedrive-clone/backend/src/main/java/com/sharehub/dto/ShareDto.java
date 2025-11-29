package com.sharehub.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShareDto {
    private Long id;
    private Long fileId;
    private String fileName;
    private Long folderId;
    private String folderName;
    private String sharedByEmail;
    private String sharedWithEmail;
    private String permission;
    private String shareLink;
    private Boolean isPublic;
    private LocalDateTime expiresAt;
    private LocalDateTime createdAt;
}
