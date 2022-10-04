package com.kt.edu.thirdproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "categorytable")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")  // 컬럼 지정
    private int id;

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "icon")
    private String icon;

    @NotNull
    @Column(name = "cnt")
    private int cnt;
//
//    @Builder
//    public Category(int id,String name,String icon,int cnt){
//        this.id=id;
//        this.name=name;
//        this.icon=icon;
//        this.cnt=cnt;
//    }
}
