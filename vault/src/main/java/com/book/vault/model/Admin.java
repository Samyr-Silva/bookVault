package com.book.vault.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
}
