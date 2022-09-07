package com.example.SalesBackend.Repository;

import com.example.SalesBackend.Model.LoginData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoginRepository extends JpaRepository<LoginData, Integer> {
    @Query(value = "select username from sales.logindata",
            nativeQuery = true)
    public List<String> findAllUsers();

    @Query(value = "SELECT * from sales.logindata where username = :username",
            nativeQuery = true)
    public LoginData findByUsername(String username);


}
