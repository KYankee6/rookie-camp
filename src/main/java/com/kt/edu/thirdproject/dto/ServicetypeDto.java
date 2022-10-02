package com.kt.edu.thirdproject.dto;

import com.kt.edu.thirdproject.model.Servicetype;
import lombok.Builder;
public class ServicetypeDto {
    private int id;
    private String name;
    private String img;
    private int cnt;

    public Servicetype toEntity(){
        Servicetype build= Servicetype.builder()
                .id(id)
                .name(name)
                .img(img)
                .cnt(cnt)
                .build();
        return build;
    }

    @Builder
    public ServicetypeDto(int id,String name,String img,int cnt){
        this.id=id;
        this.name=name;
        this.img=img;
        this.cnt=cnt;

    }
}