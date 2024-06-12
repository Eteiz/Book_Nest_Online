package com.example.demo.service.controllers.services;

import com.example.demo.model.entities.dataTransferObjects.CategoryData;
import com.example.demo.model.entities.Category;
import com.example.demo.model.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<CategoryData> getCategories() {
        return categoryRepository.findAll().stream()
                .sorted(Comparator.comparing(Category::getName))
                .map(category -> new CategoryData(
                        category.getId(),
                        category.getName(),
                        category.getBooks() != null ? category.getBooks().size() : 0))
                .collect(Collectors.toList());
    }
}
