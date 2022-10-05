package com.kt.edu.thirdproject.controller.rest;
//import com.kt.edu.thirdproject.model.Category;

import com.kt.edu.thirdproject.dto.HashtagDto;
import com.kt.edu.thirdproject.dto.ProductDto;
import com.kt.edu.thirdproject.dto.ServiceTypeDto;
import com.kt.edu.thirdproject.service.HashtagService;
import com.kt.edu.thirdproject.service.ProductService;
import com.kt.edu.thirdproject.service.ServiceTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/")
public class ProductRestController {
    @Autowired
    private final ProductService productService;
    @Autowired
    private final ServiceTypeService servicetypeService;

    @Autowired
    private final HashtagService hashtagService;


    @GetMapping("/product")
    public Model list(Model model, HttpServletRequest req) {
        String entSize = req.getParameter("entSize");
        String servId = req.getParameter("servId");
        List<ServiceTypeDto> serviceTypeDtoList = servicetypeService.getServiceTypeList();
        List<HashtagDto> hashtagDtoList = hashtagService.getHashtaglist();
        List<ProductDto> productDtoList = productService.getProductlist();

        model.addAttribute("serviceTypeList", serviceTypeDtoList);
        model.addAttribute("hashtagList", hashtagDtoList);
        model.addAttribute("productList", productDtoList);
        return model;
    }

}
