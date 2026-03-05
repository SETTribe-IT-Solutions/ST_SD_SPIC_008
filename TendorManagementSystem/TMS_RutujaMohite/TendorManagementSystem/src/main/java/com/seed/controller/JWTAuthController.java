package com.seed.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.seed.bean.JwtResponse;
import com.seed.bean.LoginRequest;
import com.seed.utils.JwtUtil;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class JWTAuthController {
	@Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/generateToken")
    public JwtResponse getToken(@RequestBody LoginRequest loginRequest) {

    	try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
                )
            );
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid Credentials");
        }

        String token = jwtUtil.generateToken(loginRequest.getEmail());
        return new JwtResponse(token);
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello! You are authenticated using JWT.";
    }


}
