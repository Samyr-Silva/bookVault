package com.book.vault.repositories;

import com.book.vault.model.Reader;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReaderRepository extends JpaRepository<Reader, Long> {
    Reader findByNameAndEmail(String name, String email);
}
