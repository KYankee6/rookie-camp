package com.kt.edu.thirdproject.repository;

import com.kt.edu.thirdproject.model.ServiceSubType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeviceSubTypeRepository extends JpaRepository<ServiceSubType, Integer>{

}
