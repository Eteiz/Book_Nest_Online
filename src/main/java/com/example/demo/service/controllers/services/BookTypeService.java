package com.example.demo.service.controllers.services;

import com.example.demo.model.entities.dataTransferObjects.BookTypeData;
import com.example.demo.model.entities.BookType;
import com.example.demo.model.repositories.BookTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookTypeService {
    @Autowired
    private BookTypeRepository bookTypeRepository;

    @Transactional(readOnly = true)
    public List<BookTypeData> getBookTypes() {
        return bookTypeRepository.findAll().stream()
                .sorted(Comparator.comparing(BookType::getName))
                .map(bookType -> new BookTypeData(
                        bookType.getId(),
                        bookType.getName(),
                        bookType.getBooks() != null ? bookType.getBooks().size() : 0))
                .collect(Collectors.toList());
    }
}
