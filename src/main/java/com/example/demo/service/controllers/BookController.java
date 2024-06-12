package com.example.demo.service.controllers;

import com.example.demo.model.entities.dataTransferObjects.BookData;
import com.example.demo.model.utils.BookFilterData;
import com.example.demo.model.validationGroups.BookFilterDataValidation;
import com.example.demo.model.views.BookFilterView;
import com.example.demo.service.controllers.services.BookService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @JsonView(BookFilterView.Catalog.class)
    @PostMapping("/getBooks")
    public Page<BookData> getBooks(@RequestBody @Validated(BookFilterDataValidation.Catalog.class) BookFilterData bookFilterData, Pageable pageable) {
        return bookService.getBooks(bookFilterData, pageable);
    }

    @JsonView(BookFilterView.Detail.class)
    @GetMapping("/getBook/{id}")
    public BookData getBook(@PathVariable Long id) {
        return bookService.getBook(id);
    }

    @PostMapping("/addBook")
    public ResponseEntity<String> addBooks(@RequestBody @Validated(BookFilterDataValidation.Creation.class) BookData bookData) {
        return bookService.addBooks(bookData);
    }

    @DeleteMapping("/withdrawnBook/{bookId}")
    public ResponseEntity<String> withdrawnBook(@PathVariable Long bookId) {
        return bookService.withdrawnBook(bookId);
    }
}
