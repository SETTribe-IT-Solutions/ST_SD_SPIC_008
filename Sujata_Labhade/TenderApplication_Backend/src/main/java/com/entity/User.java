package com.entity;

import jakarta.persistence.*;
import lombok.Data;
	@Data
	@Entity
	@Table(name = "users")
	public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
	@SequenceGenerator(
	    name = "user_seq",
	    sequenceName = "USER_SEQ",
	    allocationSize = 1
	)
	private Long id;

	    private String fullName;
	    private String email;
	    private String password;
	    private String contact;
	    private String gender;

	    
	}

