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
public class FileDto {
    private Long id;
    private String name;
    private Long size;
    private String mimeType;
    private Long folderId;
    private String folderName;
    private Boolean isShared;
    private Boolean isFavorite;
    private Boolean isTrashed;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime trashedAt;
}
