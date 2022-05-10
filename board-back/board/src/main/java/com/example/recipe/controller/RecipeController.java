package com.example.recipe.controller;

import com.example.recipe.model.Ingredient;
import com.example.recipe.model.Recipe;
import com.example.recipe.model.Step;
import com.example.recipe.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/recipe-page")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

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

    @GetMapping("/views/{id}")
    public void setViewCount(@PathVariable Integer id) {
        recipeService.setViews(id);
    }

    @GetMapping("")
    public ResponseEntity<Map> getAllRecipes(@RequestParam(value = "p_num", required=false) Integer p_num) {
        if (p_num == null || p_num <= 0) p_num = 1;

        return recipeService.getPagingRecipe(p_num);
    }

    @GetMapping("/{category}")
    public ResponseEntity<Map> getRecipesByCate(@PathVariable String category,
                                                @RequestParam(value = "searchInput", required = false) String searchInput,
                                                @RequestParam(value = "p_num", required=false) Integer p_num) {
        if (p_num == null || p_num <= 0) p_num = 1;

        if (category.equals("전체") && searchInput.length() == 0) // 전체, 검색X
            return recipeService.getPagingRecipe(p_num);
        else if(category.equals("전체") && searchInput.length() != 0) // 전체, 검색O
            return recipeService.getPagingRecipeWithKeyword(searchInput, p_num);
        else if (searchInput.length() == 0) // 카테고리, 검색X
            return recipeService.getPagingRecipeCate(category, p_num);
        else // 카테고리, 검색O
            return recipeService.getPagingRecipeCateWithKeyword(category, searchInput, p_num);
    }

    @GetMapping("/{category1}/{category2}")
    public ResponseEntity<Map> getRecipesByCate1(@PathVariable String category1,
                                                 @PathVariable String category2,
                                                 @RequestParam(value = "searchInput", required = false) String searchInput,
                                                 @RequestParam(value = "p_num", required=false) Integer p_num) {
        if (p_num == null || p_num <= 0) p_num = 1;

        String category = category1 + "/" + category2;
        if (searchInput.length() == 0) // 검색X
            return recipeService.getPagingRecipeCate(category, p_num);
        else // 검색O
            return recipeService.getPagingRecipeCateWithKeyword(category, searchInput, p_num);
    }

    @GetMapping("/{category1}/{category2}/{category3}")
    public ResponseEntity<Map> getRecipesByCate2(@PathVariable String category1,
                                                 @PathVariable String category2,
                                                 @PathVariable String category3,
                                                 @RequestParam(value = "searchInput", required = false) String searchInput,
                                                 @RequestParam(value = "p_num", required=false) Integer p_num) {
        if (p_num == null || p_num <= 0) p_num = 1;

        String category = category1 + "/" + category2 + "/" + category3;

        if (searchInput.length() == 0) // 검색X
            return recipeService.getPagingRecipeCate(category, p_num);
        else // 검색O
            return recipeService.getPagingRecipeCateWithKeyword(category, searchInput, p_num);
    }
}
