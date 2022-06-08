package com.example.board.controller;

import com.example.board.model.Diary;
import com.example.board.service.DiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class DiaryController {

    @Autowired
    private DiaryService diaryService;

    /* 페이징 정보 포함한 모든 게시글 불러옴 */
    @GetMapping("/diary")
    public ResponseEntity<Map> getAllBoards(@RequestParam(value = "p_num", required = false) Integer p_num) {
        if (p_num==null||p_num<=0) p_num = 1;

        return diaryService.getPagingBoard(p_num);
    }

    /* 모든 게시글 불러옴 */
    @GetMapping("/diary/all")
    public List<Diary> getAllDiary(){
        return diaryService.getAllDiary();
    }

    /* 게시글 검색 불러옴 */
    @GetMapping("/diary/search")
    public ResponseEntity<Map> getSearchDiarys(@RequestParam(value = "search", required = false) String search,
                                               @RequestParam(value = "p_num", required = false) Integer p_num){
        if(p_num==null||p_num<=0) p_num = 1;

        return diaryService.getBoardKeyword(p_num, search);
    }

    /* 베스트 게시글 불러옴 */
    @GetMapping("/diary/best")
    public List<Diary> getBestBoards(){
        return diaryService.getBestBoards();
    }

    /* 게시글 생성 */
    @PostMapping("/diary")
    public Diary createBoard(@RequestBody Diary board){
        System.out.println("@PostMapping(\"/diary\")");
        System.out.println(board.toString());
        return diaryService.createBoard(board);
    }

    /* 게시글 상세 정보 조회 */
    @GetMapping("/diary/{no}")
    public ResponseEntity<Diary> getBoardByNo(@PathVariable Integer no){
        return diaryService.getBoard(no);
    }

    /* 게시글 조회수 증가 */
    @PostMapping("/diary/{no}")
    public void setCounts(@PathVariable Integer no){
        diaryService.setCounts(no);
    }

    /* 게시글 수정 */
    @PutMapping("/diary/{no}")
    public ResponseEntity<Diary> updateBoardByNo(
            @PathVariable Integer no, @RequestBody Diary board){
        return diaryService.updateBoard(no, board);
    }

    /* 게시글 삭제 */
    @DeleteMapping("/diary/{no}")
    public ResponseEntity<Map<String, Boolean>> deleteBoardByNo(
            @PathVariable Integer no){
        return diaryService.deleteBoard(no);
    }

}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             