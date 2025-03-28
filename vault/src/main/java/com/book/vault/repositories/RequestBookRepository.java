package com.book.vault.repositories;

import com.book.vault.model.RequestBook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestBookRepository extends JpaRepository<RequestBook, Long> {

}
