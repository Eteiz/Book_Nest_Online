package com.example.demo.service.controllers.services;

import com.example.demo.model.entities.dataTransferObjects.AuthorData;
import com.example.demo.model.entities.Author;
import com.example.demo.model.repositories.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthorService {
        @Autowired
        private AuthorRepository authorRepository;

        @Transactional(readOnly = true)
        public List<AuthorData> getAuthors() {
                return authorRepository.findAll().stream()
                        .sorted(Comparator.comparing(Author::getLastName))
                        .map(author -> new AuthorData(
                                author.getId(),
                                author.getFirstName() + " " + author.getLastName(),
                                author.getBooks() != null ? author.getBooks().size() : 0))
                        .collect(Collectors.toList());
        }
}
