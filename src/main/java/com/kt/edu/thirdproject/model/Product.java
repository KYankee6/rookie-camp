package com.kt.edu.thirdproject.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

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
    private int serv_id;

    @NotNull
    @Column(name = "serv_sub_id")
    private int serv_sub_id;

    @NotNull
    @Column(name = "taglist")
    private String taglist;

    @NotNull
    @Column(name = "pd_cnt")
    private int pd_cnt;

    @Builder
    public Product(int id,String name,String description,String img,int serv_id,int serv_sub_id,String taglist,int pd_cnt){
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
