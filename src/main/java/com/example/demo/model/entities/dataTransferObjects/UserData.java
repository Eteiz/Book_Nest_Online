package com.example.demo.model.entities.dataTransferObjects;

import com.example.demo.model.validationGroups.UserDataValidation;
import com.example.demo.model.views.UserDataView;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

// DTO representing user data for registration and login
// Due to education purposes of the project, the extended validation of phone number and pesel is not implemented
public record UserData (
        @JsonView(UserDataView.Profile.class)
        Long id,
        @NotNull(groups = UserDataValidation.Register.class)
        @Size(min = 1, max = 255, groups = UserDataValidation.Register.class)
        @JsonView(UserDataView.Profile.class)
        String firstName,
        @NotNull(groups = UserDataValidation.Register.class)
        @Size(min = 1, max = 255, groups = UserDataValidation.Register.class)
        @JsonView(UserDataView.Profile.class)
        String lastName,
        @NotNull(groups = {UserDataValidation.Login.class, UserDataValidation.Register.class, UserDataValidation.Update.class})
        @Size(min = 1, max = 255, groups = {UserDataValidation.Login.class, UserDataValidation.Register.class})
        @Email(groups = {UserDataValidation.Login.class, UserDataValidation.Register.class})
        @JsonView(UserDataView.Profile.class)
        String emailAddress,
        @NotNull(groups = {UserDataValidation.Register.class, UserDataValidation.Update.class})
        @Size(min = 1, max = 255, groups = {UserDataValidation.Register.class, UserDataValidation.Update.class})
        @JsonView(UserDataView.Profile.class)
        String address,
        @NotNull(groups = {UserDataValidation.Register.class, UserDataValidation.Update.class})
        @Size(min = 1, max = 255, groups = {UserDataValidation.Register.class, UserDataValidation.Update.class})
        @JsonView(UserDataView.Profile.class)
        String city,
        @NotNull(groups = {UserDataValidation.Register.class, UserDataValidation.Update.class})
        @Size(min = 6, max = 6, groups = {UserDataValidation.Register.class, UserDataValidation.Update.class})
        @Pattern(regexp = "\\d{2}-\\d{3}",
                message = "Postal code must be in the format nn-nnn where n is a number",
                groups = {UserDataValidation.Register.class, UserDataValidation.Update.class})
        @JsonView(UserDataView.Profile.class)
        String postalCode,
        @NotNull(groups = UserDataValidation.Register.class)
        @Size(min = 11, max = 11, groups = UserDataValidation.Register.class)
        @Pattern(regexp = "\\d{11}",
                message = "PESEL must be exactly 11 digits",
                groups = UserDataValidation.Register.class)
        @JsonView(UserDataView.Profile.class)
        String pesel,
        @NotNull(groups = UserDataValidation.Register.class)
        @JsonView(UserDataView.Profile.class)
        LocalDate birthDate,
        @Size(min = 0, max = 12, groups = {UserDataValidation.Register.class, UserDataValidation.Update.class})
        @Pattern(regexp = "^(\\+\\d{11}|\\d{9})$", message = "Phone number must be in the format +nnnnnnnnnnn or nnnnnnnnn", groups = {UserDataValidation.Register.class, UserDataValidation.Update.class})
        @JsonView(UserDataView.Profile.class)
        String phoneNumber,
        @NotNull(groups = {UserDataValidation.Login.class, UserDataValidation.Register.class})
        @Size(min = 8, max = 255, groups = {UserDataValidation.Login.class, UserDataValidation.Register.class})
        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
                message = "Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, and one number",
                groups = {UserDataValidation.Login.class, UserDataValidation.Register.class})
        String password,

        @JsonView(UserDataView.Profile.class)
        LocalDateTime createdAt
){
        @AssertTrue(groups = UserDataValidation.Register.class, message = "Birth date cannot be in the future")
        public boolean isBirthDateValid() {
                return birthDate.isBefore(LocalDate.now());
        }
}
