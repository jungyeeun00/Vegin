package com.example.board.service;

import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.PumpStreamHandler;

import com.example.board.model.Recipe;
import com.example.board.model.Step;
import com.example.board.repository.RecipeRepository;
import com.example.board.util.PagingUtil2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import java.io.*;
import java.util.*;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    /* 레시피별 재료 */
    public ResponseEntity<HashMap<String, Object>> getIngredient(Integer id) {
        HashMap<String, Object> ingredient = new HashMap<String, Object>();
        List<String> categories = recipeRepository.findIgrCate(id);
        for(String category : categories) {
            ingredient.put(category, recipeRepository.findIgrById(id, category));
        }

        return ResponseEntity.ok(ingredient);
    }

    /* 조리단계 */
    public ResponseEntity<List<Step>> getStep(Integer id) {
        return ResponseEntity.ok(recipeRepository.findStById(id));
    }

    /* 조회수 증가 */
    public void setViews(Integer id) {
        recipeRepository.addViewCount(id);
    }

    /* featured 4개 레시피 */
    public ResponseEntity<List<Recipe>> getFeatured() {
        Pageable page = PageRequest.of(0, 4, Sort.by("views").descending());
        List<Recipe> list = recipeRepository.findR(page);
        return ResponseEntity.ok(list);
    }

    /* 페이지별 전체 레시피 */
    public ResponseEntity<Map> getRecipe(Integer sort, Integer p_num) {
        Map result = null;

        PagingUtil2 pu = new PagingUtil2(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

        Pageable sort_recipe = PageRequest.of(p_num-1, pu.getObjectCountPerPage(), Sort.by("id")); // 등록된 순(id순) 정렬
        Pageable sort_popular = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("views").descending()); // 조회수 순 정렬

        List<Recipe> list = sort ==0 ? recipeRepository.findR(sort_recipe)
                : recipeRepository.findR(sort_popular);

        pu.setObjectCountTotal(getAllCount());
        pu.setCalcForPaging();

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap<>();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }

    /* 카테고리별 레시피 */
    public ResponseEntity<Map> getRecipeCate(Integer sort, String category, Integer p_num) {
        Map result = null;
        List<Recipe> list;

        PagingUtil2 pu = new PagingUtil2(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

        Pageable sort_recipe = PageRequest.of(p_num-1, pu.getObjectCountPerPage(), Sort.by("id")); // 등록된 순(id순) 정렬
        Pageable sort_popular = PageRequest.of(p_num-1, pu.getObjectCountPerPage(), Sort.by("views").descending()); // 조회수 순 정렬

        if(category.equals("빵/디저트/과자")) { // 각자 다른 카테고리 합친거라서 모든 카테고리 결과 찾아줘야함
            list = sort ==0 ? recipeRepository.findRCateM("빵", "디저트", "과자", sort_recipe) : recipeRepository.findRCateM("빵", "디저트", "과자", sort_popular);
            pu.setObjectCountTotal(getCateCount("빵") + getCateCount("디저트") + getCateCount("과자"));
        }
        else {
            list = sort ==0 ? recipeRepository.findRCate(category, sort_recipe) : recipeRepository.findRCate(category, sort_popular);
            pu.setObjectCountTotal(getCateCount(category));
        }
        pu.setCalcForPaging();

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap<>();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }

    /* 검색된 전체 레시피 */
    public ResponseEntity<Map> getRecipeKeyword(Integer sort, String searchInput, Integer p_num) {
        Map result = null;

        PagingUtil2 pu = new PagingUtil2(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

        Pageable sort_recipe = PageRequest.of(p_num-1, pu.getObjectCountPerPage(), Sort.by("id")); // 등록된 순(id순) 정렬
        Pageable sort_popular = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("views").descending()); // 조회수 순 정렬

        List<Recipe> list = sort ==0 ? recipeRepository.findRKeyword(searchInput, sort_recipe) : recipeRepository.findRKeyword(searchInput, sort_popular);
        pu.setObjectCountTotal(getCountKeyword(searchInput));
        pu.setCalcForPaging();

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap<>();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }

    /* 카테고리별 검색된 레시피 */
    public ResponseEntity<Map> getRecipeCateKeyword(Integer sort, String category, String searchInput, Integer p_num) {
        Map result = null;
        List<Recipe> list;

        PagingUtil2 pu = new PagingUtil2(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

        Pageable sort_recipe = PageRequest.of(p_num-1, pu.getObjectCountPerPage(), Sort.by("id")); // 등록된 순(id순) 정렬
        Pageable sort_popular = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("views").descending()); // 조회수 순 정렬

        if(category.equals("빵/디저트/과자")) { // 각자 다른 카테고리 합친거라서 모든 카테고리 결과 찾아줘야함
            list = sort ==0 ? recipeRepository.findRCateKeywordM("빵", "디저트", "과자", searchInput, sort_recipe) : recipeRepository.findRCateKeywordM("빵", "디저트", "과자", searchInput, sort_popular);
            pu.setObjectCountTotal(getCateCountKeywordM("빵", "디저트","과자",searchInput));
        }
        else {
            list = sort ==0 ? recipeRepository.findRCateKeyword(category, searchInput, sort_recipe) : recipeRepository.findRCateKeyword(category, searchInput, sort_popular);
            pu.setObjectCountTotal(getCateCountKeyword(category, searchInput));
        }
        pu.setCalcForPaging();

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap<>();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }

    /* 전체 레시피 개수 */
    public int getAllCount() {
        return (int) recipeRepository.count();
    }

    /* 카테고리별 레시피 개수 */
    public int getCateCount(String category) {
        return recipeRepository.countCate(category).intValue();
    }

    /* 검색된 전체 레시피 개수 */
    public int getCountKeyword(String searchInput) {
        return recipeRepository.countKeyword(searchInput).intValue();
    }

    /* 검색된 카테고리별 레시피 개수 */
    public int getCateCountKeyword(String category, String searchInput) {
        return recipeRepository.countCateKeyword(category, searchInput).intValue();
    }

    /* 검색된 카테고리(3개짜리) 레시피 개수 */
    public int getCateCountKeywordM(String category1, String category2, String category3, String searchInput) {
        return recipeRepository.countCateKeywordM(category1, category2, category3, searchInput).intValue();
    }

    /* 조회 로그 기록 */
    public void writeLog(Cookie cookie, Integer id, long time) {

        String path = "/Users/jeong-yeeun/Documents/Vegin/Vegin/board-back/board/src/main/resources/RecipeViewLog.txt";

        try {
            File file = new File(path);
            FileWriter fw = new FileWriter(file, true);
            BufferedWriter writer = new BufferedWriter(fw);
            writer.write(cookie.getValue() + "\t" + id + "\t" + time + "\n");
            writer.flush();
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /* 검색 로그 기록 */
    public void writeLog(Cookie cookie, String keyword, long time) {
        String path = "/Users/jeong-yeeun/Documents/Vegin/Vegin/board-back/board/src/main/resources/RecipeSearchLog.txt";
        try {
            File file = new File(path);
            FileWriter fw = new FileWriter(file, true);
            BufferedWriter writer = new BufferedWriter(fw);
            writer.write(cookie.getValue() + "\t" + keyword + "\t" + time + "\n");
            writer.flush();
            writer.close();
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    /* 추천 리스트 받아오기 */
    public List<Recipe> recommend(String value) {
        List<Recipe> list = new ArrayList<>();

        if(value == null) { // 쿠키 없을 경우 랜덤으로 8개 추천
            for(int i=0; i<8; i++) {
                double randomValue = Math.random();
                int intValue = (int) (randomValue * getAllCount()) + 1;
                list.add(recipeRepository.findById(intValue).get());
            }
        }
        else {
            try{
                /* viewlog 파일에서 가장 최근 기록된 로그의 id를 찾음 */
                File file = new File("/Users/jeong-yeeun/Documents/Vegin/Vegin/board-back/board/src/main/resources/RecipeViewLog.txt");
                FileReader filereader = new FileReader(file);
                BufferedReader bufReader = new BufferedReader(filereader);
                String line = "";
                String id = "";
                Long time = 0L;
                while((line = bufReader.readLine()) != null){
                    String[] array = line.split("\t");
                    if(array[0].equals(value) && Long.parseLong(array[2]) > time)
                        id = array[1];
                }
                bufReader.close();

                /* 파이썬과 연동하여 추천리스트 받아오기 */
                String[] command = new String[3];
                command[0] = "python3";
                command[1] = "/Users/jeong-yeeun/Documents/Vegin/Vegin/board-back/recipeRec/RecipeRec.py";
                command[2] = id;

                String[] idList;
                idList = execPython(command);
                for(String i:idList)
                    list.add(recipeRepository.findById(Integer.parseInt(i)).get());

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return list;
    }

    /* 추천 시스템 파이썬 코드 실행 */
    public static String[] execPython(String[] command) {
        String[] split = new String[0];
        try {
            CommandLine commandLine = CommandLine.parse(command[0]);
            for (int i = 1, n = command.length; i < n; i++) {
                commandLine.addArgument(command[i]);
            }
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PumpStreamHandler pumpStreamHandler = new PumpStreamHandler(outputStream);
            DefaultExecutor executor = new DefaultExecutor();
            executor.setStreamHandler(pumpStreamHandler);
            int result = executor.execute(commandLine);
            String line = new String(outputStream.toByteArray());

            /* 문자열로 받아온 결과 배열로 만들어서 return */
            split = line.split(",");
            for(int i = 0; i < 8; i++) {
                split[i] = split[i].replaceAll("[^0-9]", "");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return split;
    }
}
