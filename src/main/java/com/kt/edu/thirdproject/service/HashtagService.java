package com.kt.edu.thirdproject.service;

import com.kt.edu.thirdproject.dto.HashtagDto;
import com.kt.edu.thirdproject.model.Hashtag;
import com.kt.edu.thirdproject.repository.HashtagRepository;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class HashtagService {
    private HashtagRepository hashtagRepository;
    public HashtagService(HashtagRepository hashtagRepository){
        this.hashtagRepository=hashtagRepository;
    }

    @Transactional
    public List<HashtagDto> getHashtaglist() {
        List<Hashtag> hashtags = hashtagRepository.findAll();
        List<HashtagDto> hashtagsDtoList = new ArrayList<>();



        for (Hashtag hashtag : hashtags) {
            HashtagDto hashtagDto = HashtagDto.builder()
                    .id(hashtag.getId())
                    .name(hashtag.getName())
                    .type(hashtag.getType())
                    .build();
            hashtagsDtoList.add(hashtagDto);
        }
        return hashtagsDtoList;
    }
}
