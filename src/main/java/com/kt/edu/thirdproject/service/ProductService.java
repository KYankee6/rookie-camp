package com.kt.edu.thirdproject.service;

import com.kt.edu.thirdproject.dto.ProductDto;
import com.kt.edu.thirdproject.model.Product;
import com.kt.edu.thirdproject.repository.ProductRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
@Service
public class ProductService {
    private ProductRepository productRepository;
    public ProductService(ProductRepository productRepository){
        this.productRepository=productRepository;
    }

    @Transactional
    public List<ProductDto> getProductlist() {
        List<Product> products = productRepository.findAll();
        List<ProductDto> productDtoList = new ArrayList<>();

        for (Product product : products) {
            ProductDto productDto = ProductDto.builder()
                    .id(product.getId())
                    .name(product.getName())
                    .img(product.getImg())
                    .description(product.getDescription())
                    .serv_id(product.getServ_id())
                    .serv_sub_id(product.getServ_sub_id())
                    .taglist(product.getTaglist())
                    .pd_cnt(product.getPd_cnt())
                    .build();
            productDtoList.add(productDto);
        }
        return productDtoList;
    }
}
