package com.example.demo.model.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "USERS")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private Long id;

    @Column(name = "EMAIL", nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "PASSWORD_HASH", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "FIRST_NAME", nullable = false, length = 255)
    private String firstName;

    @Column(name = "LAST_NAME", nullable = false, length = 255)
    private String lastName;

    @Column(name = "PHONE_NUMBER", length = 12)
    private String phoneNumber;

    @Column(name = "ADDRESS", nullable = false, length = 255)
    private String address;

    @Column(name = "POSTAL_CODE", nullable = false, length = 6)
    private String postalCode;

    @Column(name = "CITY", nullable = false, length = 255)
    private String city;

    @Column(name = "PESEL", nullable = false, length = 11)
    private String pesel;

    @Column(name = "BIRTH_DATE", nullable = false)
    private LocalDate birthDate;

    @ManyToOne
    @JoinColumn(name = "ROLE_ID", nullable = false)
    private UserRole role;

    @Column(name = "CREATED_AT", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "LAST_LOGGED_AT", nullable = false)
    private LocalDateTime lastLoggedAt;

    @Column(name = "IS_ACTIVE", nullable = false)
    private Boolean isActive;
}
