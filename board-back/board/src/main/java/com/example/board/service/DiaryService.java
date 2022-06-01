package com.example.board.service;

import com.example.board.exception.ResourceNotFoundException;
import com.example.board.model.Diary;
import com.example.board.repository.DiaryRepository;
import com.example.board.util.PagingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DiaryService {

    @Autowired
    private DiaryRepository diaryRepository;

    public int findAllCount(){
        return (int) diaryRepository.count();
    }

    public ResponseEntity<Map> getPagingBoard(Integer p_num) {
        Map result = null;

        PagingUtil pu = new PagingUtil(p_num, 10, 5);
        List<Diary> list = diaryRepository.findFromTo(pu.getObjectStartNum(), pu.getObjectCountPerPage());
        pu.setObjectCountTotal(findAllCount());
        pu.setCalcForPaging();

        System.out.println("p_num : " + p_num);
        System.out.println(pu.toString());

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }

//    public List<Board> getAllBoard() {
//        return boardRepository.findAll();
//    }

    public Diary createBoard(Diary diary) {
        return diaryRepository.save(diary);
    }

    public ResponseEntity<Diary> getBoard(Integer no) {
        Diary diary = diaryRepository.findById(no)
                .orElseThrow(()->new ResourceNotFoundException("Not exist Diary Data by no : ["+no+"]"));
        return ResponseEntity.ok(diary);
    }

    public ResponseEntity<Diary> updateBoard(Integer no, Diary updatedBoard) {
        Diary diary = diaryRepository.findById(no)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Diary Data by no : [" + no + "]"));
        diary.setTitle(updatedBoard.getTitle());
        diary.setContents(updatedBoard.getContents());
        diary.setUpdatedTime(new Date());

        Diary endUpdatedBoard = diaryRepository.save(diary);
        return ResponseEntity.ok(endUpdatedBoard);
    }

    public ResponseEntity<Map<String, Boolean>> deleteBoard(Integer no) {
        Diary diary = diaryRepository.findById(no)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Diary Data by no : [" + no + "]"));

        diaryRepository.delete(diary);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted Diary Data by id : [" + no + "]", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
