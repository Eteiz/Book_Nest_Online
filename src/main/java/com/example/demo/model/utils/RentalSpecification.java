package com.example.demo.model.utils;

import com.example.demo.model.entities.Rental;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;
import jakarta.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.List;

public class RentalSpecification {

    public static Specification<Rental> filterBy(RentalFilterData filterData, String userEmail) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (StringUtils.hasText(filterData.nameFragment())) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("book").get("name")), "%" + filterData.nameFragment().toLowerCase() + "%"));
            }

            if (filterData.startDateFrom() != null && filterData.startDateTo() != null) {
                predicates.add(criteriaBuilder.between(root.get("startDate"), filterData.startDateFrom(), filterData.startDateTo()));
            } else if (filterData.startDateFrom() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("startDate"), filterData.startDateFrom()));
            } else if (filterData.startDateTo() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("startDate"), filterData.startDateTo()));
            }

            if (filterData.dueDateFrom() != null && filterData.dueDateTo() != null) {
                predicates.add(criteriaBuilder.between(root.get("dueDate"), filterData.dueDateFrom(), filterData.dueDateTo()));
            } else if (filterData.dueDateFrom() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("dueDate"), filterData.dueDateFrom()));
            } else if (filterData.dueDateTo() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("dueDate"), filterData.dueDateTo()));
            }

            if (filterData.returnDateFrom() != null && filterData.returnDateTo() != null) {
                predicates.add(criteriaBuilder.between(root.get("returnDate"), filterData.returnDateFrom(), filterData.returnDateTo()));
            } else if (filterData.returnDateFrom() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("returnDate"), filterData.returnDateFrom()));
            } else if (filterData.returnDateTo() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("returnDate"), filterData.returnDateTo()));
            }

            if (filterData.rentalStatuses() != null && !filterData.rentalStatuses().isEmpty()) {
                List<Predicate> statusPredicates = new ArrayList<>();
                for (String status : filterData.rentalStatuses()) {
                    statusPredicates.add(criteriaBuilder.equal(root.get("rentalStatus").as(String.class), status));
                }
                predicates.add(criteriaBuilder.or(statusPredicates.toArray(new Predicate[0])));
            }

            if (StringUtils.hasText(userEmail)) {
                predicates.add(criteriaBuilder.equal(root.get("user").get("email"), userEmail));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
