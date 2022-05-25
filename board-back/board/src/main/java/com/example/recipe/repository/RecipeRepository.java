package com.example.recipe.repository;

import com.example.recipe.model.Ingredient;
import com.example.recipe.model.Recipe;
import com.example.recipe.model.Step;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    public String SELECT_RECIPE = ""
            + "SELECT r FROM Recipe r";

    public String SELECT_RECIPE_NAME = ""
            + "SELECT r.name FROM Recipe r WHERE r.id=?1";

    public String SELECT_RECIPE_INGREDIENT = ""
            + "select i from Ingredient i where i.recipeId=:id and i.category=:category";

    public String SELECT_INGREDIENT_CATEGORY = ""
            + "select category from Ingredient where recipe_id=:id group by category";

    public String SELECT_RECIPE_STEP = ""
            + "select s from Step s where s.recipeId=:id";

    public String SELECT_RECIPE_LIST_PAGED =
            "SELECT * FROM Recipe ORDER BY id ASC LIMIT ?1, ?2";

    public String SELECT_RECIPE_CATE_LIST_PAGED =
            "SELECT * FROM Recipe WHERE category=?1 ORDER BY id ASC LIMIT ?2, ?3";

    public String SELECT_RECIPE_CATE_MULT_LIST_PAGED =
            "SELECT * FROM Recipe WHERE category=?1 or category=?2 or category=?3 ORDER BY id ASC LIMIT ?4, ?5";

    public String SELECT_COUNT_RECIPE_CATE_LIST =
            "SELECT count(r) FROM Recipe r WHERE category=:category ORDER BY id";

    // 전체(검색 포함)
    public String SELECT_RECIPE_LIST_PAGED_WITH_KEYWORD =
            "SELECT * FROM Recipe "
                    + "WHERE id in "
                    + "(SELECT DISTINCT r.id FROM Recipe r join Ingredient i on r.id=i.recipe_id "
                    + "WHERE r.name LIKE %?1% or i.name LIKE %?1%) "
                    + "ORDER BY id ASC LIMIT ?2, ?3";
    public String SELECT_COUNT_RECIPE_LIST_WITH_KEYWORD =
            "SELECT count(rc) FROM Recipe rc "
                    + "WHERE id in "
                    + "(SELECT DISTINCT r.id FROM Recipe r join Ingredient i on r.id=i.recipeId "
                    + "WHERE r.name LIKE %:searchInput% or i.name LIKE %:searchInput%) "
                    + "ORDER BY rc.id";

    // like 써서 검색
    public String SELECT_RECIPE_CATE_LIST_PAGED_WITH_KEYWORD =
            "SELECT * FROM Recipe "
                    + "WHERE id in "
                    + "(SELECT DISTINCT r.id FROM Recipe r join Ingredient i on r.id=i.recipe_id "
                    + "WHERE r.category=?1 and r.name LIKE %?2% or i.name LIKE %?2%) "
                    + "ORDER BY id ASC LIMIT ?3, ?4";
    public String SELECT_COUNT_RECIPE_CATE_LIST_WITH_KEYWORD =
            "SELECT count(rc) FROM Recipe rc "
                    + "WHERE id in "
                    + "(SELECT DISTINCT r.id FROM Recipe r join Ingredient i on r.id=i.recipeId "
                    + "WHERE r.category=:category and r.name LIKE %:searchInput% or i.name LIKE %:searchInput%) "
                    + "ORDER BY rc.id";

    // category 3개인 빵/디저트/과자에서 검색
    public String SELECT_RECIPE_CATE_LIST_PAGED_WITH_KEYWORD_MULT =
            "SELECT * FROM "
                    +"(SELECT * FROM Recipe WHERE category=?1 or category=?2 or category=?3) rc "
                    +"WHERE rc.id in "
                    +"(SELECT DISTINCT r.id FROM Recipe r join Ingredient i on r.id=i.recipe_id "
                    +"WHERE r.name LIKE %?4% or i.name LIKE %?4%) "
                    +"ORDER BY rc.id ASC LIMIT ?5, ?6";
    public String SELECT_COUNT_RECIPE_CATE_LIST_WITH_KEYWORD_MULT =
            "SELECT count(*) FROM "
                    +"(SELECT * FROM Recipe WHERE category=?1 or category=?2 or category=?3) rc "
                    +"WHERE rc.id in "
                    +"(SELECT DISTINCT r.id FROM Recipe r join Ingredient i on r.id=i.recipe_id "
                    +"WHERE r.name LIKE %?4% or i.name LIKE %?4%) "
                    +"ORDER BY rc.id";

    public String ADD_VIEW_COUNT =
            "UPDATE Recipe r " +
                    "SET r.views = r.views + 1 " +
                    "WHERE r.id=?1";

    // recipe + ingredient 검색 test
//    public String SELECT_TEST =
//            "SELECT * FROM Recipe "
//                    + "WHERE id in "
//                    + "(SELECT DISTINCT r.id "
//                    + "FROM Recipe r join Ingredient i "
//                    + "on r.id=i.recipe_id " + "WHERE r.name LIKE %?1% or i.name LIKE %?1%)";

    @Query(value = SELECT_RECIPE)
    List<Recipe> findAllRecipe();

    @Query(value = SELECT_RECIPE_INGREDIENT)
    List<Ingredient> findIgreById(@Param("id") Integer id, @Param("category") String category);

    @Query(value = SELECT_INGREDIENT_CATEGORY)
    List<String> findIngreCate(@Param("id") Integer id);

    @Query(value = SELECT_RECIPE_STEP)
    List<Step> findStById(@Param("id") Integer id);

    @Query(value = SELECT_RECIPE_LIST_PAGED, nativeQuery = true)
    List<Recipe> findFromTo(final Integer objectStartNum,
                            final Integer objectCountPerPage);

    @Query(value = SELECT_RECIPE_CATE_LIST_PAGED, nativeQuery = true)
    List<Recipe> findFromToByCate(final String category,
                                  final Integer objectStartNum,
                                  final Integer objectCountPerPage);

    @Query(value = SELECT_COUNT_RECIPE_CATE_LIST)
    Long countCate(@Param("category") String category);

    @Query(value = SELECT_RECIPE_CATE_MULT_LIST_PAGED, nativeQuery = true)
    List<Recipe> findFromToByCateMult(final String category1,
                                  final String category2,
                                  final String category3,
                                  final Integer objectStartNum,
                                  final Integer objectCountPerPage);

    // 전체 (검색 포함)
    @Query(value = SELECT_RECIPE_LIST_PAGED_WITH_KEYWORD, nativeQuery = true)
    List<Recipe> findFromToWithKeyword(final String searchInput,
                                       final Integer objectStartNum,
                                       final Integer objectCountPerPage);
    @Query(value = SELECT_COUNT_RECIPE_LIST_WITH_KEYWORD)
    Long countWithKeyword(@Param("searchInput") String searchInput);

    // 카테고리(검색 추가)
    @Query(value = SELECT_RECIPE_CATE_LIST_PAGED_WITH_KEYWORD, nativeQuery = true)
    List<Recipe> findFromToByCateWithKeyword(final String category,
                                             final String searchInput,
                                             final Integer objectStartNum,
                                             final Integer objectCountPerPage);
    @Query(value = SELECT_COUNT_RECIPE_CATE_LIST_WITH_KEYWORD)
    Long countCateWithKeyword(@Param("category") String category, @Param("searchInput") String searchInput);

    @Query(value = SELECT_RECIPE_CATE_LIST_PAGED_WITH_KEYWORD_MULT, nativeQuery = true)
    List<Recipe> findFromToByCateWithKeywordMult(final String category1,
                                                 final String category2,
                                                 final String category3,
                                                 final String searchInput,
                                                 final Integer objectStartNum,
                                                 final Integer objectCountPerPage);
    @Query(value = SELECT_COUNT_RECIPE_CATE_LIST_WITH_KEYWORD_MULT, nativeQuery = true)
    Long countCateWithKeywordMult(final String category1,
                                  final String category2,
                                  final String category3,
                                  final String searchInput);

    // 조회수 + 1
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = ADD_VIEW_COUNT, nativeQuery = true)
    Integer addViewCount(final Integer id);

    @Query(value = SELECT_RECIPE_NAME, nativeQuery = true)
    String findNameById(Integer id);
}
