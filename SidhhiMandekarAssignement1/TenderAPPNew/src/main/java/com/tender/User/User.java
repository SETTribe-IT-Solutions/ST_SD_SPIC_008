package com.tender.User;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users1")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_seq_gen")
    @SequenceGenerator(
            name = "users_seq_gen",
            sequenceName = "users_seq",
            allocationSize = 1
    )
    private Long id;

    private String firstName;
    private String middleName;
    private String lastName;
    private String email;
    private String mobile;
    private String password;

    @Lob
    private byte[] photo;

   
}