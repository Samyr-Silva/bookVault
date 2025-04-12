package com.book.vault.repositories;

import com.book.vault.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByNameAndEmail(String name, String email);
}
