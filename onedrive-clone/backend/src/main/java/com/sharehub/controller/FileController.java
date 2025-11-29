package com.sharehub.controller;

import com.sharehub.dto.FileDto;
import com.sharehub.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {
    
    private final FileService fileService;
    
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FileDto> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "folderId", required = false) Long folderId,
            Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(fileService.uploadFile(file, folderId, userEmail));
    }
    
    @GetMapping
    public ResponseEntity<List<FileDto>> getFiles(
            @RequestParam(value = "folderId", required = false) Long folderId,
            Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(fileService.getFiles(folderId, userEmail));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<FileDto> getFile(@PathVariable Long id, Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(fileService.getFile(id, userEmail));
    }
    
    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id, Authentication authentication) {
        String userEmail = authentication.getName();
        Resource resource = fileService.downloadFile(id, userEmail);
        FileDto fileDto = fileService.getFile(id, userEmail);
        
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(fileDto.getMimeType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDto.getName() + "\"")
                .body(resource);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFile(@PathVariable Long id, Authentication authentication) {
        String userEmail = authentication.getName();
        fileService.deleteFile(id, userEmail);
        return ResponseEntity.noContent().build();
    }
    
    @DeleteMapping("/{id}/permanent")
    public ResponseEntity<Void> permanentlyDeleteFile(@PathVariable Long id, Authentication authentication) {
        String userEmail = authentication.getName();
        fileService.permanentlyDeleteFile(id, userEmail);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{id}/restore")
    public ResponseEntity<FileDto> restoreFile(@PathVariable Long id, Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(fileService.restoreFile(id, userEmail));
    }
    
    @PostMapping("/{id}/favorite")
    public ResponseEntity<FileDto> toggleFavorite(@PathVariable Long id, Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(fileService.toggleFavorite(id, userEmail));
    }
    
    @GetMapping("/trash")
    public ResponseEntity<List<FileDto>> getTrashedFiles(Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(fileService.getTrashedFiles(userEmail));
    }
    
    @GetMapping("/favorites")
    public ResponseEntity<List<FileDto>> getFavoriteFiles(Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(fileService.getFavoriteFiles(userEmail));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<FileDto>> searchFiles(
            @RequestParam String query,
            Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(fileService.searchFiles(query, userEmail));
    }
    
    @PutMapping("/{id}/rename")
    public ResponseEntity<FileDto> renameFile(
            @PathVariable Long id,
            @RequestParam String newName,
            Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(fileService.renameFile(id, newName, userEmail));
    }
    
    @PutMapping("/{id}/move")
    public ResponseEntity<FileDto> moveFile(
            @PathVariable Long id,
            @RequestParam(required = false) Long folderId,
            Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(fileService.moveFile(id, folderId, userEmail));
    }
    
    @PostMapping("/move-multiple")
    public ResponseEntity<List<FileDto>> moveMultipleFiles(
            @RequestParam List<Long> fileIds,
            @RequestParam(required = false) Long folderId,
            Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(fileService.moveMultipleFiles(fileIds, folderId, userEmail));
    }
    
    @GetMapping("/{id}/preview")
    public ResponseEntity<Resource> previewFile(@PathVariable Long id, Authentication authentication) {
        String userEmail = authentication.getName();
        Resource resource = fileService.downloadFile(id, userEmail);
        FileDto fileDto = fileService.getFile(id, userEmail);
        
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(fileDto.getMimeType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileDto.getName() + "\"")
                .body(resource);
    }
}
