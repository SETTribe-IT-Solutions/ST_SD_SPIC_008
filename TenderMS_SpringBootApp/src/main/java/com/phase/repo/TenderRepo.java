package com.phase.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.phase.entity.Tender;

@Repository
public interface TenderRepo extends JpaRepository<Tender, Long> {
}
