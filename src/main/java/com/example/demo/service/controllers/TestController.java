package com.example.demo.service.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

// Controller for test endpoint
@CrossOrigin
@RestController
@RequestMapping("/test")
public class TestController {
    @GetMapping("/get")
    public ResponseEntity<String> testGet() {
        return ResponseEntity.ok().body("GET endpoint is accessible!");
    }

    @PostMapping("/post")
    public ResponseEntity<String> testPost() {
        return ResponseEntity.ok().body("POST endpoint is accessible!");
    }

    @PutMapping("/put")
    public ResponseEntity<String> testPut() {
        return ResponseEntity.ok().body("PUT endpoint is accessible!");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> testDelete() {
        return ResponseEntity.ok().body("DELETE endpoint is accessible!");
    }
}
