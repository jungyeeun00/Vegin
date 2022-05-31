package com.example.board.controller;

import com.example.board.model.Recipe;
import com.example.board.model.Step;
import com.example.board.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
@RestController
@RequestMapping("/recipe-page")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @PostMapping("")
    public List<Recipe> getRecList(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, "recCookie");
        if(cookie == null) {
            return recipeService.recommend(null);
        }
        else {
            return recipeService.recommend(cookie.getValue());
        }
    }

    @GetMapping("/ingre/{id}")
    public HashMap<String, Object> getIngreById(
            @PathVariable Integer id) {

        return recipeService.getIngredient(id);
    }

    @GetMapping("/step/{id}")
    public List<Step> getStepById(
            @PathVariable Integer id) {

        return recipeService.getStep(id);
    }

    @ResponseBody
    @PostMapping("/views/{id}")
    public void setViewCount(
            @PathVariable Integer id,
            HttpSession session,
            HttpServletResponse response,
            HttpServletRequest request) {

        Log(id,"",session,response,request,0);

        recipeService.setViews(id);
    }

    @PostMapping("/{category}")
    public ResponseEntity<Map> getRecipesByCate(@RequestParam(value = "sort", required = false) Integer sort,
                                                @PathVariable String category,
                                                @RequestParam(value = "searchInput", required = false) String searchInput,
                                                @RequestParam(value = "p_num", required=false) Integer p_num,
                                                HttpSession session,
                                                HttpServletResponse response,
                                                HttpServletRequest request) {

        // 검색어 입력하고 엔터 누를 시 log 기록
        if(p_num == -1 && searchInput.length() > 0)
            Log(0, searchInput, session, response, request, 1);

        if (p_num == null || p_num <= 0) p_num = 1;

        if (category.equals("전체") && searchInput.length() == 0) // 전체, 검색X
            return recipeService.getRecipe(sort, p_num);
        else if(category.equals("전체") && searchInput.length() != 0) // 전체, 검색O
            return recipeService.getRecipeKeyword(sort, searchInput, p_num);
        else if (searchInput.length() == 0) // 카테고리, 검색X
            return recipeService.getRecipeCate(sort, category, p_num);
        else // 카테고리, 검색O
            return recipeService.getRecipeCateKeyword(sort, category, searchInput, p_num);
    }

    @PostMapping("/{category1}/{category2}")
    public ResponseEntity<Map> getRecipesByCate1(@RequestParam(value = "sort", required = false) Integer sort,
                                                 @PathVariable String category1,
                                                 @PathVariable String category2,
                                                 @RequestParam(value = "searchInput", required = false) String searchInput,
                                                 @RequestParam(value = "p_num", required=false) Integer p_num,
                                                 HttpSession session,
                                                 HttpServletResponse response,
                                                 HttpServletRequest request) {
        // 검색어 입력하고 엔터 누를 시 log 기록
        if(p_num == -1 && searchInput.length() > 0)
            Log(0, searchInput, session, response, request, 1);

        if (p_num == null || p_num <= 0) p_num = 1;

        String category = category1 + "/" + category2;
        if (searchInput.length() == 0) // 검색X
            return recipeService.getRecipeCate(sort, category, p_num);
        else // 검색O
            return recipeService.getRecipeCateKeyword(sort, category, searchInput, p_num);
    }

    @PostMapping("/{category1}/{category2}/{category3}")
    public ResponseEntity<Map> getRecipesByCate2(@RequestParam(value = "sort", required = false) Integer sort,
                                                 @PathVariable String category1,
                                                 @PathVariable String category2,
                                                 @PathVariable String category3,
                                                 @RequestParam(value = "searchInput", required = false) String searchInput,
                                                 @RequestParam(value = "p_num", required=false) Integer p_num,
                                                 HttpSession session,
                                                 HttpServletResponse response,
                                                 HttpServletRequest request) {
        // 검색어 입력하고 엔터 누를 시 log 기록
        if(p_num == -1 && searchInput.length() > 0)
            Log(0, searchInput, session, response, request, 1);

        if (p_num == null || p_num <= 0) p_num = 1;

        String category = category1 + "/" + category2 + "/" + category3;

        if (searchInput.length() == 0) // 검색X
            return recipeService.getRecipeCate(sort, category, p_num);
        else // 검색O
            return recipeService.getRecipeCateKeyword(sort, category, searchInput, p_num);
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
                recipeService.writeLog(recCookie, id, session.getLastAccessedTime());
            else
                recipeService.writeLog(recCookie, keyword, session.getLastAccessedTime());

        } else if (cookie != null) {
            //쿠키 시간 재설정 해주기
            cookie.setPath("/");
            cookie.setHttpOnly(true);
            cookie.setMaxAge(60 * 10);
            response.addCookie(cookie);

            if(flag == 0)
                recipeService.writeLog(cookie, id, session.getLastAccessedTime());
            else
                recipeService.writeLog(cookie, keyword, session.getLastAccessedTime());
        }
    }
}
