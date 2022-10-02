package com.kt.edu.thirdproject.repository;

import com.kt.edu.thirdproject.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{
    @Query("select p from Product p where p.servId = ?1")
    List<Product> findByServId(int servId);

}
