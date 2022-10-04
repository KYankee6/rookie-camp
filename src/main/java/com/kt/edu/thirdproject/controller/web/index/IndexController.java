package com.kt.edu.thirdproject.controller.web.index;

import com.kt.edu.thirdproject.dto.ProductDto;
import com.kt.edu.thirdproject.dto.ServiceTypeDto;
import com.kt.edu.thirdproject.model.Product;
import com.kt.edu.thirdproject.repository.HashtagRepository;
import com.kt.edu.thirdproject.service.HashtagService;
import com.kt.edu.thirdproject.service.ProductService;
import com.kt.edu.thirdproject.service.ServiceSubTypeService;
import com.kt.edu.thirdproject.service.ServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

@Controller
public class IndexController {


    @Autowired
    private ProductService productService;

    @Autowired
    private ServiceTypeService serviceTypeService;

    @Autowired
    private HashtagService hashtagService;

    @GetMapping("/")
    public String mainPage(Model model) {
        List<Product> productDtoList = productService.findAll();
        List<ServiceTypeDto> serviceTypeDtoList = serviceTypeService.getServiceTypeList();
        model.addAttribute("productList", productDtoList);
        model.addAttribute("serviceTypeList", serviceTypeDtoList);
        return "index";
    }

    @ResponseBody
    @GetMapping("/api/v1/index")
    public List<ProductDto> findByEntSizeAndServId(HttpServletRequest req, Model model) {
        String servId = req.getParameter("servId");
        String entSize = req.getParameter("entSize");
        System.out.println("entSize = " + entSize);
        System.out.println("servId = " + servId);
        List<String> hashTagList = hashtagService.getHashtaglist()
                .stream()
                .map(e -> e.getName())
                .collect(Collectors.toList());

        List<Product> productList = productService.findByServId(Integer.parseInt(servId));
        Map<Integer, String> hashTagMap = IntStream.range(0, hashTagList.size()).boxed()
                .collect(Collectors.toMap(Function.identity(), hashTagList::get));
        for (Integer integer : hashTagMap.keySet()) {
            System.out.println("integer = " + integer);
            System.out.println("hashTagMap = " + hashTagMap.get(integer));
        }

        List<Product> productListForResponse = productList
                .stream()
                .filter(e -> (Arrays.stream(e.getTaglist().split(",")).anyMatch(q -> q.equals(entSize))))
                .sorted(Comparator.comparing(Product::getId))
                .collect(Collectors.toList());

        List<List<String>> filteredHashTagStringList = productList
                .stream()
                .sorted(Comparator.comparing(Product::getId))
                .filter(e -> (Arrays.stream(e.getTaglist().split(",")).anyMatch(q -> q.equals(entSize))))
                .map(e -> (Arrays.stream(e.getTaglist().split(","))
                        .filter(z -> Integer.parseInt(z) >= 3 && Integer.parseInt(z) < 18)
                        .map(k -> hashTagMap.get(Integer.parseInt(k)-1))
                        .collect(Collectors.toList())))
                .collect(Collectors.toList());

        List<ProductDto> productDtoList = new ArrayList<>();
        for (int i = 0; i < productListForResponse.size(); i++) {
            ProductDto productDto = new ProductDto(productListForResponse.get(i), filteredHashTagStringList.get(i));
            productDtoList.add(productDto);
        }
        return productDtoList;
    }

}
