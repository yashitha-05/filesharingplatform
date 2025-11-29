package com.sharehub.controller;

import com.sharehub.dto.ShareDto;
import com.sharehub.dto.ShareRequest;
import com.sharehub.service.ShareService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/share")
@RequiredArgsConstructor
public class ShareController {
    
    private final ShareService shareService;
    
    @PostMapping
    public ResponseEntity<ShareDto> createShare(
            @Valid @RequestBody ShareRequest request,
            Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(shareService.createShare(request, userEmail));
    }
    
    @GetMapping("/by-me")
    public ResponseEntity<List<ShareDto>> getSharedByMe(Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(shareService.getSharedByMe(userEmail));
    }
    
    @GetMapping("/with-me")
    public ResponseEntity<List<ShareDto>> getSharedWithMe(Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(shareService.getSharedWithMe(userEmail));
    }
    
    @GetMapping("/public/{shareLink}")
    public ResponseEntity<ShareDto> getShareByLink(@PathVariable String shareLink) {
        return ResponseEntity.ok(shareService.getShareByLink(shareLink));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShare(@PathVariable Long id, Authentication authentication) {
        String userEmail = authentication.getName();
        shareService.deleteShare(id, userEmail);
        return ResponseEntity.noContent().build();
    }
}
