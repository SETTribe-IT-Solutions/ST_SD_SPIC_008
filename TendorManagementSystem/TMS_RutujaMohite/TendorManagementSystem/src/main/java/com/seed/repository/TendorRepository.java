package com.seed.repository;




import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.seed.bean.Tendor;



@Repository
public interface TendorRepository extends JpaRepository<Tendor, Long> {
    // You can add custom queries if needed
}