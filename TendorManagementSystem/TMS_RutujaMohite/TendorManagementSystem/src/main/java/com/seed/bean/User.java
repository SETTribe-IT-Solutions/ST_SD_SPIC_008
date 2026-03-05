package com.seed.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
    
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userseq")
	@SequenceGenerator(name = "userseq", sequenceName = "userseq", allocationSize = 1)
	private Long id;
	
    @NotBlank
    private String firstName;

    @NotBlank
    private String middleName;

    @NotBlank
    private String lastName;

    private String fullName;

   
    private String mobileNumber;

    private String photo; // store file path

    @Email
    @Column(unique = true)
    private String email;

    
    private String password;
}