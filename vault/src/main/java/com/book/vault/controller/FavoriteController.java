package com.book.vault.controller;

import com.book.vault.model.Book;
import com.book.vault.model.Favorite;
import com.book.vault.model.Reader;
import com.book.vault.repositories.FavoriteRepository;
import com.book.vault.service.BookService;
import com.book.vault.service.FavoriteService;
import com.book.vault.service.ReaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/fav")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;


    @RequestMapping(method = RequestMethod.POST, path = "/{readerId}/add/{bookId}")
    public ResponseEntity<String> favoriteBook(@PathVariable Long readerId, @PathVariable Long bookId) {
        return new ResponseEntity<>(favoriteService.favoriteBook(readerId, bookId), HttpStatus.OK);
    }


    // 📌 Listar livros favoritos de um usuário
    @RequestMapping(method = RequestMethod.GET, path = "/{readerId}/list")
    public ResponseEntity<List<Favorite>> listFavorites(@PathVariable Long readerId) {
        List<Favorite> favs = favoriteService.listFavorites(readerId);
        if(!favs.isEmpty()){
            return new ResponseEntity<>(favs, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
