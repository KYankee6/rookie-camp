package com.kt.edu.thirdproject.repository;

import com.kt.edu.thirdproject.model.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HashtagRepository extends JpaRepository<Hashtag, Integer>{

}
