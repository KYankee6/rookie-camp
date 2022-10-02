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
@AllArgsConstructor
@Table(name = "hashtag")
public class Hashtag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")  // 컬럼 지정
    private int id;

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "type")
    private String type;

//    @Builder
//    public Hashtag(int id,String name,String type){
//        this.id=id;
//        this.name=name;
//        this.type=type;
//    }
}
