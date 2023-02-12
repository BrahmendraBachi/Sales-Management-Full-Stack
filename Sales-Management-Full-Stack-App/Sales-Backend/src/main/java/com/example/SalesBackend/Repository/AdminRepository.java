package com.example.SalesBackend.Repository;

import com.example.SalesBackend.Model.Admin;
import com.example.SalesBackend.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer>{

    @Query(value = "SELECT * from sales.admins where emailId = :emailId",
    nativeQuery = true)
    public Admin findByEmailId(String emailId);
}
