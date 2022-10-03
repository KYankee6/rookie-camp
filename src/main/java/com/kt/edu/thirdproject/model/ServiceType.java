package com.kt.edu.thirdproject.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@NoArgsConstructor
@Table(name = "service_type")
public class ServiceType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")  // 컬럼 지정
    private int id;

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "img")
    private String img;

    @NotNull
    @Column(name = "cnt")
    private int cnt;

    @Builder
    public ServiceType(int id, String name, String img, int cnt){
        this.id=id;
        this.name=name;
        this.img=img;
        this.cnt=cnt;

    }

}
