package com.seed.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegistrationDto {

    @NotBlank
    private String firstName;

    @NotBlank
    private String middleName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String mobileNumber;

    private MultipartFile photo; // file upload

    @Email
    @NotBlank
    private String email;

    @Size(min = 6)
    private String password;

    @Size(min = 6)
    private String confirmPassword;
}