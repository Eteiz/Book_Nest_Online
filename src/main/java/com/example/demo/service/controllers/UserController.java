package com.example.demo.service.controllers;

import com.example.demo.model.entities.dataTransferObjects.UserData;
import com.example.demo.model.views.UserDataView;
import com.example.demo.service.controllers.services.UserService;
import com.example.demo.model.validationGroups.UserDataValidation;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

// Controller for user endpoints
@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody @Validated(UserDataValidation.Login.class) UserData userData) {
        log.info("User login requested for {}", userData.emailAddress());
        return userService.loginUser(userData);
    }

    @PostMapping("/loginAdmin")
    public ResponseEntity<String> loginAdmin(@RequestBody @Validated(UserDataValidation.Login.class) UserData userData) {
        log.info("Admin login requested for {}", userData.emailAddress());
        return userService.loginAdmin(userData);
    }

    @PostMapping("/register")
    public ResponseEntity<String> postUser(@RequestBody @Validated(UserDataValidation.Register.class) UserData userData) {
        log.info("User insertion requested for {}", userData.emailAddress());
        return userService.createUser(userData);
    }

    @GetMapping("/getUser/{userEmail}")
    @JsonView(UserDataView.Profile.class)
    public UserData getUser(@PathVariable String userEmail) {
        log.info("User data requested for {}", userEmail);
        return userService.getUser(userEmail);
    }

    @DeleteMapping("/archiveUser/{userEmail}")
    public ResponseEntity<String> archiveUser(@PathVariable String userEmail) {
        log.info("User deletion requested for {}", userEmail);
        return userService.archiveUser(userEmail);
    }

    @PostMapping("/updateUser/{userEmail}")
    public ResponseEntity<String> updateUser(@PathVariable String userEmail, @RequestBody @Validated(UserDataValidation.Update.class) UserData userData) {
        log.info("User update requested for {}", userEmail);
        return userService.updateUser(userEmail, userData);
    }
}
