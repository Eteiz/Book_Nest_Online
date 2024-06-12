package com.example.demo.model.entities.dataTransferObjects;

import com.example.demo.model.views.BookFilterView;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

public record RentalData(
    @NotNull
    Long id,
    @NotNull
    @JsonView(BookFilterView.Catalog.class)
    BookData book,
    @NotNull
    LocalDateTime startDate,
    @NotNull
    LocalDateTime dueDate,
    @NotNull
    LocalDateTime returnDate,
    @NotNull
    String rentalStatus
) {}
