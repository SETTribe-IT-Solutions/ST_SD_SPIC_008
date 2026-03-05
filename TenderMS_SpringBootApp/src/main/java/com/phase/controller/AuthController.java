package com.phase.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.phase.entity.User;
import com.phase.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // Register User
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.register(user);
    }

    // Login User
    @PostMapping("/login")
    public User login(@RequestBody Map<String, String> data) {
        return authService.login(data.get("email"), data.get("password"));
    }

    // Test API
    @GetMapping("/test")
    public String test() {
        return "Server Working";
    }
}