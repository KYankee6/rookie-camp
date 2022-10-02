package com.kt.edu.thirdproject.repository;

import com.kt.edu.thirdproject.model.Service_subtype;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SevicesubtypeRepository extends JpaRepository<Service_subtype, Integer>{

}
