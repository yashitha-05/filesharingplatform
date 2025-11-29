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
public class FolderDto {
    private Long id;
    private String name;
    private String path;
    private Long parentId;
    private Boolean isShared;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
