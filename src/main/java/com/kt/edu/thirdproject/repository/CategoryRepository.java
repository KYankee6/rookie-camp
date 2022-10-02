package com.kt.edu.thirdproject.repository;

import com.kt.edu.thirdproject.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {
}
