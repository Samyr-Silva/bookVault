package com.book.vault.controller;

import com.book.vault.model.Reader;
import com.book.vault.service.ReaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class ReaderController {

    @Autowired
    private ReaderService readerService;

    @RequestMapping(method = RequestMethod.GET, path = "/list")
    public ResponseEntity<List<Reader>> list(){
        return new ResponseEntity<>(readerService.readerList(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/get/{id}")
    public ResponseEntity<Reader> getById(@PathVariable Long id){
        return new ResponseEntity<>(readerService.getReaderById(id), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/add")
    public ResponseEntity<Reader> addReader(@RequestBody Reader reader) {
        Reader reader1 = readerService.addReader(reader);
        return new ResponseEntity<>(reader1, HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id){
        readerService.deleteReaderById(id);
        return new ResponseEntity<>("Reader deleted sucssecifully", HttpStatus.OK);
    }
}
