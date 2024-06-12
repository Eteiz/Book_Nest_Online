package com.example.demo.service.controllers.services;

import com.example.demo.model.entities.Book;
import com.example.demo.model.entities.Rental;
import com.example.demo.model.entities.User;
import com.example.demo.model.entities.dataTransferObjects.RentalData;
import com.example.demo.model.entities.dataTransferObjects.RentalRequestData;
import com.example.demo.model.enums.RentalStatusValueEnum;
import com.example.demo.model.repositories.BookRepository;
import com.example.demo.model.repositories.RentalRepository;
import com.example.demo.model.repositories.UserRepository;
import com.example.demo.model.utils.Mapper;
import com.example.demo.model.utils.RentalFilterData;
import com.example.demo.model.utils.RentalSpecification;
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
public class RentalService {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RentalRepository rentalRepository;

    public ResponseEntity<String> rentBook(RentalRequestData rentalRequestData) {
        User user = userRepository.findByEmail(rentalRequestData.userEmail()).orElse(null);
        if(user == null) {
            return new ResponseEntity<String>("User " + rentalRequestData.userEmail() + " not found", HttpStatus.NOT_FOUND);
        }
        Book book = bookRepository.findById(rentalRequestData.bookId()).orElse(null);
        if (book == null) {
            return new ResponseEntity<String>("Book " + rentalRequestData.bookId() + " not found", HttpStatus.NOT_FOUND);
        }

        // Book is unavailable
        if (!book.getIsAvailable()) {
            return new ResponseEntity<String>("Book " + rentalRequestData.bookId() + " is not available", HttpStatus.FORBIDDEN);
        }

        // User cannot rent more books
        if (rentalRepository.countByUserAndRentalStatus(user, RentalStatusValueEnum.OUT) > 5) {
            return new ResponseEntity<String>("User " + rentalRequestData.userEmail() + " cannot rent more books", HttpStatus.FORBIDDEN);
        }
        // User have currently due book(s)
        if(rentalRepository.countOverdueRentalsByUser(user, LocalDateTime.now()) > 0) {
            return new ResponseEntity<String>("User " + rentalRequestData.userEmail() + " have overdue book(s)", HttpStatus.FORBIDDEN);
        }

        book.setIsAvailable(false);
        bookRepository.save(book);

        Rental rental = new Rental();
        rental.setBook(book);
        rental.setUser(user);
        rental.setStartDate(rentalRequestData.startDate());
        rental.setDueDate(rentalRequestData.dueDate());
        rental.setRentalStatus(RentalStatusValueEnum.valueOf("OUT"));
        rental.setCreatedAt(LocalDateTime.now());
        rentalRepository.save(rental);

        return new ResponseEntity<String>("Book " + rentalRequestData.bookId() + " rented by user " + rentalRequestData.userEmail(), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public Page<RentalData> getRentals(String userEmail, RentalFilterData rentalFilterData, Pageable pageable) {
        if(userEmail != null && !userRepository.existsByEmail(userEmail)) {
            return null;
        }
        Page<Rental> rentals = rentalRepository.findAll(RentalSpecification.filterBy(rentalFilterData, userEmail), pageable);
        List<RentalData> mappedData = rentals.stream()
                .map(Mapper::toRentalData)
                .collect(Collectors.toList());
        return new PageImpl<>(mappedData, pageable, rentals.getTotalElements());
    }

    public List<String> getRentalStatuses() {
        return RentalStatusValueEnum.getRentalStatuses();
    }

    public ResponseEntity<String> returnBook(String userEmail, Long rentalId) {
        User user = userRepository.findByEmail(userEmail).orElse(null);
        if (user == null) {
            return new ResponseEntity<String>("User " + userEmail + " not found", HttpStatus.NOT_FOUND);
        }
        Rental rental = rentalRepository.findById(rentalId).orElse(null);
        if (rental == null) {
            return new ResponseEntity<String>("Rental " + rentalId + " not found", HttpStatus.NOT_FOUND);
        }
        if(!rental.getUser().equals(user)) {
            return new ResponseEntity<String>("User " + userEmail + " is not the renter of rental " + rentalId, HttpStatus.FORBIDDEN);
        }
        if (rental.getRentalStatus() != RentalStatusValueEnum.valueOf("OUT")) {
            return new ResponseEntity<String>("Book from rental " + rentalId + " cannot be returned", HttpStatus.FORBIDDEN);
        }

        rental.setReturnDate(LocalDateTime.now());
        rental.setRentalStatus(RentalStatusValueEnum.valueOf("RETURNED"));
        rentalRepository.save(rental);

        Book book = rental.getBook();
        book.setIsAvailable(true);
        book.setModifiedAt(LocalDateTime.now());
        bookRepository.save(book);

        return new ResponseEntity<String>("Book " + rental.getBook().getId() + " returned by user " + rental.getUser().getEmail(), HttpStatus.OK);
    }
}
