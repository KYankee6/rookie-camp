package com.kt.edu.thirdproject.dto;

import com.kt.edu.thirdproject.model.Hashtag;
import lombok.Builder;
import lombok.Getter;

@Getter
public class HashtagDto {
    private int id;
    private String name;
    private String type;

    public Hashtag toEntity() {
        Hashtag build = Hashtag.builder()
                .id(id)
                .name(name)
                .type(type)
                .build();
        return build;
    }

    @Builder
    public HashtagDto(int id, String name, String type) {
        this.id = id;
        this.name = name;
        this.type = type;

    }
}
