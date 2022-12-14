package com.kt.edu.thirdproject.dto;

import com.kt.edu.thirdproject.model.ServiceType;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ServiceTypeDto {
    private int id;
    private String name;
    private String img;
    private int cnt;

    public ServiceType toEntity(){
        ServiceType build= ServiceType.builder()
                .id(id)
                .name(name)
                .img(img)
                .cnt(cnt)
                .build();
        return build;
    }

    @Builder
    public ServiceTypeDto(int id, String name, String img, int cnt){
        this.id=id;
        this.name=name;
        this.img=img;
        this.cnt=cnt;

    }
}
