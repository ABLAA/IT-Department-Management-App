package com.alro.zoo.UniversitairyYear.Year;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.alro.zoo.UniversitairyYear.Year.DTO.UniversitairyYearDTO;




@Controller
public class UniversitairyYearController {

	@Autowired
	private UniversitairyYearService service;
	
	@PostMapping(path = "/UniversitairyYear")
	public ResponseEntity<UniversitairyYear> addNewUniversitairyYear(@Valid @RequestBody UniversitairyYearDTO requestDto){
		return service.saveUniversitairyYear(requestDto);
	}
	
	@GetMapping(path = "/UniversitairyYears")
	public ResponseEntity<List<UniversitairyYear>> getAllUniversitairyYears(){
		return service.getUniversitairyYears();
	}
	
	@GetMapping(path = "/UniversitairyYear/{universitairyYear}")
	public ResponseEntity<UniversitairyYear> getDiscussionByCode(@PathVariable String universitairyYear){
		return service.getUniversitairyYearByYear(universitairyYear);
	}	
	
	
}