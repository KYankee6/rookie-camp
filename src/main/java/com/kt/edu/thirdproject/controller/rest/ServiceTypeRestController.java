package com.kt.edu.thirdproject.controller.rest;

import com.kt.edu.thirdproject.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class ServiceTypeRestController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/category/{serv_id}")
    public String productsWithServId(Model model, @PathVariable int serv_id) {
        model.addAttribute("categories", productRepository.findByServId(serv_id));
        return "category";
    }

    @GetMapping("/category")
    public String categoryPage(Model model) {
        model.addAttribute("categories", productRepository.findAll());
        return "category";
    }
}
