package com.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Tender;


public interface TenderRepository extends JpaRepository<Tender, Long> {
}