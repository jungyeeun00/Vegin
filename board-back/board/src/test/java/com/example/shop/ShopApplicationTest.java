package com.example.shop;

import com.example.shop.model.Choice;
import com.example.shop.repository.ShopRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class ShopApplicationTests {

    @Autowired
    private ShopRepository shopRepository;

    @Test
    public List<Choice> testChoice() {
        return shopRepository.findChoice(1);
    }
//    public List<Choice> testRead(){
////        List<Choice> test = shopRepository.findChoice(625);
////        System.out.println(test);
//        return shopRepository.findChoice(1);
//    }

}
