package com.example.demo.model.utils;

import com.example.demo.model.validationGroups.BookFilterDataValidation;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public record BookFilterData (
        @Size(min = 0, max = 255, groups = BookFilterDataValidation.Catalog.class)
        String nameFragment,
        LocalDate fromDate,
        LocalDate toDate,
        @Size(min = 0, groups = BookFilterDataValidation.Catalog.class)
        List<Long> authors,
        @Size(min = 0, groups = BookFilterDataValidation.Catalog.class)
        List<Long> categories,
        @Size(min = 0, groups = BookFilterDataValidation.Catalog.class)
        List<Long> bookTypes
){
    @AssertTrue(groups = BookFilterDataValidation.Catalog.class, message = "toDate must be greater or equal to fromDate")
    public boolean isToDateValid() {
        return toDate != null && fromDate != null && !toDate.isBefore(fromDate);
    }
}
