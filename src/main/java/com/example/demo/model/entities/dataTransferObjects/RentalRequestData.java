package com.example.demo.model.entities.dataTransferObjects;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record RentalRequestData(
    @NotNull
    Long bookId,
    @Size(min = 0, max = 255)
    String userEmail,
    @NotNull
    LocalDateTime startDate,
    @NotNull
    LocalDateTime dueDate
) {
    @AssertTrue(message = "dueDate must be after current date and after startDate")
    public boolean isValidDates() {
        return !dueDate.isBefore(LocalDateTime.now()) && !dueDate.isBefore(startDate);
    }
}
