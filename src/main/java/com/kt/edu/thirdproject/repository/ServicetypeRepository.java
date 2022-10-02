package com.kt.edu.thirdproject.repository;

import com.kt.edu.thirdproject.model.Service_type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicetypeRepository extends JpaRepository<Service_type, Integer>{

}
