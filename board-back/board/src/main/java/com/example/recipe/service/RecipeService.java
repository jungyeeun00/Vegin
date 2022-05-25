package com.example.recipe.service;

import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.PumpStreamHandler;

import com.example.recipe.model.Recipe;
import com.example.recipe.model.Step;
import com.example.recipe.repository.RecipeRepository;
import com.example.recipe.util.PagingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import java.io.*;
import java.util.*;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> getAllRecipe(){
        return recipeRepository.findAllRecipe();
    }

    public HashMap<String, Object> getIngredient(Integer id) {
        HashMap<String, Object> ingredient = new HashMap<String, Object>();
        List<String> categories = recipeRepository.findIngreCate(id);
        for(String category : categories) {
            ingredient.put(category, recipeRepository.findIgreById(id, category));
        }

        return ingredient;
    }

    public List<Step> getStep(Integer id) {
       return recipeRepository.findStById(id);
    }

    public void setViews(Integer id) {
        recipeRepository.addViewCount(id);
    }

    public ResponseEntity<Map> getPagingRecipe(Integer p_num) {
        Map result = null;

        PagingUtil pu = new PagingUtil(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )
        List<Recipe> list = recipeRepository.findFromTo(pu.getObjectStartNum(), pu.getObjectCountPerPage());
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

    public int findAllCount() {
        return (int) recipeRepository.count();
    }

    public ResponseEntity<Map> getPagingRecipeCate(String category, Integer p_num) {
        Map result = null;
        List<Recipe> list;

        PagingUtil pu = new PagingUtil(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )
        if(category.equals("빵/디저트/과자")) {
            list = recipeRepository.findFromToByCateMult("빵", "디저트", "과자", pu.getObjectStartNum(), pu.getObjectCountPerPage());
            pu.setObjectCountTotal(findCateCount("빵") + findCateCount("디저트") + findCateCount("과자"));
        }
        else {
            list = recipeRepository.findFromToByCate(category, pu.getObjectStartNum(), pu.getObjectCountPerPage());
            pu.setObjectCountTotal(findCateCount(category));
        }
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

    public int findCateCount(String category) {
        return recipeRepository.countCate(category).intValue();
    }

    public ResponseEntity<Map> getPagingRecipeWithKeyword(String searchInput, Integer p_num) {
        Map result = null;

        PagingUtil pu = new PagingUtil(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )
        List<Recipe> list = recipeRepository.findFromToWithKeyword(searchInput, pu.getObjectStartNum(), pu.getObjectCountPerPage());
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

    public ResponseEntity<Map> getPagingRecipeCateWithKeyword(String category, String searchInput, Integer p_num) {
        Map result = null;
        List<Recipe> list;

        PagingUtil pu = new PagingUtil(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )
        if(category.equals("빵/디저트/과자")) {
            list = recipeRepository.findFromToByCateWithKeywordMult("빵", "디저트", "과자", searchInput, pu.getObjectStartNum(), pu.getObjectCountPerPage());
            pu.setObjectCountTotal(findCateCountWithKeywordMult("빵", "디저트","과자",searchInput));
        }
        else {
            list = recipeRepository.findFromToByCateWithKeyword(category, searchInput, pu.getObjectStartNum(), pu.getObjectCountPerPage());
            pu.setObjectCountTotal(findCateCountWithKeyword(category, searchInput));
        }
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

    public int findCountWithKeyword(String searchInput) {
        return recipeRepository.countWithKeyword(searchInput).intValue();
    }

    public int findCateCountWithKeyword(String category, String searchInput) {
        return recipeRepository.countCateWithKeyword(category, searchInput).intValue();
    }

    public int findCateCountWithKeywordMult(String category1, String category2, String category3, String searchInput) {
        return recipeRepository.countCateWithKeywordMult(category1, category2, category3, searchInput).intValue();
    }

    public void writeLog(Cookie cookie, Integer id, long time) {

        String path = "./board/src/main/resources/ViewLog.txt";

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

    public void writeLog(Cookie cookie, String keyword, long time) {
        String path = "./board/src/main/resources/SearchLog.txt";
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

    public void recommend(String value) {
        if(value == null) {
            System.out.println("no recommendation : cookie is null");
        }
        else {
            try{
                //파일 객체 생성
                File file = new File("./board/src/main/resources/ViewLog.txt");
                //입력 스트림 생성
                FileReader filereader = new FileReader(file);
                //입력 버퍼 생성
                BufferedReader bufReader = new BufferedReader(filereader);
                String line = "";
                int id = 0;
                Long time = 0L;
                while((line = bufReader.readLine()) != null){
                    String[] array = line.split("\t");
                    if(array[0].equals(value) && Long.parseLong(array[2]) > time)
                        id = Integer.parseInt(array[1]);
                }
                //.readLine()은 끝에 개행문자를 읽지 않는다.
                bufReader.close();

                String[] command = new String[3];
                command[0] = "python";
                command[1] = "./recipeRec/RecipeRec.py";
                command[2] = recipeRepository.findNameById(id);
                execPython(command);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public static void execPython(String[] command) {
        try {
            CommandLine commandLine = CommandLine.parse(command[0]);
            for (int i = 1, n = command.length; i < n; i++) {
                commandLine.addArgument(command[i]);
            }
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PumpStreamHandler pumpStreamHandler = new PumpStreamHandler(outputStream);
//            PumpStreamHandler pumpStreamHandler = new PumpStreamHandler(System.out);
            DefaultExecutor executor = new DefaultExecutor();
            executor.setStreamHandler(pumpStreamHandler);
            int result = executor.execute(commandLine);
            System.out.println("output: " + outputStream.toString());
//            System.out.println(Arrays.toString(outputStream.toByteArray()));
//            System.out.println(outputStream.toByteArray());
//            String line = new String(outputStream.toByteArray());
//            String[] split = line.split(System.lineSeparator());
//            for(String name: split)
//                System.out.println(name);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
