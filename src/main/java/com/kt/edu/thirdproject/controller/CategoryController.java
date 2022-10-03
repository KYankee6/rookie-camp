package com.kt.edu.thirdproject.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@Controller
public class CategoryController {
    @GetMapping("/category")
    public String categoryPage(){
        return "category";
    }
}
