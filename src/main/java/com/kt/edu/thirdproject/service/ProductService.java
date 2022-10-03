package com.kt.edu.thirdproject.service;


import com.kt.edu.thirdproject.dto.HashtagDto;
import com.kt.edu.thirdproject.dto.ProductDto;
import com.kt.edu.thirdproject.model.Hashtag;
import com.kt.edu.thirdproject.model.Product;
import com.kt.edu.thirdproject.repository.HashtagRepository;
import com.kt.edu.thirdproject.repository.ProductRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

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

        //product별 taglist를 list화
        for (Product product : products) {
            String str=product.getTaglist();
            System.out.println("taglist"+str);
            String[] res = str.split("[,]", 0);

            Map<String,Object> info=new HashMap();
            List<Integer> entsize=new ArrayList<Integer>();
            List<Integer> category=new ArrayList<Integer>();
            List<Integer> serv_type=new ArrayList<Integer>();
            for(String myStr: res) {
                int tagnum=Integer.parseInt(myStr);
//                System.out.println(tagnum);
                if(tagnum>=1 && tagnum<=3){
//                    System.out.println("규모"+tagnum);
                    entsize.add(tagnum);
                }
                else if(tagnum>=4 && tagnum<=18){
//                    System.out.println("업종"+tagnum);
                    category.add(tagnum);
                }
                else{
//                    System.out.println("서비스"+tagnum);
                    serv_type.add(tagnum);
                }

            }
            info.put("규모",entsize);
            info.put("업종",category);
            info.put("서비스",serv_type);
//            System.out.println("최종---------------------------"+info);
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
