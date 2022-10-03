package com.kt.edu.thirdproject.repository;

import com.kt.edu.thirdproject.model.Servicetype;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicetypeRepository extends JpaRepository<Servicetype, Integer>{

}
