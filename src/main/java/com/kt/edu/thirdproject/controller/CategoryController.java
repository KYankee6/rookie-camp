package com.kt.edu.thirdproject.controller;

import com.kt.edu.thirdproject.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/category")
    public String categoryPage(Model model) {
        model.addAttribute("categories", categoryRepository.findAll());
        return "category";

    }
}





