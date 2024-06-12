package com.example.demo.model.entities;

import com.example.demo.model.validationGroups.BookFilterDataValidation;
import com.example.demo.model.views.RentalView;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "BOOKS")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOOK_ID")
    private Long id;

    @Column(name = "NAME", nullable = false, length = 255)
    private String name;

    @Column(name = "IMAGE_URL", length = 255)
    private String imageUrl = "book_default.jpg";

    @Lob
    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "ISBN_ISNN", length = 8)
    private String isbnIssn;

    @Column(name = "UKD", length = 255)
    private String ukd;

    @Column(name = "RELEASE_DATE")
    private LocalDateTime releaseDate;
    
    @Column(name = "IS_AVAILABLE", nullable = false)
    private Boolean isAvailable = true;

    @Column(name = "CREATED_AT", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "MODIFIED_AT", nullable = false)
    private LocalDateTime modifiedAt;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "BOOK_TYPES_BOOKS",
            joinColumns = @JoinColumn(name = "BOOK_ID"),
            inverseJoinColumns = @JoinColumn(name = "BOOK_TYPE_ID")
    )
    private List<BookType> bookTypes;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "CATEGORIES_BOOKS",
            joinColumns = @JoinColumn(name = "BOOK_ID"),
            inverseJoinColumns = @JoinColumn(name = "CATEGORY_ID")
    )
    private List<Category> categories;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "AUTHORS_BOOKS",
            joinColumns = @JoinColumn(name = "BOOK_ID"),
            inverseJoinColumns = @JoinColumn(name = "AUTHOR_ID")
    )
    private List<Author> authors;
}

