package com.example.demo.model.utils;

import com.example.demo.model.entities.Book;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

public class BookSpecifications {

    public static Specification<Book> filterBy(BookFilterData filterData) {
        return (root, query, criteriaBuilder) -> {
            Predicate mainPredicate = criteriaBuilder.conjunction();

            // Filter by fragment in book name
            if (filterData.nameFragment() != null && !filterData.nameFragment().isEmpty()) {
                mainPredicate = criteriaBuilder.and(mainPredicate, criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + filterData.nameFragment().toLowerCase() + "%"));
            }

            // Filter by release date range
            if (filterData.fromDate() != null && filterData.toDate() != null) {
                mainPredicate = criteriaBuilder.and(mainPredicate, criteriaBuilder.between(root.get("releaseDate"),
                        LocalDateTime.of(filterData.fromDate(), LocalDateTime.MIN.toLocalTime()),
                        LocalDateTime.of(filterData.toDate(), LocalDateTime.MAX.toLocalTime())));
            }

            // Filter by authors
            if (filterData.authors() != null && !filterData.authors().isEmpty()) {
                Predicate authorsPredicate = root.join("authors", JoinType.INNER).get("id").in(filterData.authors());
                mainPredicate = criteriaBuilder.and(mainPredicate, authorsPredicate);
            }

            // Filter by categories
            if (filterData.categories() != null && !filterData.categories().isEmpty()) {
                Predicate categoriesPredicate = root.join("categories", JoinType.INNER).get("id").in(filterData.categories());
                mainPredicate = criteriaBuilder.and(mainPredicate, categoriesPredicate);
            }

            // Filter by book types
            if (filterData.bookTypes() != null && !filterData.bookTypes().isEmpty()) {
                Predicate bookTypesPredicate = root.join("bookTypes", JoinType.INNER).get("id").in(filterData.bookTypes());
                mainPredicate = criteriaBuilder.and(mainPredicate, bookTypesPredicate);
            }

            return mainPredicate;
        };
    }
}
