package com.example.board.service;

import com.example.board.exception.ResourceNotFoundException;
import com.example.board.model.Diary;
import com.example.board.repository.DiaryRepository;
import com.example.board.util.PagingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DiaryService {

    @Autowired
    private DiaryRepository diaryRepository;

    /* 전체 게시글 수 */
    public int findAllCount(){
        return (int) diaryRepository.count();
    }

    /* 페이징 정보 포함한 게시글 조회 */
    public ResponseEntity<Map> getPagingBoard(Integer p_num, String date) {
        Map result = null;
        System.out.println("date="+date);

        PagingUtil pu = new PagingUtil(p_num, 10, 5);
        List<Diary> list = diaryRepository.findFromTo(date, pu.getObjectStartNum(), pu.getObjectCountPerPage());
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

    /* 검색된 게시글 조회 */
    public ResponseEntity<Map> getBoardKeyword(Integer p_num, String search){
        Map result = null;

        PagingUtil pu = new PagingUtil(p_num, 10, 5);
        List<Diary> list = diaryRepository.findBoardByTitle(search, pu.getObjectStartNum(), pu.getObjectCountPerPage());
        pu.setObjectCountTotal(Math.toIntExact(diaryRepository.countBoardsByTitleContains(search)));
        pu.setCalcForPaging();

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }

    /* 전체 게시글 조회 */
    public List<Diary> getAllDiary() {
        return diaryRepository.findAll();
    }

    /* 인기글 조회 */
    public List<Diary> getBestBoards() {
        return diaryRepository.findTopByCounts();
    }

    /* 조회수 증가 */
    @Transactional
    public void setCounts(Integer no){
        diaryRepository.addCounts(no);
    }

    /* 게시글 생성 */
    public Diary createBoard(Diary diary) {
        return diaryRepository.save(diary);
    }

    /* 게시글 상세 조회 */
    public ResponseEntity<Diary> getBoard(Integer no) {
        Diary diary = diaryRepository.findById(no)
                .orElseThrow(()->new ResourceNotFoundException("Not exist Diary Data by no : ["+no+"]"));
        return ResponseEntity.ok(diary);
    }

    /* 게시글 수정 */
    public ResponseEntity<Diary> updateBoard(Integer no, Diary updatedBoard) {
        Diary diary = diaryRepository.findById(no)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Diary Data by no : [" + no + "]"));
        diary.setTitle(updatedBoard.getTitle());
        diary.setContents(updatedBoard.getContents());
        diary.setUpdatedTime(new Date());

        Diary endUpdatedBoard = diaryRepository.save(diary);
        return ResponseEntity.ok(endUpdatedBoard);
    }

    /* 게시글 삭제 */
    public ResponseEntity<Map<String, Boolean>> deleteBoard(Integer no) {
        Diary diary = diaryRepository.findById(no)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Diary Data by no : [" + no + "]"));

        diaryRepository.delete(diary);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted Diary Data by id : [" + no + "]", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
