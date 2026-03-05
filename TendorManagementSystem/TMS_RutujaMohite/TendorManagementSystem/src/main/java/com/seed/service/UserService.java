package com.seed.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.seed.bean.User;
import com.seed.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        // Generate Full Name
        user.setFullName(user.getFirstName() + " " + user.getMiddleName() + " " + user.getLastName());
        return userRepository.save(user);
    }

    public boolean emailExists(String email) {
        return userRepository.findByEmailIgnoreCase(email).isPresent();
    }

}
