package com.example.SalesBackend.Objects;

import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class ResultSetExtractor {


    public List<TotalSales> allData(String month, String sYear) throws SQLException {
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;

        String dbUrl = "jdbc:mysql://localhost:3306/Sales";
        String username = "root";
        String password = "Bachi6362";

        connection = DriverManager.getConnection(dbUrl, username, password);

        statement = connection.createStatement();

        String sql = "select dateSold as date, sum(cost) as totalSales from sales.productSold where monthname(dateSold )= '" + month + "' and Year(dateSold) = '" + sYear + "' group by dateSold";
        System.out.println(sql);

        resultSet = statement.executeQuery(String.format(sql));
        List<TotalSales> totalSalesInMonth = new ArrayList<>();
        while (resultSet.next())
        {
            TotalSales totalSales = new TotalSales();

            String date = resultSet.getString("date");

            totalSales.setDate(date.substring(5,10));

            Long total = resultSet.getLong("totalSales");

            totalSales.setTotalSales(total);

            totalSalesInMonth.add(totalSales);

        }
        resultSet.close();
        connection.close();
        statement.close();
        return totalSalesInMonth;
    }

    public List<TotalSales> allDataForSalesPerson(String month, String empId, String sYear) throws SQLException {
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;


        String dbUrl = "jdbc:mysql://localhost:3306/Sales";
        String username = "root";
        String password = "Bachi6362";


        connection = DriverManager.getConnection(dbUrl, username, password);

        statement = connection.createStatement();

        String sql = "select dateSold as date, sum(cost) as totalSales from sales.productSold where monthname(dateSold )= '" + month + "' and empId = '" + empId + "' and Year(dateSold) = '" + sYear + "' group by dateSold";
        System.out.println(sql);

        resultSet = statement.executeQuery(String.format(sql));
        List<TotalSales> totalSalesInMonth = new ArrayList<>();
        while (resultSet.next())
        {
            TotalSales totalSales = new TotalSales();

            String date = resultSet.getString("date");

            totalSales.setDate(date.substring(5,10));

            Long total = resultSet.getLong("totalSales");

            totalSales.setTotalSales(total);

            totalSalesInMonth.add(totalSales);

        }
        resultSet.close();
        connection.close();
        statement.close();
        return totalSalesInMonth;
    }
}
