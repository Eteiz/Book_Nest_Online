package com.example.demo.service.controllers;

import com.example.demo.model.entities.dataTransferObjects.CategoryData;
import com.example.demo.service.controllers.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/getCategories")
    public List<CategoryData> getCategories() {
        return categoryService.getCategories();
    }
}
