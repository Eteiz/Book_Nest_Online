package com.example.demo.model.repositories;

import com.example.demo.model.entities.Rental;
import com.example.demo.model.entities.User;
import com.example.demo.model.enums.RentalStatusValueEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface RentalRepository extends JpaRepository<Rental, Long>, JpaSpecificationExecutor<Rental> {
    Long countByUserAndRentalStatus(User user, RentalStatusValueEnum rentalStatus);
    @Query("SELECT COUNT(r) FROM Rental r WHERE r.user = :user AND r.rentalStatus = 'OUT' AND r.dueDate < :today AND r.returnDate IS NULL")
    Long countOverdueRentalsByUser(@Param("user") User user, @Param("today") LocalDateTime today);

    List<Rental> findByBookIdAndRentalStatus(Long bookId, RentalStatusValueEnum rentalStatus);
}
