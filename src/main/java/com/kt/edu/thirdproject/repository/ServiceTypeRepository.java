package com.kt.edu.thirdproject.repository;

import com.kt.edu.thirdproject.model.ServiceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceTypeRepository extends JpaRepository<ServiceType, Integer>{

}
