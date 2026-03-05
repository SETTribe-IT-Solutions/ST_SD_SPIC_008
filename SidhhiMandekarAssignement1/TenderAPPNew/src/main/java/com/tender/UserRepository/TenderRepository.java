package com.tender.UserRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tender.User.Tender;

@Repository
public interface TenderRepository extends JpaRepository<Tender, Long> {
}