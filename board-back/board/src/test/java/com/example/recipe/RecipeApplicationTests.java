package com.example.recipe;

import com.example.board.repository.RecipeRepository;
import com.example.board.service.RecipeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class RecipeApplicationTests {

	@Autowired
	private RecipeService recipeService;

	@Autowired
	private RecipeRepository recipeRepository;

	@Test
	void contextLoads() {
//		recipeRepository.findFromToWithKeyword("가지", 1, 40);
//		recipeRepository.addViewCount(1);
	}

}
