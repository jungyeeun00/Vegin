package com.example.board.service;

import com.example.board.exception.ResourceNotFoundException;
import com.example.board.model.Board;
import com.example.board.repository.BoardRepository;
import com.example.board.util.PagingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    /* 전체 게시글 수 */
    public int findAllCount(){
        return (int)boardRepository.count();
    }

    /* 페이징 정보 포함한 게시글 조회 */
    public ResponseEntity<Map> getPagingBoard(Integer p_num) {
        Map result = null;

        PagingUtil pu = new PagingUtil(p_num, 10, 5);
        List<Board> list = boardRepository.findFromTo(pu.getObjectStartNum(), pu.getObjectCountPerPage());
        pu.setObjectCountTotal(findAllCount());
        pu.setCalcForPaging();

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
        List<Board> list = boardRepository.findBoardByTitle(search, pu.getObjectStartNum(), pu.getObjectCountPerPage());
        pu.setObjectCountTotal(Math.toIntExact(boardRepository.countBoardsByTitleContains(search)));
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
    public List<Board> getAllBoard() {
        return boardRepository.findAll();
    }

    /* 인기글 조회 */
    public List<Board> getBestBoards() {
        return boardRepository.findTopByCounts();
    }

    /* 조회수 증가 */
    @Transactional
    public void setCounts(Integer no){
        boardRepository.addCounts(no);
    }

    /* 게시글 생성 */
    public Board createBoard(Board board) { return boardRepository.save(board); }

    /* 게시글 상세 조회 */
    public ResponseEntity<Board> getBoard(Integer no) {
        Board board = boardRepository.findById(no)
                .orElseThrow(()->new ResourceNotFoundException("Not exist Board Data by no : ["+no+"]"));
        return ResponseEntity.ok(board);
    }

    /* 게시글 수정 */
    public ResponseEntity<Board> updateBoard(Integer no, Board updatedBoard) {
        Board board = boardRepository.findById(no)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by no : [" + no + "]"));
        board.setTitle(updatedBoard.getTitle());
        board.setContents(updatedBoard.getContents());
        board.setUpdatedTime(new Date());

        Board endUpdatedBoard = boardRepository.save(board);
        return ResponseEntity.ok(endUpdatedBoard);
    }

    /* 게시글 삭제 */
    public ResponseEntity<Map<String, Boolean>> deleteBoard(Integer no) {
        Board board = boardRepository.findById(no)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by no : [" + no + "]"));

        boardRepository.delete(board);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted Board Data by id : [" + no + "]", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
