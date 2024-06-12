package com.example.demo.model.entities.dataTransferObjects;

import com.example.demo.model.validationGroups.BookFilterDataValidation;
import com.example.demo.model.views.BookFilterView;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Size;

public record AuthorData (
    @NotNull
    @JsonView(BookFilterView.Catalog.class)
    Long id,

    @NotNull
    @Size(min = 1, max = 255)
    @JsonView(BookFilterView.Catalog.class)
    String name,

    @NotNull
    Integer bookCount
){}
