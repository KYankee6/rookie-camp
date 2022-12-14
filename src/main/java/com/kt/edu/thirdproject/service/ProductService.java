package com.kt.edu.thirdproject.service;


import com.kt.edu.thirdproject.dto.ProductDto;
import com.kt.edu.thirdproject.model.Product;
import com.kt.edu.thirdproject.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
//    @Transactional
//    public List<ProductDto> findAllTagList() {
//        ServiceTypeService.getServiceTypeList();
//        return (List<ProductDto>) productRepository.findAll().stream()
//                .filter(p->p.getServId()==1)
//                .findFirst().get();
//    }


    @Transactional
    public List<ProductDto> getProductlist() {
        List<Product> products = productRepository.findAll();
        List<ProductDto> productDtoList = new ArrayList<>();

        //product별 taglist를 list화
        for (Product product : products) {
            String str=product.getTaglist();
            String[] res = str.split("[,]", 0);

            Map<String,Object> info=new HashMap();
            List<Integer> entsize=new ArrayList<Integer>();
            List<Integer> category=new ArrayList<Integer>();
            List<Integer> serv_type=new ArrayList<Integer>();
            for(String myStr: res) {
                int tagnum=Integer.parseInt(myStr);
                if(tagnum>=1 && tagnum<=3){
                    entsize.add(tagnum);
                }
                else if(tagnum>=4 && tagnum<=18){
                    category.add(tagnum);
                }
                else{
                    serv_type.add(tagnum);
                }

            }
            info.put("규모",entsize);
            info.put("업종",category);
            info.put("서비스",serv_type);
            ProductDto productDto = ProductDto.builder()
                    .id(product.getId())
                    .name(product.getName())
                    .img(product.getImg())
                    .description(product.getDescription())
                    .servId(product.getServId())
                    .servSubId(product.getServSubId())
                    .taglist(info.toString())
                    .pd_cnt(product.getPd_cnt())
                    .build();
            productDtoList.add(productDto);
        }
        return productDtoList;
    }


}