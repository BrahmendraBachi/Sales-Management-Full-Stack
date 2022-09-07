package com.example.SalesBackend.Repository;

import com.example.SalesBackend.Model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    @Query(value = "Select * from sales.employees where empId = :empId",
    nativeQuery = true)
    public List<Employee> getEmployeeByEmpId(String empId);

    @Query(value = "Select zoneId from sales.employees where empId = :empId",
            nativeQuery = true)
    public String findZoneIdByEmpId(String empId);

    @Query(value = "SELECT * from sales.employees where emailId = :emailId",nativeQuery = true)
    public Employee findEmployeeByEmailId(String emailId);

    @Query(value = "SELECT empId from sales.employees where manId = :empId", nativeQuery = true)
    List<String> findHisEmployeesByEmpId(String empId);

    @Query(value = "SELECT level from sales.employees where empId = :empId", nativeQuery = true)
    int findLevelByEmpId(String empId);

}
