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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


//    @GetMapping("/test/{taglist}")
//    public List<Product> productsWithTagList(@PathVariable String taglist) {
//        return productService.findByTagList(taglist);
//    }

    @GetMapping("/")
    public String list(Model model) {
        List<ServiceTypeDto> serviceTypeDtoList = servicetypeService.getServiceTypeList();
        List<HashtagDto> hashtagDtoList = hashtagService.getHashtaglist();
        List<ProductDto> productDtoList = productService.getProductlist();
        model.addAttribute("serviceTypeList", serviceTypeDtoList);
        model.addAttribute("hashtagList", hashtagDtoList);
        model.addAttribute("productList", productDtoList);
        return "index";
    }

}
