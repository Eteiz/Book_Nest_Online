package com.example.demo.model.entities.dataTransferObjects;

import com.example.demo.model.validationGroups.BookFilterDataValidation;
import com.example.demo.model.views.BookFilterView;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public record BookData (
    @NotNull
    @JsonView(BookFilterView.Catalog.class)
    Long id,

    @Size(min = 0, max = 255)
    @Size(min = 1, max = 255, groups = {BookFilterDataValidation.Creation.class})
    @JsonView(BookFilterView.Catalog.class)
    String title,

    @Size(min = 0, groups = {BookFilterDataValidation.Creation.class})
    @JsonView(BookFilterView.Detail.class)
    String description,

    @NotEmpty(groups = {BookFilterDataValidation.Creation.class})
    @JsonView(BookFilterView.Catalog.class)
    String imageUrl,

    @Size(min = 0, max = 8, groups = {BookFilterDataValidation.Creation.class})
    @JsonView(BookFilterView.Detail.class)
    String isbnIssn,

    @Size(min = 0, max = 255, groups = {BookFilterDataValidation.Creation.class})
    @JsonView(BookFilterView.Detail.class)
    String ukd,

    @NotNull(groups = {BookFilterDataValidation.Creation.class})
    @JsonView(BookFilterView.Catalog.class)
    LocalDate releaseDate,

    @NotNull
    @JsonView(BookFilterView.Catalog.class)
    Boolean isAvailable,

    @NotNull
    @JsonView(BookFilterView.Detail.class)
    LocalDate createdAt,

    @NotNull
    @JsonView(BookFilterView.Detail.class)
    LocalDate modifiedAt,

    @NotNull
    @Size(min = 1)
    @JsonView(BookFilterView.Catalog.class)
    List<BookTypeData> bookTypes,

    @NotNull
    @Size(min = 1)
    @JsonView(BookFilterView.Detail.class)
    List<CategoryData> categories,

    @NotNull
    @Size(min = 1)
    @JsonView(BookFilterView.Catalog.class)
    List<AuthorData> authors,

    @Size(min = 1, groups = BookFilterDataValidation.Creation.class)
    List<Long> authorsId,

    @Size(min = 1, groups = BookFilterDataValidation.Creation.class)
    List<Long> categoriesId,

    @Size(min = 1, groups = BookFilterDataValidation.Creation.class)
    List<Long> booktypesId
){}
