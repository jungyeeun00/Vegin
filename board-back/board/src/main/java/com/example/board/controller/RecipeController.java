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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/recipe-page")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    /* 추천 레시피 리스트 받아옴 */
    @PostMapping("")
    public List<Recipe> getRecList(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, "recRecipe");
        if(cookie == null) {
            return recipeService.recommend(null);
        }
        else {
            return recipeService.recommend(cookie.getValue());
        }
    }

    /* 홈에서 보여질 featured 4개 레시피 */
    @GetMapping("/featured")
    public ResponseEntity<List<Recipe>> getFeatured() {
        return recipeService.getFeatured();
    }

    /* 디테일에서 보여질 레시피별 ingredient */
    @GetMapping("/ingre/{id}")
    public ResponseEntity<HashMap<String, Object>> getIngreById(
            @PathVariable Integer id) {

        return recipeService.getIngredient(id);
    }

    /* 디테일에서 보여질 레시피별 step */
    @GetMapping("/step/{id}")
    public ResponseEntity<List<Step>> getStepById(
            @PathVariable Integer id) {

        return recipeService.getStep(id);
    }

    /* 조회수 증가 */
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

    /* 카테고리(전체 및 일반 카테고리) */
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

    /* 카테고리(빵/디저트/과자) */
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

    /* 레시피 클릭, 검색 시 쿠키 설정 및 로그 기록 함수 호출 메소드 */
    public void Log(Integer id,
                    String keyword,
                    HttpSession session,
                    HttpServletResponse response,
                    HttpServletRequest request,
                    Integer flag) {

        Cookie cookie = WebUtils.getCookie(request, "recRecipe");

        /* 첫 클릭 시 쿠키 생성 및 로그 기록 */
        if (cookie == null) {
            String ckid = session.getId();
            Cookie recRecipe = new Cookie("recRecipe", ckid);
            recRecipe.setPath("/");
            recRecipe.setHttpOnly(true);
            recRecipe.setMaxAge(60 * 60 * 24 * 365);
            response.addCookie(recRecipe);

            if(flag == 0)
                recipeService.writeLog(recRecipe, id, session.getLastAccessedTime());
            else
                recipeService.writeLog(recRecipe, keyword, session.getLastAccessedTime());

        }
        /* 첫 클릭 아닐 시 쿠키 재설정 및 로그 기록 */
        else if (cookie != null) {
            cookie.setPath("/");
            cookie.setHttpOnly(true);
            cookie.setMaxAge(60 * 60 * 24 * 365);
            response.addCookie(cookie);

            if(flag == 0)
                recipeService.writeLog(cookie, id, session.getLastAccessedTime());
            else
                recipeService.writeLog(cookie, keyword, session.getLastAccessedTime());
        }
    }
}
