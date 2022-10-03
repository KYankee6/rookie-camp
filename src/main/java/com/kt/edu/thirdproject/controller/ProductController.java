package com.kt.edu.thirdproject.controller;
import com.kt.edu.thirdproject.dto.HashtagDto;
import com.kt.edu.thirdproject.dto.ProductDto;
//import com.kt.edu.thirdproject.model.Category;
import com.kt.edu.thirdproject.dto.ServicetypeDto;
import com.kt.edu.thirdproject.service.HashtagService;
import com.kt.edu.thirdproject.service.ProductService;
import com.kt.edu.thirdproject.service.ServicetypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class ProductController {
    private final ProductService productService;
    private final ServicetypeService servicetypeService;

    private final HashtagService hashtagService;
//
//    private final ProductRepository productRepository;

//    //mysql 연동 테스트
//    @GetMapping("mysql")
//    public List<Product> findAllMember() {
//        return productRepository.findAll();
//    }


    @GetMapping("/")
    public String list(Model model){
        List<ServicetypeDto> servicetypeDtoList=servicetypeService.getServicetypelist();
        model.addAttribute("serviceTypeList",servicetypeDtoList);
        List<HashtagDto> hashtagDtoList=hashtagService.getHashtaglist();
        model.addAttribute("hashtaglist",hashtagDtoList);
        List<ProductDto> productDtoList=productService.getProductlist();
        model.addAttribute("productlist",productDtoList);
        return "index";
    }

}





