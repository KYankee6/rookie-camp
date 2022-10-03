package com.kt.edu.thirdproject.controller.rest;
//import com.kt.edu.thirdproject.model.Category;
import com.kt.edu.thirdproject.dto.HashtagDto;
import com.kt.edu.thirdproject.dto.ProductDto;
import com.kt.edu.thirdproject.dto.ServiceTypeDto;
import com.kt.edu.thirdproject.model.Hashtag;
import com.kt.edu.thirdproject.model.Product;
import com.kt.edu.thirdproject.service.HashtagService;
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

    @Autowired
    private final HashtagService hashtagService;

    @GetMapping("/")
    public String list(Model model){
        List<ServiceTypeDto> servicetypeDtoList=servicetypeService.getServiceTypeList();
        model.addAttribute("serviceTypeList",servicetypeDtoList);
        List<HashtagDto> hashtagDtoList=hashtagService.getHashtaglist();
        model.addAttribute("hashtaglist",hashtagDtoList);
        List<ProductDto> productDtoList=productService.getProductlist();
        model.addAttribute("productlist",productDtoList);
        return "index";
    }

}
