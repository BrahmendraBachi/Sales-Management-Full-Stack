package com.example.SalesBackend.Repository;

import com.example.SalesBackend.Model.dummyData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DummyDataRepository extends JpaRepository<dummyData, Integer> {

}
