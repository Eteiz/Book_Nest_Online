package com.example.demo.service.controllers;

import com.example.demo.model.entities.dataTransferObjects.RentalData;
import com.example.demo.model.entities.dataTransferObjects.RentalRequestData;
import com.example.demo.model.utils.RentalFilterData;
import com.example.demo.model.validationGroups.RentalFilterDataValidation;
import com.example.demo.model.views.BookFilterView;
import com.example.demo.service.controllers.services.RentalService;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/rentals")
public class RentalController {
    @Autowired
    private RentalService rentalService;

    @PostMapping("/rent")
    public ResponseEntity<String> rentBook(@RequestBody @Valid RentalRequestData rentalRequestData) {
        return rentalService.rentBook(rentalRequestData);
    }

    @PostMapping({"/getRentals", "/getRentals/{userEmail}"})
    @JsonView(BookFilterView.Catalog.class)
    public Page<RentalData> getRentals(@PathVariable(required = false) String userEmail, @RequestBody @Validated(RentalFilterDataValidation.History.class) RentalFilterData rentalFilterData, Pageable pageable) {
        return rentalService.getRentals(userEmail, rentalFilterData, pageable);
    }

    @GetMapping("/getRentalStatuses")
    public List<String> getRentalStatuses() {
        return rentalService.getRentalStatuses();
    }

    @DeleteMapping("/return/{userEmail}/{rentalId}")
    public ResponseEntity<String> returnBook(@PathVariable String userEmail, @PathVariable Long rentalId) {
        return rentalService.returnBook(userEmail, rentalId);
    }
}
