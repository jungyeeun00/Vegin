package com.example.shop.service;

import com.example.shop.exception.ResourceNotFoundException;
import com.example.shop.model.Product;
import com.example.shop.repository.ShopRepository;
import com.example.shop.util.PagingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.shop.model.Choice;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ShopService {

    @Autowired
    private ShopRepository shopRepository;

    public List<Choice> getChoices(Integer productId) {
        return shopRepository.findChoice(productId);
}

    public List<Product> getAllProduct() {
        return shopRepository.findAll();
    }
    public ResponseEntity<Product> getProduct(Integer productId) {
        Product product = shopRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Product Data by id : ["+productId+"]"));
        return ResponseEntity.ok(product);
    }

    public ResponseEntity<Map> getPagingProduct(Integer p_num) {
        Map result = null;

        PagingUtil pu = new PagingUtil(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )
        List<Product> list = shopRepository.findFromTo(pu.getObjectStartNum(), pu.getObjectCountPerPage());
        pu.setObjectCountTotal(findAllCount());
        pu.setCalcForPaging();

        System.out.println("p_num : "+p_num);
        System.out.println(pu.toString());

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap<>();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }

    public ResponseEntity<Map> getPagingProductWithKeyword(String searchInput, Integer p_num) {
        Map result = null;

        PagingUtil pu = new PagingUtil(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )
        List<Product> list = shopRepository.findFromToWithKeyword(searchInput, pu.getObjectStartNum(), pu.getObjectCountPerPage());
        pu.setObjectCountTotal(findCountWithKeyword(searchInput));
        pu.setCalcForPaging();

        System.out.println("p_num : "+p_num);
        System.out.println(pu.toString());

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap<>();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }
    public ResponseEntity<Map> getPagingProductCate(String category, Integer p_num) {
        Map result = null;

        PagingUtil pu = new PagingUtil(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )
        List<Product> list = shopRepository.findFromToByCate(category,pu.getObjectStartNum(), pu.getObjectCountPerPage());
        pu.setObjectCountTotal(findCateCount(category));
        pu.setCalcForPaging();

        System.out.println("p_num : "+p_num);
        System.out.println(pu.toString());

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap<>();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }


    public ResponseEntity<Map> getPagingProductCateWithKeyword(String category, String searchInput, Integer p_num) {
        Map result = null;

        PagingUtil pu = new PagingUtil(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )
        List<Product> list = shopRepository.findFromToByCateWithKeyword(category, searchInput, pu.getObjectStartNum(), pu.getObjectCountPerPage());
        pu.setObjectCountTotal(findCateCountWithKeyword(category, searchInput));
        pu.setCalcForPaging();

        System.out.println("p_num : "+p_num);
        System.out.println(pu.toString());

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap<>();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }


    public int findAllCount() {
        return (int) shopRepository.count();
    }

    public int findCountWithKeyword(String searchInput) {
        return shopRepository.countWithKeyword(searchInput).intValue();
    }

    public int findCateCount(String category) {
        return shopRepository.countCate(category).intValue();
    }
    public int findCateCountWithKeyword(String category, String searchInput) {
        return shopRepository.countCateWithKeyword(category, searchInput).intValue();
    }
}
