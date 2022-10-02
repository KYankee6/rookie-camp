package com.kt.edu.thirdproject.dto;

import com.kt.edu.thirdproject.model.Product;
import lombok.Builder;

public class ProductDto {
    private int id;
    private String name;
    private String description;
    private String img;
    private int serv_id;
    private int serv_sub_id;
    private  String taglist;
    private int pd_cnt;

    public Product toEntity(){
        Product build= Product.builder()
                .id(id)
                .name(name)
                .img(img)
                .description(description)
                .serv_id(serv_id)
                .serv_sub_id(serv_sub_id)
                .taglist(taglist)
                .pd_cnt(pd_cnt)
                .build();
        return build;
    }

    @Builder
    public ProductDto(int id,String name,String description,String img,int serv_id,int serv_sub_id,String taglist,int pd_cnt){
        this.id=id;
        this.name=name;
        this.description=description;
        this.img=img;
        this.serv_id=serv_id;
        this.serv_sub_id=serv_sub_id;
        this.taglist=taglist;
        this.pd_cnt=pd_cnt;

    }
}
