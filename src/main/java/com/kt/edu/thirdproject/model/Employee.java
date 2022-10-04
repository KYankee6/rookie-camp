package com.kt.edu.thirdproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employees")
public class Employee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "empName")
	private String empName;

	@Column(name = "empDeptName")
	private String empDeptName;

	@Column(name = "empTelNo")
	private String empTelNo;

	@Column(name = "empMail")
	private String empMail;
}
