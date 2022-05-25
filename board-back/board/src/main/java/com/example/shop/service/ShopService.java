package com.example.shop.service;

import com.example.shop.exception.ResourceNotFoundException;
import com.example.shop.model.Product;
import com.example.shop.repository.ShopRepository;
import com.example.shop.util.PagingUtil;
import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.PumpStreamHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.JpaSort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.shop.model.Choice;

import javax.servlet.http.Cookie;
import java.io.*;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ShopService {

    @Autowired
    private ShopRepository shopRepository;

    public List<Choice> getChoices(Integer productId) {
        return shopRepository.findChoice(productId);
}

    public List<Product> getAllProduct() {
        return shopRepository.findAll();
    }
    public ResponseEntity<Product> getProduct(Integer productId) {
        Product product = shopRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Product Data by id : ["+productId+"]"));
        return ResponseEntity.ok(product);
    }

    public ResponseEntity<Map> getPagingProduct(Integer sort, Integer p_num) {
        Map result = null;

        PagingUtil pu = new PagingUtil(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

        Pageable sort_product = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("product_id"));
        Pageable sort_lowest = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("sold_price"));

        List<Product> list = sort ==0 ? shopRepository.findFromTo(sort_product)
                                        : shopRepository.findFromTo(sort_lowest);

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

    public ResponseEntity<Map> getPagingProductWithKeyword(String searchInput, Integer p_num, Integer sort) {
        Map result = null;

        PagingUtil pu = new PagingUtil(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

        Pageable sort_product = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("product_id"));
        Pageable sort_lowest = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("sold_price"));

        List<Product> list = sort == 0 ? shopRepository.findFromToWithKeyword(searchInput, sort_product)
                                        : shopRepository.findFromToWithKeyword(searchInput, sort_lowest);

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
    public ResponseEntity<Map> getPagingProductCate(String category, Integer p_num, Integer sort) {
        Map result = null;

        PagingUtil pu = new PagingUtil(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

        Pageable sort_product = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("product_id"));
        Pageable sort_lowest = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("sold_price"));

        List<Product> list = sort == 0 ? shopRepository.findFromToByCate(category, sort_product)
                                        : shopRepository.findFromToByCate(category, sort_lowest);

        pu.setObjectCountTotal(findCateCount(category));
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

    public ResponseEntity<Map> getPagingProductCateWithKeyword(String category, String searchInput, Integer p_num, Integer sort) {
        Map result = null;

        PagingUtil pu = new PagingUtil(p_num, 40, 10); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )

        Pageable sort_product = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("product_id"));
        Pageable sort_lowest = PageRequest.of(p_num-1, pu.getObjectCountPerPage(),Sort.by("sold_price"));

        List<Product> list = sort == 0 ? shopRepository.findFromToByCateWithKeyword(category, searchInput, sort_product)
                                        : shopRepository.findFromToByCateWithKeyword(category, searchInput, sort_lowest);
        pu.setObjectCountTotal(findCateCountWithKeyword(category, searchInput));
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
        return (int) shopRepository.count();
    }

    public int findCountWithKeyword(String searchInput) {
        return shopRepository.countWithKeyword(searchInput).intValue();
    }

    public int findCateCount(String category) {
        return shopRepository.countCate(category).intValue();
    }
    public int findCateCountWithKeyword(String category, String searchInput) {
        return shopRepository.countCateWithKeyword(category, searchInput).intValue();
    }

    public void writeLog(Cookie cookie, Integer id, long time) {

        String path = "./board/src/main/resources/ShopViewLog.txt";

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
        String path = "./board/src/main/resources/ShopSearchLog.txt";

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
                File file = new File("./board/src/main/resources/ShopViewLog.txt");
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
                command[1] = "./rec/ShopRec.py";
                command[2] = shopRepository.findNameById(id);
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
//            System.out.println("output: " + outputStream.toString());
//            System.out.println(outputStream.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
