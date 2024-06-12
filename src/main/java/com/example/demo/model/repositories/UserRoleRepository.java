package com.example.demo.model.repositories;

import com.example.demo.model.entities.UserRole;
import com.example.demo.model.enums.UserRoleValueEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    Optional<UserRole> findByValue(UserRoleValueEnum value);
}
