package com.kt.edu.thirdproject.controller.rest;
import com.kt.edu.thirdproject.dto.ProductDto;
//import com.kt.edu.thirdproject.model.Category;
import com.kt.edu.thirdproject.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class ProductController {
    @Autowired
    private final ProductService productService;

    @GetMapping("/")
    public String list(Model model){
        List<ProductDto> productDtoList=productService.getProductlist();
        model.addAttribute("productlist",productDtoList);
        return "index";
    }

}





