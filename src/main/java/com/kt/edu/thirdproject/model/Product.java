package com.kt.edu.thirdproject.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@Data
@Entity
@NoArgsConstructor
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")  // 컬럼 지정
    private int id;

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "img")
    private String img;

    @NotNull
    @Column(name = "serv_id")
    private int servId;

    @NotNull
    @Column(name = "serv_sub_id")
    private int servSubId;

    @NotNull
    @Column(name = "taglist")
    private String taglist;

    @NotNull
    @Column(name = "pd_cnt")
    private int pd_cnt;

    @Builder
    public Product(int id,String name,String description,String img,int servId,int servSubId,String taglist,int pd_cnt){
        this.id=id;
        this.name=name;
        this.description=description;
        this.img=img;
        this.servId=servId;
        this.servSubId=servSubId;
        this.taglist=taglist;
        this.pd_cnt=pd_cnt;

    }

}
