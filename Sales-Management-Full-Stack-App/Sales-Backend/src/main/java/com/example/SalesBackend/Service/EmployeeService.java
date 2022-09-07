package com.example.SalesBackend.Service;

import com.example.SalesBackend.Model.*;
import com.example.SalesBackend.Objects.*;
import com.example.SalesBackend.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.text.DateFormatSymbols;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    @Autowired
    private DummyDataRepository dummyDataRepository;

    @Autowired
    private ProductTypesRepository productTypesRepository;

    @Autowired
    private ProductSoldRepository productSoldRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CommisionModelRepository commisionModelRepository;

    @Autowired
    private ResultSetExtractor resultSetExtractor;

    @Autowired
    private AdminService adminService;
    public Employee getEmployee(String username)
    {
        List<Employee> employees = employeeRepository.findAll();
        for(Employee employee : employees)
        {
            if(employee.getEmailId().equals(username))
            {
                return employee;
            }
        }
        return null;
    }

    public List<Zones> getAllZones() {
        return zoneRepository.findAll();
    }


    public List<ProductType> getAllProductTypes() {
        return productTypesRepository.findAll();
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Employee getEmployeeById(int id) {
        return employeeRepository.findById(id).get();
    }


    public Employee updateEmployee(int id, Employee employee) {

        Employee employeeDetails = employeeRepository.findById(id).get();

        employeeDetails.setEmpId(employee.getEmpId());

        employeeDetails.setZoneId(employee.getZoneId());

        employeeDetails.setFirstName(employee.getFirstName());

        employeeDetails.setLastName(employee.getLastName());

        employeeDetails.setEmailId(employee.getEmailId());

        employeeDetails.setPhoneNumber(employee.getPhoneNumber());

        employeeDetails.setPassword(employee.getPassword());

        employeeRepository.save(employeeDetails);

        return employeeDetails;
    }


    public dummyData sellProduct(ProductSold_Ids productSold_ids) {

        Product product = productRepository.findById(productSold_ids.getpId()).get();

        Employee employee = employeeRepository.findById(productSold_ids.geteId()).get();

        dummyData productSold = new dummyData();

        productSold.setProductId(product.getProductId());

        productSold.setEmpId(employee.getEmpId());

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        Date date = new Date();

        String dateToday = formatter.format(date);

        productSold.setDateSold(dateToday);

        productSold.setCost(product.getCost());

        productSold.setTypeId(product.getTypeId());

        dummyDataRepository.save(productSold);

        return productSold;
    }

    public List<MonthlySales> findAllProductsSoldById(int id) {
        String empId = employeeRepository.findById(id).get().getEmpId();

        int sMonth = Integer.parseInt(productSoldRepository.findByEmpId(empId).get(0).getDateSold().substring(5, 7));

        SimpleDateFormat formatter = new SimpleDateFormat("MM");

        Date date = new Date();

        List<MonthlySales> allMonthlySales = new ArrayList<>();

        int tMonth = Integer.parseInt(formatter.format(date));

        for(int i=sMonth;i<=tMonth;i++)
        {
            MonthlySales monthlySales = new MonthlySales();

            String monthName = new DateFormatSymbols().getMonths()[i-1];

            monthlySales.setMonth(monthName + " - " + 2022);

            List<ProductSold> productsSold = productSoldRepository.findByEmpIdandMonth(empId, monthName);

            monthlySales.setProductsSold(productsSold);

            float directCommision = commission(productsSold);

            float indirectCommision = indirectCommision(empId, monthName);

            Long totalSales = productSoldRepository.totalSales(empId, monthName);

            monthlySales.setTotalSales(totalSales);

            directCommision = isAddExtraCommision(directCommision, empId, totalSales);

            System.out.println("Total Commision ::::: " + directCommision);

            float totalCommision = directCommision + indirectCommision;

            monthlySales.setCommision(totalCommision);

            allMonthlySales.add(monthlySales);
        }

        return allMonthlySales;
    }


    public float calculateCommision(int commision, Long cost)
    {
        return commision*cost/100;
    }

    public List<MonthlySalesData> getSalesDataById(int id) throws SQLException {
        String empId = employeeRepository.findById(id).get().getEmpId();

        List<MonthlySalesData> allMonthlySalesData = new ArrayList<>();

        int sMonth = Integer.parseInt(productSoldRepository.findById(1).get().getDateSold().substring(5,7));

        SimpleDateFormat formatter = new SimpleDateFormat("MM");

        Date date = new Date();

        int tMonth = Integer.parseInt(formatter.format(date));

        for(int i=sMonth;i<=tMonth;i++)
        {
            String monthName = new DateFormatSymbols().getMonths()[i-1];

            MonthlySalesData monthlySalesData = new MonthlySalesData();

            List<TotalSales> totalSales = resultSetExtractor.allDataForSalesPerson(monthName, empId);

            if(totalSales.size() == 0)
            {
                continue;
            }
            monthlySalesData.setMonth(monthName + " - 2022");

            monthlySalesData.setTotalSalesinMonth(totalSales);

            allMonthlySalesData.add(monthlySalesData);
        }
        return allMonthlySalesData;

    }

    public float getTotalSales(List<ProductSold> dummy) {
        float totalSales = 0;

        for(ProductSold product : dummy)
        {

            totalSales+=product.getCost();

        }

        return totalSales;
    }

    public float commission(List<ProductSold> productSoldByEmployee)
    {
        float totalCommision = 0;
        List<CommisionModel> commisionModels = commisionModelRepository.findAll();
        for(ProductSold product : productSoldByEmployee)
        {
            String typeId = product.getTypeId();
            Long cost = product.getCost();
            for(CommisionModel commisionModel : commisionModels)
            {
                if(typeId.equals("2W") && commisionModel.getTypeId().equals("2W"))
                {
                    if(cost<30000 && commisionModel.getCostRange().equals("<30k"))
                    {

                        int commision = commisionModel.getCommision();

                        totalCommision += calculateCommision(commision, cost);

                        break;
                    }
                    if(cost>=30000 && cost<50000 && commisionModel.getCostRange().equals(">30k<50k"))
                    {
                        int commision = commisionModel.getCommision();

                        totalCommision += calculateCommision(commision, cost);

                        break;
                    }
                    if(cost>=50000 && commisionModel.getCostRange().equals(">50k")){

                        int commision = commisionModel.getCommision();


                        totalCommision += calculateCommision(commision, cost);

                        break;
                    }
                }
                else if(typeId.equals("3W") && commisionModel.getTypeId().equals("3W"))
                {
                    if(cost<50000 && commisionModel.getCostRange().equals("<50k"))
                    {
                        int commision = commisionModel.getCommision();

                        totalCommision += calculateCommision(commision, cost);

                        break;
                    }
                    if(cost>=50000 && commisionModel.getCostRange().equals(">50k")){
                        int commision = commisionModel.getCommision();

                        totalCommision += calculateCommision(commision, cost);

                        break;
                    }
                }
                else if(typeId.equals("4W") && commisionModel.getTypeId().equals("4W"))
                {
                    if(cost<100000 && commisionModel.getCostRange().equals("<100k"))
                    {
                        int commision = commisionModel.getCommision();

                        totalCommision += calculateCommision(commision, cost);

                        break;
                    }
                    if(cost>=100000 && cost<500000 && commisionModel.getCostRange().equals(">100k<500k"))
                    {
                        int commision = commisionModel.getCommision();

                        totalCommision += calculateCommision(commision, cost);

                        break;
                    }
                    if(cost>=500000 && commisionModel.getCostRange().equals(">500k")){
                        int commision = commisionModel.getCommision();

                        totalCommision += calculateCommision(commision, cost);

                        break;
                    }
                }
                else{
                    if(cost<500000 && commisionModel.getCostRange().equals("<500k"))
                    {
                        int commision = commisionModel.getCommision();

                        totalCommision += calculateCommision(commision, cost);

                        break;
                    }
                    if(cost>=500000 && commisionModel.getCostRange().equals(">500k")){

                        int commision = commisionModel.getCommision();

                        totalCommision += calculateCommision(commision, cost);

                        break;
                    }
                }
            }
        }

        return totalCommision;
    }

    private float isAddExtraCommision(float totalCommision, String empId, float total) {
        String zoneId = employeeRepository.findZoneIdByEmpId(empId);

        float target = zoneRepository.findTargetByZoneId(zoneId);

        if(target <= total)
        {
            return (float) 1.2*totalCommision ;
        }

        return totalCommision;
    }

    public List<Employee> getEmployeeByEmpId(String empId) {

        return employeeRepository.getEmployeeByEmpId(empId);
    }

    public List<MonthlySales> getSalesByMonth(String str) {
        int ind = str.indexOf("d");

        int id = Integer.parseInt(str.substring(0,ind));

        String date = str.substring(ind+1, ind+8);

        System.out.println("Month "+ date);

        String empId = employeeRepository.findById(id).get().getEmpId();

        int month = Integer.parseInt(date.substring(5, 7));

        List<MonthlySales> monthlySales = new ArrayList<>();

        MonthlySales monthlySale = new MonthlySales();

        String monthName = new DateFormatSymbols().getMonths()[month-1];

        List<ProductSold> productsSold = productSoldRepository.findByEmpIdandMonth(empId, monthName);

        float totalSales = productSoldRepository.totalSales(empId, monthName);

        float totalCommision = 0;

        float directCommision = commission(productsSold);

        directCommision = isAddExtraCommision(directCommision, empId, totalSales);

        totalCommision = directCommision + indirectCommision(empId, monthName);

        monthlySale.setProductsSold(productsSold);

        monthlySale.setTotalSales(totalSales);

        monthlySale.setMonth(monthName + " - " + date.substring(0, 4));

        monthlySale.setCommision(totalCommision);

        monthlySales.add(monthlySale);

        return monthlySales;

    }

    public List<MonthlySalesData> getSalesByEmployeeInMonth(String str) throws SQLException {
        int ind = str.indexOf("d");

        int id = Integer.parseInt(str.substring(0, ind));

        String empId = employeeRepository.findById(id).get().getEmpId();

        String month = str.substring(ind+6, ind+8);

        List<MonthlySalesData> allMonthlySalesData = new ArrayList<>();

        String monthName = new DateFormatSymbols().getMonths()[Integer.parseInt(month)-1];

        MonthlySalesData monthlySalesData = new MonthlySalesData();

        List<TotalSales> totalSales = resultSetExtractor.allDataForSalesPerson(monthName, empId);

        monthlySalesData.setMonth(monthName + " - 2022");

        monthlySalesData.setTotalSalesinMonth(totalSales);

        allMonthlySalesData.add(monthlySalesData);

        return allMonthlySalesData;
    }

    public MonthlyQuotas getMonthlyQuota(String str) throws ParseException {
        int ind = str.indexOf("d");

        int id = Integer.parseInt(str.substring(0, ind));

        int ind1 = str.indexOf("-");

        String year = str.substring(ind1+1, ind1+5);

        String monthStr = str.substring(ind+1, ind+4);

        Date date1 = new SimpleDateFormat("MMM", Locale.ENGLISH).parse(monthStr);

        Calendar cal = Calendar. getInstance();

        cal.setTime(date1);

        int month = cal.get(Calendar.MONTH);

        if(Integer.toString(month+1).length()<2)
        {

            monthStr = "0"+Integer.toString(month+1);

        }
        else{
            monthStr = Integer.toString(month+1);
        }

        String date =year+"-"+monthStr;

        String empId = employeeRepository.findById(id).get().getEmpId();

        String zoneId = employeeRepository.findZoneIdByEmpId(empId);

        float tarQuota = zoneRepository.findTargetByZoneId(zoneId);

        List<ProductSold> productsSold = productSoldRepository.findByEmpId(empId);

        List<ProductSold> productSoldInMonth = new ArrayList<>();

        for(ProductSold productSold : productsSold)
        {
            if(productSold.getDateSold().substring(0, 7).equals(date))
            {
                productSoldInMonth.add(productSold);
            }
        }
        float completedQuota = getTotalSales(productSoldInMonth);

        MonthlyQuotas monthlyQuotas = new MonthlyQuotas();

        monthlyQuotas.setCompletedQuota(completedQuota);

        monthlyQuotas.setTargetQuota(tarQuota);

        return monthlyQuotas;
    }

    public float indirectCommision(String empId, String monthName)
    {
        float indirectCommision = 0;

        int level = employeeRepository.findLevelByEmpId(empId);

        List<String> employees = employeeRepository.findHisEmployeesByEmpId(empId);

        for(String employee : employees)
        {
            List<ProductSold> productSold1 = productSoldRepository.findByEmpIdandMonth(employee, monthName);

            indirectCommision = indirectCommision + commission(productSold1);
        }
        switch (level) {
            case 1:
                return (indirectCommision / 10);
            case 2:
                return (indirectCommision / 20);
            case 3:
                return (indirectCommision / 30);
        }
        return 0;
    }
}
