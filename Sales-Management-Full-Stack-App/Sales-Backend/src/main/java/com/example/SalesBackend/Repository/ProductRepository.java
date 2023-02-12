package com.example.SalesBackend.Repository;

import com.example.SalesBackend.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = "select * from sales.product where productId = :productId", nativeQuery = true)
    List<Product> getProductByProductId(String productId);
}
