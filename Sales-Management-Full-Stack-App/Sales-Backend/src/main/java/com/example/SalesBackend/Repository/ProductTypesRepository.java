package com.example.SalesBackend.Repository;

import com.example.SalesBackend.Model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductTypesRepository extends JpaRepository<ProductType, Integer> {
}
