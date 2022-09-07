package com.example.SalesBackend.Repository;

import com.example.SalesBackend.Model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer>{

    @Query(value = "SELECT * from sales.admins where emailId = :emailId",
    nativeQuery = true)
    public Admin findByEmailId(String emailId);
}
