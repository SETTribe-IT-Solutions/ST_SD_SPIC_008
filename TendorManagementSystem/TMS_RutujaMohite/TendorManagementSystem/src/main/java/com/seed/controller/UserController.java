package com.seed.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.seed.bean.User;
import com.seed.dto.UserRegistrationDto;
import com.seed.service.UserService;
import com.seed.utils.JwtUtil;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")   // ✅ ADD HERE
@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    // Externalize upload directory in application.properties
    // file.upload-dir=C:/Users/PRATIK/uploads/
    @Value("${file.upload-dir}")
    private String uploadDir;


    
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(

            @Valid @ModelAttribute UserRegistrationDto dto) throws IOException {

        Map<String, Object> response = new HashMap<>();

        // Check password match
        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            response.put("success", false);
            response.put("message", "Passwords do not match!");
            return ResponseEntity.badRequest().body(response);
        }

        // Check if email exists
        if (userService.emailExists(dto.getEmail())) {
            response.put("success", false);
            response.put("message", "Email already registered!");
            return ResponseEntity.badRequest().body(response);
        }

        // Handle file upload
        String photoPath = null;
        MultipartFile photo = dto.getPhoto();

        if (photo != null && !photo.isEmpty()) {

            String contentType = photo.getContentType();

            if (!("image/jpeg".equals(contentType) || "image/png".equals(contentType))) {
                response.put("success", false);
                response.put("message", "Invalid file format! Only JPEG, PNG allowed.");
                return ResponseEntity.badRequest().body(response);
            }

            if (photo.getSize() > 1_048_576) {
                response.put("success", false);
                response.put("message", "File size exceeds 1MB limit.");
                return ResponseEntity.badRequest().body(response);
            }

            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            String fileName = System.currentTimeMillis() + "_" +
                    photo.getOriginalFilename().replaceAll("\\s+", "_");

            File uploadFile = new File(dir, fileName);
            photo.transferTo(uploadFile);

            photoPath = uploadFile.getAbsolutePath();
        }

        // Save user
        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setMiddleName(dto.getMiddleName());
        user.setLastName(dto.getLastName());
        user.setMobileNumber(dto.getMobileNumber());
        user.setEmail(dto.getEmail());

        // ⚠️ IMPORTANT: hash password if using PasswordEncoder
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setPhoto(photoPath);

        userService.registerUser(user);

        // 🔥 Generate JWT after successful registration
        String token = jwtUtil.generateToken(user.getEmail());

        // Success response with token
        response.put("success", true);
        response.put("message", "User registered successfully!");
        response.put("token", token);
        response.put("email", user.getEmail());

        return ResponseEntity.ok(response);
    }
}