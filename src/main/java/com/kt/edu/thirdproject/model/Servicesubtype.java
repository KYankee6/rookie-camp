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
@Table(name = "service_subtype")
public class Servicesubtype {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")  // 컬럼 지정
    private int id;

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "serv_id")
    private int serv_id;

    @Builder
    public Servicesubtype(int id,String name,int serv_id){
        this.id=id;
        this.name=name;
        this.serv_id=serv_id;

    }

}
