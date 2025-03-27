package com.book.vault.repositories;

import com.book.vault.model.Favorite;
import com.book.vault.model.Reader;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByReader(Reader reader);
}
