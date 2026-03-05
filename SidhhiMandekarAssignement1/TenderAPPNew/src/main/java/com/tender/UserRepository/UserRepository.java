package com.tender.UserRepository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tender.User.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByEmailAndPassword(String email, String password);

	Optional<User> findByEmail(String email);
}