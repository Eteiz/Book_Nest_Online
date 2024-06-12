package com.example.demo.service.controllers.services;

import com.example.demo.config.JwtAuthenticationFilter;
import com.example.demo.model.entities.UserRole;
import com.example.demo.model.entities.dataTransferObjects.UserData;
import com.example.demo.model.entities.User;
import com.example.demo.model.enums.UserRoleValueEnum;
import com.example.demo.model.repositories.UserRepository;
import com.example.demo.model.repositories.UserRoleRepository;
import com.example.demo.model.utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtAuthenticationFilter jwtTokenProvider;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserRoleRepository userRoleRepository;

    public ResponseEntity<String> loginUser(UserData userData) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userData.emailAddress(),
                            userData.password()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtTokenProvider.generateToken(authentication.getName(), "USER");

            User user = userRepository.findByEmail(userData.emailAddress()).orElse(null);
            if (user == null) {
                return new ResponseEntity<>("Invalid email or password", HttpStatus.NOT_FOUND);
            }
            if(!user.getIsActive()) {
                return new ResponseEntity<>("User is not active", HttpStatus.FORBIDDEN);
            }
            if(!user.getRole().getValue().equals(UserRoleValueEnum.USER)) {
                return new ResponseEntity<String>("User " + user.getEmail() + " is not a user", HttpStatus.FORBIDDEN);
            }
            user.setLastLoggedAt(LocalDateTime.now());
            userRepository.save(user);
            return new ResponseEntity<>(token, HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }
    }

    public ResponseEntity<String> loginAdmin(UserData userData) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userData.emailAddress(),
                            userData.password()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtTokenProvider.generateToken(authentication.getName(), "ADMIN");

            User user = userRepository.findByEmail(userData.emailAddress()).orElse(null);
            if (user == null) {
                return new ResponseEntity<>("Invalid email or password", HttpStatus.NOT_FOUND);
            }
            if(!user.getIsActive()) {
                return new ResponseEntity<>("User is not active", HttpStatus.FORBIDDEN);
            }
            if(!user.getRole().getValue().equals(UserRoleValueEnum.ADMIN)) {
                return new ResponseEntity<String>("User " + user.getEmail() + " is not an admin", HttpStatus.FORBIDDEN);
            }
            user.setLastLoggedAt(LocalDateTime.now());
            userRepository.save(user);
            return new ResponseEntity<>(token, HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }
    }

    public ResponseEntity<String> createUser(UserData userData) {
        if(userRepository.existsByEmail(userData.emailAddress())) {
            return new ResponseEntity<String>("User " + userData.emailAddress() + " already exists", HttpStatus.CONFLICT);
        }
        UserRole userRole = userRoleRepository.findByValue(UserRoleValueEnum.USER).orElse(null);
        if(userRole == null) {
            return new ResponseEntity<String>("UserRole " + UserRoleValueEnum.USER + " not found", HttpStatus.NOT_FOUND);
        }
        LocalDateTime now = LocalDateTime.now();

        User user = new User();
        user.setFirstName(userData.firstName());
        user.setLastName(userData.lastName());
        user.setEmail(userData.emailAddress());
        user.setAddress(userData.address());
        user.setCity(userData.city());
        user.setPostalCode(userData.postalCode());
        user.setPesel(userData.pesel()); // Pesel does not need to be encoded as it is not a senstiive data
        user.setBirthDate(userData.birthDate());
        user.setPasswordHash(passwordEncoder.encode(userData.password()));
        user.setRole(userRole);
        user.setCreatedAt(now);
        user.setLastLoggedAt(now);
        user.setIsActive(true);

        userRepository.save(user);
        return new ResponseEntity<String>("User inserted successfully", HttpStatus.OK);
    }

    public UserData getUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElse(null);
        return user != null ? Mapper.toUserData(user) : null;
    }

    public ResponseEntity<String> archiveUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElse(null);
        if(user == null) {
            return new ResponseEntity<String>("User " + userEmail + " not found", HttpStatus.NOT_FOUND);
        }
        if(!user.getIsActive()) {
            return new ResponseEntity<String>("User " + userEmail + " is already archived", HttpStatus.CONFLICT);
        }
        if(!user.getRole().getValue().equals(UserRoleValueEnum.USER)) {
            return new ResponseEntity<String>("User " + userEmail + " is not a user", HttpStatus.FORBIDDEN);
        }
        user.setIsActive(false);
        userRepository.save(user);
        return new ResponseEntity<String>("User " + userEmail + " archived successfully", HttpStatus.OK);
    }

    public ResponseEntity<String> updateUser(String userEmail, UserData userData) {
        User user = userRepository.findByEmail(userEmail).orElse(null);
        if(user == null) {
            return new ResponseEntity<String>("User " + userEmail + " not found", HttpStatus.NOT_FOUND);
        }
        if(!user.getIsActive()) {
            return new ResponseEntity<String>("User " + userEmail + " is archived", HttpStatus.CONFLICT);
        }
        user.setAddress(userData.address());
        user.setCity(userData.city());
        user.setPostalCode(userData.postalCode());
        user.setPhoneNumber(userData.phoneNumber());
        userRepository.save(user);
        return new ResponseEntity<String>("User " + userEmail + " updated successfully", HttpStatus.OK);
    }
}
