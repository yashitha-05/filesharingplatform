package com.sharehub.controller;

import com.sharehub.dto.CreateFolderRequest;
import com.sharehub.dto.FolderDto;
import com.sharehub.service.FolderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/folders")
@RequiredArgsConstructor
public class FolderController {
    
    private final FolderService folderService;
    
    @PostMapping
    public ResponseEntity<FolderDto> createFolder(
            @Valid @RequestBody CreateFolderRequest request,
            Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(folderService.createFolder(request, userEmail));
    }
    
    @GetMapping
    public ResponseEntity<List<FolderDto>> getFolders(
            @RequestParam(value = "parentId", required = false) Long parentId,
            Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(folderService.getFolders(parentId, userEmail));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<FolderDto> getFolder(@PathVariable Long id, Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(folderService.getFolder(id, userEmail));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<FolderDto> updateFolder(
            @PathVariable Long id,
            @Valid @RequestBody CreateFolderRequest request,
            Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(folderService.updateFolder(id, request, userEmail));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFolder(@PathVariable Long id, Authentication authentication) {
        String userEmail = authentication.getName();
        folderService.deleteFolder(id, userEmail);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<FolderDto>> searchFolders(
            @RequestParam String query,
            Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(folderService.searchFolders(query, userEmail));
    }
}
