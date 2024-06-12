package com.example.demo.service.controllers.services;

import com.example.demo.model.entities.*;
import com.example.demo.model.entities.dataTransferObjects.BookData;
import com.example.demo.model.enums.RentalStatusValueEnum;
import com.example.demo.model.repositories.*;
import com.example.demo.model.utils.BookFilterData;
import com.example.demo.model.utils.BookSpecifications;
import com.example.demo.model.utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private AuthorRepository authorRepository;
    @Autowired
    private BookTypeRepository bookTypeRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private RentalRepository rentalRepository;

    @Transactional(readOnly = true)
    public Page<BookData> getBooks(BookFilterData bookFilterData, Pageable pageable) {
        Page<Book> books = bookRepository.findAll(BookSpecifications.filterBy(bookFilterData), pageable);

        List<BookData> mappedData = books.stream()
                .map(Mapper::toBookData)
                .collect(Collectors.toList());
        return new PageImpl<>(mappedData, pageable, books.getTotalElements());
    }

    @Transactional(readOnly = true)
    public BookData getBook(Long id) {
        Book book = bookRepository.findById(id).orElseThrow();
        return Mapper.toBookData(book);
    }

    public ResponseEntity<String> addBooks(BookData bookData) {
        if(bookData.authorsId().isEmpty()) {
            return new ResponseEntity<String>("Authors list must contain at least 1 element", HttpStatus.BAD_REQUEST);
        }
        if(bookData.booktypesId().isEmpty()) {
            return new ResponseEntity<String>("Book types list must contain at least 1 element", HttpStatus.BAD_REQUEST);
        }
        if(bookData.categoriesId().isEmpty()) {
            return new ResponseEntity<String>("Categories list must contain at least 1 element", HttpStatus.BAD_REQUEST);
        }
        List<Author> authors = authorRepository.findAllById(bookData.authorsId());
        if (authors.size() != bookData.authorsId().size()) {
            return new ResponseEntity<>("One or more Author IDs are invalid", HttpStatus.BAD_REQUEST);
        }

        List<BookType> bookTypes = bookTypeRepository.findAllById(bookData.booktypesId());
        if (bookTypes.size() != bookData.booktypesId().size()) {
            return new ResponseEntity<>("One or more BookType IDs are invalid", HttpStatus.BAD_REQUEST);
        }
        List<Category> categories = categoryRepository.findAllById(bookData.categoriesId());
        if (categories.size() != bookData.categoriesId().size()) {
            return new ResponseEntity<>("One or more Category IDs are invalid", HttpStatus.BAD_REQUEST);
        }
        LocalDateTime now = LocalDateTime.now();

        Book book = new Book();
        book.setName(bookData.title());
        book.setDescription(bookData.description());
        book.setImageUrl(bookData.imageUrl());
        book.setIsbnIssn(bookData.isbnIssn());
        book.setUkd(bookData.ukd());
        book.setReleaseDate(bookData.releaseDate().atStartOfDay());
        book.setIsAvailable(true);
        book.setCreatedAt(now);
        book.setModifiedAt(now);
        book.setAuthors(authors);
        book.setBookTypes(bookTypes);
        book.setCategories(categories);
        bookRepository.save(book);
        return new ResponseEntity<>("Book added successfully", HttpStatus.OK);
    }

    public ResponseEntity<String> withdrawnBook(Long bookId) {
        Book book = bookRepository.findById(bookId).orElse(null);
        if (book == null) {
            return new ResponseEntity<>("Book not found", HttpStatus.NOT_FOUND);
        }
        if(!book.getIsAvailable()) {
            return new ResponseEntity<>("Book is already unavailable", HttpStatus.BAD_REQUEST);
        }

        List<Rental> rentals = rentalRepository.findByBookIdAndRentalStatus(bookId, RentalStatusValueEnum.OUT);
        for (Rental rental : rentals) {
            rental.setRentalStatus(RentalStatusValueEnum.WITHDRAWN);
            rental.setReturnDate(LocalDateTime.now());
        }
        rentalRepository.saveAll(rentals);
        book.setIsAvailable(false);
        bookRepository.save(book);
        return new ResponseEntity<>("Book withdrawn successfully", HttpStatus.OK);
    }
}
