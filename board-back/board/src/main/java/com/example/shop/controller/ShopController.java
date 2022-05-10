package com.example.shop.controller;
import com.example.shop.model.Choice;
import com.example.shop.model.Product;
import com.example.shop.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/shop-page")
public class ShopController {

    @Autowired
    private ShopService shopService;

    // 1. 상품 전체 목록
    //@GetMapping("")
    @GetMapping("/{category}")
    public ResponseEntity<Map> getProductsByCate(@PathVariable String category,
                                                 //@PathVariable(required = false) String searchInput,
                                                 @RequestParam(value = "searchInput", required = false) String searchInput,
                                                 @RequestParam(value = "p_num", required = false) Integer p_num) {
        if (p_num == null || p_num <= 0) p_num = 1;

        if (category.equals("전체") && searchInput.length() == 0) // 전체, 검색X
            return shopService.getPagingProduct(p_num);
        else if(category.equals("전체") && searchInput.length() != 0) // 전체, 검색O
            return shopService.getPagingProductWithKeyword(searchInput, p_num);
        else if (searchInput.length() == 0) // 카테고리, 검색X
            return shopService.getPagingProductCate(category, p_num);
        else // 카테고리, 검색O
            return shopService.getPagingProductCateWithKeyword(category, searchInput, p_num);
    }

    // get product
    @GetMapping("/shop-detail-page/{productId}")
    public List<Choice> getChoiceList(@PathVariable Integer productId) {
       return shopService.getChoices(productId);
    }
}
