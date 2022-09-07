package com.example.SalesBackend.Service;

import com.example.SalesBackend.Exception.ResourceNotFoundException;
import com.example.SalesBackend.Helper.Helper;
import com.example.SalesBackend.Model.*;
import com.example.SalesBackend.Objects.*;
import com.example.SalesBackend.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.text.DateFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminrepository;

    @Autowired
    private DummyDataRepository dummyDataRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    @Autowired
    private ProductTypesRepository productTypesRepository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductSoldRepository productSoldRepository;

    @Autowired
    private CommisionModelRepository commisionModelRepository;

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private ResultSetExtractor resultSetExtractor;
    public Admin getAdminProfile(String emailId)
    {
        List<Admin> admins = adminrepository.findAll();
        for(Admin admin:admins)
        {
            if(admin.getEmailId().equals(emailId))
            {
                return admin;
            }
        }
        return null;
    }
    public List<Employee> getAllEmployees()
    {
        return employeeRepository.findAll();
    }
    public Employee findNameById(int id)
    {
        List<Employee> employees = getAllEmployees();
        for(Employee employee:employees)
        {
            if(employee.getId()==id)
            {
                return employee;
            }
        }
        return null;
    }

    public void deleteEmployeeById(int id)
    {
        employeeRepository.deleteById(id);
    }

    public void addEmployee(Employee employee)
    {
        employeeRepository.save(employee);

        LoginData loginData = new LoginData();

        loginData.setUsername(employee.getEmailId());

        loginData.setPassword(employee.getPassword());

        loginRepository.save(loginData);
    }

    public List<Zones> getAllZones()
    {
        return zoneRepository.findAll();
    }

    public List<ProductType> getProductTypes() {
        return productTypesRepository.findAll();
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void AddZone(Zones zone) {
        zoneRepository.save(zone);
    }

    public ResponseEntity<Admin> findById(int id) {

        Admin admin = adminrepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Id Does not Exists"));

        return ResponseEntity.ok(admin);
    }

    public Zones getZoneById(int id) {
        return zoneRepository.findById(id).get();
    }

    public Zones updateZone(Zones zone, int id) {

        Zones zoneDetails = zoneRepository.findById(id).get();

        zoneDetails.setZoneId(zone.getZoneId());

        zoneDetails.setCity(zone.getCity());

        zoneDetails.setTarMonQuota(zone.getTarMonQuota());

        zoneRepository.save(zoneDetails);

        return zoneDetails;
    }

    public Zones deleteZoneById(int id) {
        Zones zone = zoneRepository.findById(id).get();

        String zoneId = zone.getZoneId();

        zoneRepository.deleteById(id);

        deleteEmployeesByZones(zoneId);

        return zone;
    }

    private void deleteEmployeesByZones(String zoneId) {
        List<Employee> employees = employeeRepository.findAll();
        for(Employee employee : employees)
        {
            if(employee.getZoneId().equals(zoneId))
            {
                employeeRepository.deleteById(employee.getId());
            }
        }
    }

    public ProductType deleteProductTypeById(int id) {
        ProductType productType = productTypesRepository.findById(id).get();

        productTypesRepository.deleteById(id);

        return productType;
    }

    public void addProductType(ProductType productType) {
        productTypesRepository.save(productType);
    }

    public ProductType editProductTypeById(ProductType productType, int id) {
        ProductType productTypeDetails = productTypesRepository.findById(id).get();

        productTypeDetails.setType(productType.getType());

        productTypeDetails.setTypeId(productType.getTypeId());

        productTypesRepository.save(productTypeDetails);

        return productTypeDetails;
    }


    public ProductType getProductTypeById(int id)
    {
        return productTypesRepository.findById(id).get();
    }

    public Product deleteProductById(int id) {
        Product product = productRepository.findById(id).get();

        productRepository.deleteById(id);

        return product;
    }

    public Product addNewProduct(Product product) {

        productRepository.save(product);

        return product;
    }

    public Product updateProductById(int id, Product product) {
        Product productDetails = productRepository.findById(id).get();

        productDetails.setCost(product.getCost());

        productDetails.setTypeId(product.getTypeId());

        productDetails.setModel(product.getModel());

        productDetails.setModelName(product.getModelName());

        productDetails.setImageUrl(product.getImageUrl());

        productDetails.setDescription(product.getDescription());

        productRepository.save(productDetails);

        return productDetails;
    }

    public Product getProductById(int id) {
        return productRepository.findById(id).get();
    }


    public List<MonthlySales> getData(List<ProductSold> productsSold)
    {
        List<MonthlySales> monthlySales = new ArrayList<>();

        List<ProductSold> productsSoldInMonth = new ArrayList<>();

        String month = productsSold.get(0).getDateSold().substring(5,7);

        String year = productsSold.get(0).getDateSold().substring(0,4);

        String date = productsSold.get(0).getDateSold().substring(0,7);

        int intMonth = Integer.parseInt(month);

        String monthString = new DateFormatSymbols().getMonths()[intMonth-1];

        String prevMonth = month;

        for(ProductSold productSold : productsSold)
        {
            month = productSold.getDateSold().substring(5,7);

            year = productSold.getDateSold().substring(0,4);

            intMonth = Integer.parseInt(month);

            monthString = new DateFormatSymbols().getMonths()[intMonth-1] + " - " + year;

            if(!month.equals(prevMonth))
            {
                MonthlySales monthlySale = new MonthlySales();

                intMonth = Integer.parseInt(prevMonth);

                monthString = new DateFormatSymbols().getMonths()[intMonth-1] + " - " + year;

                monthlySale.setMonth(monthString);

                List<ProductSold> dummy = new ArrayList<>();

                for(ProductSold productSold1 : productsSoldInMonth) {

                    dummy.add(productSold1);
                }
                monthlySale.setProductsSold(dummy);

                float total = employeeService.getTotalSales(dummy);

                monthlySale.setTotalSales(total);

                monthlySale.setCommision(employeeService.commission(dummy));

                monthlySales.add(monthlySale);

                prevMonth = month;

                productsSoldInMonth.clear();

                productsSoldInMonth.add(productSold);
            }
            else
            {
                productsSoldInMonth.add(productSold);
            }
        }
        MonthlySales monthlySale = new MonthlySales();

        intMonth = Integer.parseInt(prevMonth);

        monthString = new DateFormatSymbols().getMonths()[intMonth-1] + " - " + year;

        monthlySale.setMonth(monthString);

        monthlySale.setProductsSold(productsSoldInMonth);

        monthlySale.setCommision(employeeService.commission(productsSoldInMonth));

        monthlySale.setTotalSales(employeeService.getTotalSales(productsSoldInMonth));

        monthlySales.add(monthlySale);

        return monthlySales;
    }
    public List<MonthlySales> getAllProductsSold()
    {
        List<MonthlySales> allMonthlSales = new ArrayList<>();

        int sMonth = Integer.parseInt(productSoldRepository.findById(1).get().getDateSold().substring(5, 7));

        SimpleDateFormat formatter = new SimpleDateFormat("MM");

        Date date = new Date();

        int tMonth = Integer.parseInt(formatter.format(date));

        for(int i=sMonth;i<=tMonth;i++)
        {
            MonthlySales monthlySales = new MonthlySales();

            String monthName = new DateFormatSymbols().getMonths()[i-1];

            List<ProductSold> productsSold = productSoldRepository.findtotalSalesInMonth(monthName);

            float totalSales = productSoldRepository.findTotalSalesValueInMonth(monthName);

            float totalCommision = 0;

            monthlySales.setMonth(monthName + " - " + 2022);

            monthlySales.setTotalSales(totalSales);

            monthlySales.setProductsSold(productsSold);

            monthlySales.setCommision(totalCommision);

            allMonthlSales.add(monthlySales);
        }

        return allMonthlSales;
    }


    public List<CommisionModel> getAllCommisionModels()
    {
        return commisionModelRepository.findAll();
    }

    public CommisionModel getCommisionModelById(int id) {
        return commisionModelRepository.findById(id).get();
    }

    public CommisionModel updateCommisionModelById(int id, CommisionModel commisionModel)
    {
        CommisionModel commisionModelDetails = commisionModelRepository.findById(id).get();

        commisionModelDetails.setCostRange(commisionModel.getCostRange());

        commisionModelDetails.setTypeId(commisionModel.getTypeId());

        commisionModelDetails.setCommision(commisionModel.getCommision());

        commisionModelRepository.save(commisionModelDetails);

        return commisionModelDetails;
    }

    public List<MonthlySalesData> getTotalSales() throws SQLException {
        List<MonthlySalesData> allMonthlySalesData = new ArrayList<>();

        int sMonth = Integer.parseInt(productSoldRepository.findById(1).get().getDateSold().substring(5,7));

        SimpleDateFormat formatter = new SimpleDateFormat("MM");

        Date date = new Date();

        int tMonth = Integer.parseInt(formatter.format(date));

        for(int i=sMonth;i<=tMonth;i++)
        {
            String monthName = new DateFormatSymbols().getMonths()[i-1];

            MonthlySalesData monthlySalesData = new MonthlySalesData();

            List<TotalSales> totalSales = resultSetExtractor.allData(monthName);

            monthlySalesData.setMonth(monthName + " - 2022");

            monthlySalesData.setTotalSalesinMonth(totalSales);

            allMonthlySalesData.add(monthlySalesData);

        }

        return allMonthlySalesData;
    }

    public List<MonthlySales> getAllProductsSoldInMonth(String str) {
        String date = str;

        int month = Integer.parseInt(date.substring(5, 7));

        List<MonthlySales> monthlySales = new ArrayList<>();

        MonthlySales monthlySales1 = new MonthlySales();

        String monthName = new DateFormatSymbols().getMonths()[month-1];

        List<ProductSold> productsSold = productSoldRepository.findAllProductSoldByMonth(date.substring(0,4), monthName);

        float totalSales = productSoldRepository.findTotalSalesValueInMonth(monthName);

        monthlySales1.setCommision(0);

        monthlySales1.setTotalSales(totalSales);

        monthlySales1.setMonth(monthName + " - " + date.substring(0,4));

        monthlySales1.setProductsSold(productsSold);

        monthlySales.add(monthlySales1);

        return monthlySales;
    }

    public List<MonthlySalesData> getTotalSalesInMonth(String str) throws SQLException {

        List<MonthlySalesData> allMonthlySalesData = new ArrayList<>();

        int month = Integer.parseInt(str.substring(5,7));

        String monthName = new DateFormatSymbols().getMonths()[month-1];

        MonthlySalesData monthlySalesData = new MonthlySalesData();

        List<TotalSales> totalSales = resultSetExtractor.allData(monthName);

        monthlySalesData.setMonth(monthName + " - 2022");

        monthlySalesData.setTotalSalesinMonth(totalSales);

        allMonthlySalesData.add(monthlySalesData);

        return allMonthlySalesData;
    }

    public List<dummyData> getAllPendingRequests() {
        return dummyDataRepository.findAll();
    }

    public List<dummyData> deletePendingRequestById(int productId) {

        dummyDataRepository.deleteById(productId);

        return dummyDataRepository.findAll();
    }

    public List<dummyData> approvePendingRequest(int productId) {
        ProductSold productSold = new ProductSold();

        dummyData data = dummyDataRepository.findById(productId).get();

        productSold.setDateSold(data.getDateSold());

        productSold.setProductId(data.getProductId());

        productSold.setCost(data.getCost());

        productSold.setEmpId(data.getEmpId());

        productSold.setTypeId(data.getTypeId());

        productSoldRepository.save(productSold);

        dummyDataRepository.deleteById(productId);

        return dummyDataRepository.findAll();


    }

    public String approveAllPendingRequests() {
        List<dummyData> allData = dummyDataRepository.findAll();

        for(dummyData data : allData )
        {
            ProductSold productSold = new ProductSold();

            productSold.setTypeId(data.getTypeId());

            productSold.setProductId(data.getProductId());

            productSold.setDateSold(data.getDateSold());

            productSold.setCost(data.getCost());

            productSold.setEmpId(data.getEmpId());

            productSoldRepository.save(productSold);
        }

        dummyDataRepository.deleteAll();

        return "Approved Successfully";
    }

    public void save(MultipartFile infile) {
        try {
            List<ProductSold> productSolds = Helper.convertExcelToListOfProduct(infile.getInputStream());

            productSoldRepository.saveAll(productSolds);

        } catch (IOException e) {

            e.printStackTrace();
        }
    }

    public String checkUser(String emailId) {
        List<String> allUsers = loginRepository.findAllUsers();
        if(allUsers.contains(emailId))
        {
            return "Yes Exixts";
        }
        else {
            throw new ResourceNotFoundException("User mailId does not exixts");
        }
    }
}