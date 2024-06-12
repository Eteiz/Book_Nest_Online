package com.example.demo.service.controllers;

import com.example.demo.model.entities.dataTransferObjects.BookTypeData;
import com.example.demo.service.controllers.services.BookTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/bookTypes")
public class BookTypeController {
    @Autowired
    private BookTypeService bookTypeService;

    @GetMapping("/getBookTypes")
    public List<BookTypeData> getBookTypes() {
        return bookTypeService.getBookTypes();
    }
}
