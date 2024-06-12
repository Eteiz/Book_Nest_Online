package com.example.demo.model.utils;

import com.example.demo.model.entities.*;
import com.example.demo.model.entities.dataTransferObjects.*;

import java.util.stream.Collectors;
// Mapper class to map entity's data to dto's data.
public class Mapper {
    public static BookData toBookData(Book book) {
        return new BookData(
                book.getId(),
                book.getName(),
                book.getDescription(),
                book.getImageUrl(),
                book.getIsbnIssn(),
                book.getUkd(),
                book.getReleaseDate().toLocalDate(),
                book.getIsAvailable(),
                book.getCreatedAt().toLocalDate(),
                book.getModifiedAt().toLocalDate(),
                book.getBookTypes().stream().map(Mapper::toBookTypeData).collect(Collectors.toList()),
                book.getCategories().stream().map(Mapper::toCategoryData).collect(Collectors.toList()),
                book.getAuthors().stream().map(Mapper::toAuthorData).collect(Collectors.toList()),
                book.getAuthors().stream().map(Author::getId).collect(Collectors.toList()),
                book.getCategories().stream().map(Category::getId).collect(Collectors.toList()),
                book.getBookTypes().stream().map(BookType::getId).collect(Collectors.toList())
        );
    }

    public static BookTypeData toBookTypeData(BookType bookType) {
        return new BookTypeData(
                bookType.getId(),
                bookType.getName(),
                bookType.getBooks().size()
        );
    }

    public static CategoryData toCategoryData(Category category) {
        return new CategoryData(
                category.getId(),
                category.getName(),
                category.getBooks().size()
        );
    }

    public static AuthorData toAuthorData(Author author) {
        return new AuthorData(
                author.getId(),
                author.getFirstName() + " " + author.getLastName(),
                author.getBooks().size()
        );
    }

    public static RentalData toRentalData(Rental rental) {
        return new RentalData(
                rental.getId(),
                toBookData(rental.getBook()),
                rental.getStartDate(),
                rental.getDueDate(),
                rental.getReturnDate(),
                rental.getRentalStatus().toString()
        );
    }

    public static UserData toUserData(User user) {
        return new UserData(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getAddress(),
                user.getCity(),
                user.getPostalCode(),
                user.getPesel(),
                user.getBirthDate(),
                user.getPhoneNumber(),
                user.getPasswordHash(),
                user.getCreatedAt()
        );
    }
}
