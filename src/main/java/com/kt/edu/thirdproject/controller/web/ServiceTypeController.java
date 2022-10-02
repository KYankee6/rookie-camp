package com.kt.edu.thirdproject.controller.web;

import com.kt.edu.thirdproject.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ServiceTypeController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/category")
    public String categoryPage(Model model) {
        model.addAttribute("categories", productRepository.findAll());
        return "category";
    }
}





