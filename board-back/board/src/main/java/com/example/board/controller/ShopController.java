package com.example.board.controller;
import com.example.board.dto.ProductDto;
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

    /* 추천 상품 리스트 받아옴 */
    @PostMapping("")
    public List<Product> getShopList(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, "recShop");
        if(cookie == null)  // 랜덤
          return shopService.recommend(null);

        else
          return shopService.recommend(cookie.getValue());
    }

    /* 홈에서 보여질 featured 4개 상품 */
    @GetMapping("/featured")
    public ResponseEntity<List<ProductDto>> getFeatured() {
        return shopService.getFeatured();
    }

    /* 카테고리(전체를 포함한 카테고리들) */
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

    /* 상품별 옵션 */
    @ResponseBody
    @PostMapping("/shop-detail-page/{productId}")
    public List<Choice> getChoiceList(@PathVariable Integer productId,
                                      HttpSession session,
                                      HttpServletResponse response,
                                      HttpServletRequest request) {
        Log(productId, "", session, response, request, 0);
       return shopService.getChoices(productId);
    }

    /* 레시피 클릭, 검색 시 쿠키 설정 및 로그 기록 함수 호출 메소드 */
    public void Log(Integer id,
                    String keyword,
                    HttpSession session,
                    HttpServletResponse response,
                    HttpServletRequest request,
                    Integer flag) {

        Cookie cookie = WebUtils.getCookie(request, "recShop");

        /* 첫 클릭 시 쿠키 생성 및 로그 기록 */
        if (cookie == null) {
            String ckid = session.getId();
            Cookie recShop = new Cookie("recShop", ckid);
            recShop.setPath("/");
            recShop.setHttpOnly(true);
            recShop.setMaxAge(60 * 60 * 24 * 365);
            response.addCookie(recShop);

            if(flag == 0)
                shopService.writeLog(recShop, id, session.getLastAccessedTime());
            else
                shopService.writeLog(recShop, keyword, session.getLastAccessedTime());

        }
        /* 첫 클릭 아닐 시 쿠키 재설정 및 로그 기록 */
        else if (cookie != null) {
            cookie.setPath("/");
            cookie.setHttpOnly(true);
            cookie.setMaxAge(60 * 60 * 24 * 365);
            response.addCookie(cookie);

            if(flag == 0)
                shopService.writeLog(cookie, id, session.getLastAccessedTime());
            else
                shopService.writeLog(cookie, keyword, session.getLastAccessedTime());
        }
    }

}