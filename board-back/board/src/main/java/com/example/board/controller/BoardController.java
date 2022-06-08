package com.example.board.controller;

import com.example.board.model.Board;
import com.example.board.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class BoardController {

    @Autowired
    private BoardService boardService;

    /* 페이징 정보 포함한 모든 게시글 불러옴 */
    @GetMapping("/board")
    public ResponseEntity<Map> getAllBoards(@RequestParam(value = "p_num", required = false) Integer p_num) {
        if (p_num==null||p_num<=0) p_num = 1;

        return boardService.getPagingBoard(p_num);
    }

    /* 모든 게시글 불러옴 */
    @GetMapping("/board/all")
    public List<Board> getAllBoard(){
        return boardService.getAllBoard();
    }

    /* 게시글 검색 불러옴 */
    @GetMapping("/board/search")
    public ResponseEntity<Map> getSearchBoards(@RequestParam(value = "search", required = false) String search,
                                               @RequestParam(value = "p_num", required = false) Integer p_num){
        if(p_num==null||p_num<=0) p_num = 1;

        return boardService.getBoardKeyword(p_num, search);
    }

    /* 베스트 게시글 불러옴 */
    @GetMapping("/board/best")
    public List<Board> getBestBoards(){
        return boardService.getBestBoards();
    }

    /* 게시글 생성 */
    @PostMapping("/board")
    public Board createBoard(@RequestBody Board board){
        System.out.println("@PostMapping(\"/board\")");
        System.out.println(board.toString());
        return boardService.createBoard(board);
    }

    /* 게시글 상세 정보 조회 */
    @GetMapping("/board/{no}")
    public ResponseEntity<Board> getBoardByNo(@PathVariable Integer no){
        return boardService.getBoard(no);
    }

    /* 게시글 조회수 증가 */
    @PostMapping("/board/{no}")
    public void setCounts(@PathVariable Integer no){
        boardService.setCounts(no);
    }

    /* 게시글 수정 */
    @PutMapping("/board/{no}")
    public ResponseEntity<Board> updateBoardByNo(
            @PathVariable Integer no, @RequestBody Board board){
        return boardService.updateBoard(no, board);
    }

    /* 게시글 삭제 */
    @DeleteMapping("/board/{no}")
    public ResponseEntity<Map<String, Boolean>> deleteBoardByNo(
            @PathVariable Integer no){
        return boardService.deleteBoard(no);
    }

}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             