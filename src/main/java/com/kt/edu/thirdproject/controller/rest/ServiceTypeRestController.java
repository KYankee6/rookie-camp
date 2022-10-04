package com.kt.edu.thirdproject.controller.rest;

import com.kt.edu.thirdproject.model.Product;
import com.kt.edu.thirdproject.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class ServiceTypeRestController {
    @Autowired
    private ProductService productService;

    @GetMapping("/category")
    public List<Product> findAllProduct() {
        return productService.findAll();
    }

    @GetMapping("/category/{serv_id}")
    public List<Product> productsWithServId(@PathVariable Integer serv_id) {
        return productService.findByServId(serv_id);
    }


}