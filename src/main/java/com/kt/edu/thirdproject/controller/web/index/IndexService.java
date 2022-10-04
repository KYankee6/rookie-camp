package com.kt.edu.thirdproject.controller.web.index;

import com.kt.edu.thirdproject.service.ProductService;
import com.kt.edu.thirdproject.service.ServiceTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class IndexService {

    @Autowired
    private ProductService productService;

    @Autowired
    private ServiceTypeService serviceTypeService;



}