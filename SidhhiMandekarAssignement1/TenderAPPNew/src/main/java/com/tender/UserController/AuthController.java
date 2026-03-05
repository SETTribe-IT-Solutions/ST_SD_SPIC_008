package com.tender.UserController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tender.User.LoginRequest;
import com.tender.User.User;
import com.tender.UserRepository.UserRepository;
import com.tender.security.JwtUtil;

@RestController //handles HTTP requests
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

	
	//injecting dependency
    @Autowired
    private UserRepository userRepository; //to check user from database

    @Autowired
    private JwtUtil jwtUtil;  //to generate JWT token

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        User user = userRepository //checks database
                .findByEmailAndPassword(request.getUsername(), request.getPassword());

        if (user != null) {

            String token = jwtUtil.generateToken(user.getEmail());//create token

            return ResponseEntity.ok(token);//sends token back
         
            //if login fails
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Credentials");
        }
    }
}

//1. User enters email & password
//2. React sends POST /api/auth/login
//3. Spring checks database
//4. If valid → generate JWT
//5. Send token to React
//6. React stores token
//7. React sends token in Authorization header
//8. JwtFilter validates token
//9. If valid → protected API runs