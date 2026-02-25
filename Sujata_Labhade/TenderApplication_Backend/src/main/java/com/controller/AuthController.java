package com.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.entity.User;
import com.repository.UserRepository;


@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository repo;

    // REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return repo.save(user);
    }
    
    @GetMapping("/test")
    public String test() {
        return "API WORKING";
    }

    // LOGIN
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return repo.findByEmailAndPassword(
                user.getEmail(),
                user.getPassword()
        ).orElse(null);
    }
}