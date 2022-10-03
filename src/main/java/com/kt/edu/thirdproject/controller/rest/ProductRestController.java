package com.kt.edu.thirdproject.controller.rest;
//import com.kt.edu.thirdproject.model.Category;
import com.kt.edu.thirdproject.dto.ServiceTypeDto;
import com.kt.edu.thirdproject.model.Product;
import com.kt.edu.thirdproject.service.ProductService;
import com.kt.edu.thirdproject.service.ServiceTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class ProductRestController {
    @Autowired
    private final ProductService productService;
    @Autowired
    private final ServiceTypeService servicetypeService;

    @GetMapping("/")
    public String list(Model model){
        List<Product> productDtoList=productService.findAll();
        List<ServiceTypeDto> serviceTypeDtoList=servicetypeService.getServiceTypeList();
        model.addAttribute("productList",productDtoList);
        model.addAttribute("serviceTypeList",serviceTypeDtoList);
        return "index";
    }

}





