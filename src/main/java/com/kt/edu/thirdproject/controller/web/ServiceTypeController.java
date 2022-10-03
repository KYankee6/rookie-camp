package com.kt.edu.thirdproject.controller.web;

import com.kt.edu.thirdproject.dto.ServiceTypeDto;
import com.kt.edu.thirdproject.model.Product;
import com.kt.edu.thirdproject.service.ProductService;
import com.kt.edu.thirdproject.service.ServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ServiceTypeController {
    @Autowired
    private ProductService productService;

    @Autowired
    private ServiceTypeService serviceTypeService;


    @GetMapping("/category")
    public String categoryPage(Model model) {
        List<Product> productDtoList=productService.findAll();
        List<ServiceTypeDto> serviceTypeDtoList=serviceTypeService.getServiceTypeList();
        model.addAttribute("productList",productDtoList);
        model.addAttribute("serviceTypeList",serviceTypeDtoList);
        return "category";
    }
}





