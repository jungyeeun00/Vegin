package com.example.board.controller;
import com.example.board.model.Choice;
import com.example.board.model.Product;
import com.example.board.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/shop-page")
public class ShopController {

    @Autowired
    private ShopService shopService;

    @PostMapping("")
    public List<Product> getShopList(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, "recCookie");
        if(cookie == null)  // 랜덤
          return shopService.recommend(null);

        else
          return shopService.recommend(cookie.getValue());
    }

    // 1. 상품 전체 목록
    @ResponseBody
    @PostMapping("/{category}")
    public ResponseEntity<Map> getProductsByCate(@PathVariable String category,
                                                 @RequestParam(value = "searchInput", required = false) String searchInput,
                                                 @RequestParam(value = "sort", required = false) Integer sort,
                                                 @RequestParam(value = "p_num", required = false) Integer p_num,
                                                 HttpSession session,
                                                 HttpServletResponse response,
                                                 HttpServletRequest request) throws IOException {
        System.out.println("sort : " + sort);
        // 검색어 입력하고 엔터 누를 시 log 기록
        if(p_num == -1 && searchInput.length() > 0)
            Log(0, searchInput, session, response, request, 1);

        if (p_num == null || p_num <= 0) p_num = 1;

        // order 1이면 sold_price 기준 정렬
        if (category.equals("전체") && searchInput.length() == 0) { // 전체, 검색X
//            return sort == 0 ? shopService.getPagingProduct("product_id", p_num)
//                    : shopService.getPagingProduct("sold_price", p_num);
            return shopService.getProduct(sort, p_num);
        }
            //return shopService.getPagingProduct("sold_price", p_num);
        else if(category.equals("전체") && searchInput.length() != 0)  // 전체, 검색O
            return shopService.getProductKeyword(searchInput, p_num, sort);
        else if (searchInput.length() == 0) // 카테고리, 검색X
            return shopService.getProductCate(category, p_num, sort);
        else  // 카테고리, 검색O
            return shopService.getProductCateKeyword(category, searchInput, p_num, sort);
    }

    // get product
    @ResponseBody
    @PostMapping("/shop-detail-page/{productId}")
    public List<Choice> getChoiceList(@PathVariable Integer productId,
                                      HttpSession session,
                                      HttpServletResponse response,
                                      HttpServletRequest request) {
        Log(productId, "", session, response, request, 0);
       return shopService.getChoices(productId);
    }

    // 레시피 클릭, 검색 시 쿠키 설정 및 로그 기록 함수 호출 메소드
    public void Log(Integer id,
                    String keyword,
                    HttpSession session,
                    HttpServletResponse response,
                    HttpServletRequest request,
                    Integer flag) {

        Cookie cookie = WebUtils.getCookie(request, "recCookie");

        // 비회원 첫 클릭
        if (cookie == null) {
            String ckid = session.getId();
            Cookie recCookie = new Cookie("recCookie", ckid);
            recCookie.setPath("/");
            recCookie.setHttpOnly(true);
            recCookie.setMaxAge(60 * 10);
            response.addCookie(recCookie);

            if(flag == 0)
                shopService.writeLog(recCookie, id, session.getLastAccessedTime());
            else
                shopService.writeLog(recCookie, keyword, session.getLastAccessedTime());

        } else if (cookie != null) {
            //쿠키 시간 재설정 해주기
            cookie.setPath("/");
            cookie.setHttpOnly(true);
            cookie.setMaxAge(60 * 10);
            response.addCookie(cookie);

            if(flag == 0)
                shopService.writeLog(cookie, id, session.getLastAccessedTime());
            else
                shopService.writeLog(cookie, keyword, session.getLastAccessedTime());
        }
    }

}