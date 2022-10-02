package com.kt.edu.thirdproject.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CategoryController {
  @GetMapping("/category")
  public String categoryPage(){
      return "category";
  }
}





