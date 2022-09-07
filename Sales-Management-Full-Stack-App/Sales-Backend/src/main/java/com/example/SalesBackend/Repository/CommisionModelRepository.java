package com.example.SalesBackend.Repository;

import com.example.SalesBackend.Model.CommisionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommisionModelRepository extends JpaRepository<CommisionModel, Integer> {

    @Query(value = "SELECT * FROM sales.commisionmodel where typeId = :typeId", nativeQuery = true)
    List<CommisionModel> findCommisionModelsByTypeId(String typeId);
}
