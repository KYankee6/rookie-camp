package com.kt.edu.thirdproject.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kt.edu.thirdproject.exception.ResourceNotFoundException;
import com.kt.edu.thirdproject.model.Employee;
import com.kt.edu.thirdproject.repository.EmployeeRepository;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	// get all employees
	@GetMapping("/employees")
	public List<Employee> getAllEmployees(){
		return employeeRepository.findAll();
	}

	@GetMapping("/test")
	public ResponseEntity<String> test(){
		return ResponseEntity.ok("test pass");
	}
	@GetMapping("/test2")
	public ResponseEntity<String> test2(){
		return ResponseEntity.ok("test2 pass");
	}
	@GetMapping("/test3")
	public ResponseEntity<String> test3(){
		return ResponseEntity.ok("test2 pass");
	}
	@GetMapping("/test4")
	public ResponseEntity<String> test4(){
		return ResponseEntity.ok("test2 pass");
	}
	@GetMapping("/test5")
	public ResponseEntity<String> test5(){
		return ResponseEntity.ok("test5 pass");
	}


	// create employee rest api
	@PostMapping("/employebues")
	public Employee createEmployee(@RequestBody Employee employee) {
		return employeeRepository.save(employee);
	}
	
	// get employee by id rest api
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
		return ResponseEntity.ok(employee);
	}
	
	// update employee rest api
	
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails){
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
		
		employee.setEmpName(employeeDetails.getEmpName());
		employee.setEmpDeptName(employeeDetails.getEmpDeptName());
		employee.setEmpTelNo(employeeDetails.getEmpTelNo());
		employee.setEmpMail(employeeDetails.getEmpMail());
		
		Employee updatedEmployee = employeeRepository.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}
	
	// delete employee rest api
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
		
		employeeRepository.delete(employee);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
}
