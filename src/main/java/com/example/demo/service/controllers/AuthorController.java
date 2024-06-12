package com.example.demo.service.controllers;

import com.example.demo.model.entities.dataTransferObjects.AuthorData;
import com.example.demo.service.controllers.services.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/authors")
public class AuthorController {
    @Autowired
    private AuthorService authorService;

    @GetMapping("/getAuthors")
    public List<AuthorData> getAuthors() {
        return authorService.getAuthors();
    }
}
