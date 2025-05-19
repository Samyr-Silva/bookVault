package com.book.vault.service;

import com.book.vault.model.Book;
import com.book.vault.model.Favorite;
import com.book.vault.model.Reader;
import com.book.vault.repositories.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private ReaderService readerService;

    @Autowired
    private BookService bookService;

    public String favoriteBook(Long readerId, Long bookId) {
        Reader reader = readerService.getReaderById(readerId);
        Book book = bookService.getBookById(bookId);

        if (reader != null && book != null) {
            Favorite favorite = new Favorite(reader, book);
            favoriteRepository.save(favorite);
            return "book added to favorite section!";
        }
        return "Reader or book not found!";
    }

    public List<Favorite> listFavorites(Long readerId) {
        Reader reader = readerService.getReaderById(readerId);
        if (reader != null) {
            List<Favorite> favorites = favoriteRepository.findByReader(reader);
            return favorites;
        }
        return null;
    }
}
