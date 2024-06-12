package com.example.demo.model.utils;

import com.example.demo.model.validationGroups.BookFilterDataValidation;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public record RentalFilterData(
        @Size(min = 0, max = 255, groups = BookFilterDataValidation.Catalog.class)
        String nameFragment,
        LocalDate startDateTo,
        LocalDate startDateFrom,
        LocalDate dueDateTo,
        LocalDate dueDateFrom,
        LocalDate returnDateTo,
        LocalDate returnDateFrom,
        @Size(min = 0)
        List<String> rentalStatuses
){}
