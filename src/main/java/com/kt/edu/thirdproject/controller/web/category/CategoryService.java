package com.kt.edu.thirdproject.controller.web.category;

import com.kt.edu.thirdproject.model.Product;
import com.kt.edu.thirdproject.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class CategoryService {
    @Autowired
    private ProductService productService;

    @GetMapping("/category")
    public List<Product> findAllProduct() {
        return productService.findAll();
    }

    @GetMapping("/category/{serv_id}")
    public List<Product> productsWithServId(@PathVariable Integer serv_id) {
        String CAT_ID = "8";
        List<Product> productList = productService.findByServId(serv_id)
                .stream()
                .filter(e -> Arrays.stream(e.getTaglist().split(","))
                        .anyMatch(f -> f.equals(CAT_ID)))
                .collect(Collectors.toList());

        return productList;
    }


}