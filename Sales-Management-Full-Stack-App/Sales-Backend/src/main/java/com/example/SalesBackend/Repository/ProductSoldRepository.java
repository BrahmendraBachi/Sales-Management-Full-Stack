package com.example.SalesBackend.Repository;


import com.example.SalesBackend.Model.ProductSold;
import com.example.SalesBackend.Objects.Sample;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductSoldRepository extends JpaRepository<ProductSold, Integer> {



    @Query(value = "Select * from sales.productSold where empId = :empId",
             nativeQuery = true)
    List<ProductSold> findByEmpId(String empId);

    @Query(value = "Select SUM(cost) from sales.productSold where monthname(dateSold) = :monthName and empId = :empId",
             nativeQuery = true)
    Long totalSales(String empId, String monthName);

    @Query(value = "Select * from sales.productSold where monthname(dateSold) = :monthName and empId = :empId and Year(dateSold) = :sYear", nativeQuery = true)
    List<ProductSold> findByEmpIdandMonth(String empId, String monthName, String sYear);

    @Query(value = "Select * from sales.productSold where monthname(dateSold) = :monthName and Year(dateSold) = :sYear", nativeQuery = true)
    List<ProductSold> findtotalSalesInMonth(String monthName, String sYear);

    @Query(value = "Select SUM(cost) from sales.productSold where monthname(dateSold) = :monthName", nativeQuery = true)
    float findTotalSalesValueInMonth(String monthName);

    @Query(value = "Select * from sales.productSold where YEAR(dateSold) = :year and monthname(dateSold) = :month", nativeQuery = true)
    List<ProductSold> findAllProductSoldByMonth(String year, String month);

    @Query(value = "SELECT dateSold as date, SUM(cost) as total from sales.productSold " +
            "where monthname(dateSold) = :monthName group by dateSold", nativeQuery = true)
    public List<Sample> findTotalSalesByMonthName(String monthName);


}
