package com.example.demo.model.entities;

import com.example.demo.model.enums.RentalStatusValueEnum;
import com.example.demo.model.views.RentalView;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "RENTALS")
public class Rental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RENTAL_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "BOOK_ID", nullable = false)
    private Book book;

    @ManyToOne
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;

    @Column(name = "START_DATE", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "DUE_DATE")
    private LocalDateTime dueDate;

    @Column(name = "RETURN_DATE")
    private LocalDateTime returnDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "RENTAL_STATUS", length = 255, nullable = false)
    private RentalStatusValueEnum rentalStatus;

    @Column(name = "CREATED_AT", nullable = false)
    private LocalDateTime createdAt;
}
