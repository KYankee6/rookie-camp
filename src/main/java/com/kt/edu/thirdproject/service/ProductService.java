package com.kt.edu.thirdproject.service;

import com.kt.edu.thirdproject.dto.ProductDto;
import com.kt.edu.thirdproject.model.Product;
import com.kt.edu.thirdproject.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
    private ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    @Transactional
    public List<Product> findAll() {
        return productRepository.findAll();
//        List<ProductDto> productDtoList = getProductDtos(products);
//        return productDtoList;
    }

    @Transactional
    public List<Product> findByServId(int servId) {
        return productRepository.findByServId(servId);
//        List<ProductDto> productDtoList = getProductDtos(products);
//        return productDtoList;
    }


    private List<ProductDto> getProductDtos(List<Product> products) {
        List<ProductDto> productDtoList = new ArrayList<>();

        for (Product product : products) {
            ProductDto productDto = ProductDto.builder()
                    .id(product.getId())
                    .name(product.getName())
                    .img(product.getImg())
                    .description(product.getDescription())
                    .servId(product.getServId())
                    .servSubId(product.getServSubId())
                    .taglist(product.getTaglist())
                    .pd_cnt(product.getPd_cnt())
                    .build();
            productDtoList.add(productDto);
        }
        return productDtoList;
    }
}
