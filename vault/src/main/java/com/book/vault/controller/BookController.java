package com.book.vault.controller;

import com.book.vault.model.Admin;
import com.book.vault.model.Book;
import com.book.vault.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vault")
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping(method = RequestMethod.GET, path = "/list")
    public ResponseEntity<List<Book>> list(){
        return new ResponseEntity<>(bookService.bookList(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/get/{id}")
    public ResponseEntity<Book> getById(@PathVariable Long id){
        return new ResponseEntity<>(bookService.getBookById(id), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/add")
    public ResponseEntity<Book> addBook(@RequestBody Book book){
        return new ResponseEntity<>(bookService.saveBook(book), HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id){
        bookService.deleteBookById(id);
        return new ResponseEntity<>("Book deleted successfully", HttpStatus.OK);
    }
}
