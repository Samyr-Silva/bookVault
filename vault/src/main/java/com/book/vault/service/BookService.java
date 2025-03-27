package com.book.vault.service;

import com.book.vault.model.Book;
import com.book.vault.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Book getBookById(Long id){
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("book not found"));
    }

    public List<Book> bookList(){
        return bookRepository.findAll();
    }

    public Book saveBook(Book book){
        bookRepository.save(book);
        return book;
    }

    public void deleteBookById(Long id){
        bookRepository.deleteById(id);
    }
}
