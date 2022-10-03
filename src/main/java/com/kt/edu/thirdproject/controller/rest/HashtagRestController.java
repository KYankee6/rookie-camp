package com.kt.edu.thirdproject.controller.rest;

import com.kt.edu.thirdproject.exception.ResourceNotFoundException;
import com.kt.edu.thirdproject.model.Hashtag;
import com.kt.edu.thirdproject.repository.HashtagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class HashtagRestController {

	@Autowired
	private HashtagRepository hashtagRepository;

	// get all employees
	@GetMapping("/hashtag")
	public List<Hashtag> getAllHashtags(){
		return hashtagRepository.findAll();
	}


	// create hastag rest api
	@PostMapping("/hashtag")
	public Hashtag createHashtag(@RequestBody Hashtag hashtag) {
		return hashtagRepository.save(hashtag);
	}
	
	// get hastag by id rest api
	@GetMapping("/hashtag/{id}")
	public ResponseEntity<Hashtag> getHashtagById(@PathVariable Long id) {
		Hashtag hastag = hashtagRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Hashtag not exist with id :" + id));
		return ResponseEntity.ok(hastag);
	}

	// update hastag rest api
	
	@PutMapping("/hashtag/{id}")
	public ResponseEntity<Hashtag> updateHashtag(@PathVariable Long id, @RequestBody Hashtag employeeDetails){
		Hashtag hastag = hashtagRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Hashtag not exist with id :" + id));
		
		hastag.setId(employeeDetails.getId());
		hastag.setName(employeeDetails.getName());
		hastag.setType(employeeDetails.getType());

		Hashtag updatedHashtag = hashtagRepository.save(hastag);
		return ResponseEntity.ok(updatedHashtag);
	}
	
	// delete hastag rest api
	@DeleteMapping("/hashtag/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteHashtag(@PathVariable Long id){
		Hashtag hastag = hashtagRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Hashtag not exist with id :" + id));
		
		hashtagRepository.delete(hastag);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
}
