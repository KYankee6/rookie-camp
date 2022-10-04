package com.kt.edu.thirdproject.dto;

import com.kt.edu.thirdproject.model.Product;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class ProductDto {
    private int id;
    private String name;
    private String description;
    private String img;
    private int servId;
    private int servSubId;
    private  String taglist;
    private int pd_cnt;
    private List<String> hashTagList;

    public Product toEntity(){
        Product build= Product.builder()
                .id(id)
                .name(name)
                .img(img)
                .description(description)
                .servId(servId)
                .servSubId(servSubId)
                .taglist(taglist)
                .pd_cnt(pd_cnt)
                .build();
        return build;
    }

    @Builder
    public ProductDto(int id,String name,String description,String img,int servId,int servSubId,String taglist,int pd_cnt,List<String> hashTagList){
        this.id=id;
        this.name=name;
        this.description=description;
        this.img=img;
        this.servId=servId;
        this.servSubId=servSubId;
        this.taglist=taglist;
        this.pd_cnt=pd_cnt;
        this.hashTagList = hashTagList;
    }

    @Builder
    public ProductDto(Product product, List<String> hashTagList) {
        this.id=product.getId();
        this.name=product.getName();
        this.description=product.getDescription();
        this.img=product.getImg();
        this.servId=product.getServId();
        this.servSubId=product.getServSubId();
        this.taglist=product.getTaglist();
        this.pd_cnt=product.getPd_cnt();
        this.hashTagList=hashTagList;
    }
}
