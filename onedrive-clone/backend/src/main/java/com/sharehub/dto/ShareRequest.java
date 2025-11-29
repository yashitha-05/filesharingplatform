package com.sharehub.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShareRequest {
    
    private Long fileId;
    private Long folderId;
    
    private String sharedWithEmail;
    
    @NotBlank(message = "Permission is required")
    private String permission;
    
    private Boolean isPublic = false;
    private LocalDateTime expiresAt;
}
