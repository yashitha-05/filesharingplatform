package com.sharehub.controller;

import com.sharehub.dto.UserDto;
import com.sharehub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    
    @GetMapping("/profile")
    public ResponseEntity<UserDto> getProfile(Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(userService.getUserProfile(userEmail));
    }
    
    @PutMapping("/profile")
    public ResponseEntity<UserDto> updateProfile(
            @RequestBody UserDto userDto,
            Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(userService.updateProfile(userEmail, userDto));
    }
    
    @PostMapping("/profile/picture")
    public ResponseEntity<UserDto> uploadProfilePicture(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(userService.uploadProfilePicture(userEmail, file));
    }
}
