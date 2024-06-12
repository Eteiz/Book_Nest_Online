package com.example.demo.model.entities;

import com.example.demo.model.enums.UserRoleValueEnum;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "USER_ROLES")
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ROLE_ID")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "VALUE", length = 255, nullable = false)
    private UserRoleValueEnum value;
}