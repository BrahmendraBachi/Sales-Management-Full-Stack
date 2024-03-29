package com.example.SalesBackend.Controller;


import com.example.SalesBackend.Exception.ResourceNotFoundException;
import com.example.SalesBackend.Helper.Helper;
import com.example.SalesBackend.Model.*;
import com.example.SalesBackend.Objects.*;
import com.example.SalesBackend.Repository.ProductSoldRepository;
import com.example.SalesBackend.Service.LoginService;
import com.example.SalesBackend.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/Admin")
@CrossOrigin("*")
public class AdminController {
    @Autowired
    private AdminService adminService;


    @Autowired
    private ResultSetExtractor resultSetExtractor;

    @Autowired
    private LoginService loginService;

    @Autowired
    private ProductSoldRepository productSoldRepository;

    @PostMapping("/Login")
    public Admin AdminLogin(@RequestBody LoginData admin) {
        System.out.println(admin.getUsername());
        List<LoginData> admins = loginService.getUsers();
        for(LoginData a:admins)
        {
            if(a.getUsername().equals(admin.getUsername()))
            {
                if(a.getPassword().equals(admin.getPassword()))
                {
                    return adminService.getAdminProfile(admin.getUsername());
                }
            }
        }
        System.out.println("Error");
        throw new ResourceNotFoundException("Bad Credentials!!! EmailId or Password does not Exists");
    }

    @GetMapping("/getAllEmployees")
    public List<Employee> getAllEmployees()
    {
        System.out.println("GetEmployees List");
        return adminService.getAllEmployees();
    }

    @DeleteMapping("/deleteEmployee/{id}")
    public Employee deleteEmployee(@PathVariable int id)
    {
        System.out.println("Employee Deleted Successfully");
        Employee employee = adminService.findNameById(id);
        adminService.deleteEmployeeById(id);
        return employee;
    }

    @PostMapping("/AddEmployee")
    public Employee AddEmployee(@RequestBody Employee employee)
    {
        adminService.addEmployee(employee);
        return employee;
    }
    @GetMapping("/getAllZones")
    private List<Zones> getAllZones()
    {
        return adminService.getAllZones();
    }

    @GetMapping("/getAllProductTypes")
    private List<ProductType> getAllProductTypes()
    {
        return adminService.getProductTypes();
    }

    @GetMapping("/getAllProducts")
    private List<Product> getAllProducts()
    {
        System.out.println("Get All Products is Triggered");
        return adminService.getAllProducts();
    }

    @GetMapping("/get-productby-productId/{productId}")
    public List<Product> getProductByProductId(@PathVariable String productId){
        return adminService.getProductByProductId(productId);
    }

    @PostMapping("/Add_Zone")
    public Zones AddZone(@RequestBody Zones zone)
    {
        adminService.AddZone(zone);
        return zone;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable int id)
    {
        return adminService.findById(id);
    }

    @GetMapping("/zone/{id}")
    public Zones getZoneById(@PathVariable int id)
    {
        return adminService.getZoneById(id);
    }

    @PutMapping("/updateZone/{id}")
    public Zones updateZone(@PathVariable int id, @RequestBody Zones zone)
    {
        return adminService.updateZone(zone, id);
    }

    @DeleteMapping("/deleteZone/{id}")
    public Zones deleteZoneById(@PathVariable int id)
    {
        return adminService.deleteZoneById(id);
    }

    @DeleteMapping("product-type/delete/{id}")
    public ProductType deleteProductTypeById(@PathVariable int id)
    {
        return adminService.deleteProductTypeById(id);
    }

    @PostMapping("/add-product-type")
    public ProductType addProductType(@RequestBody ProductType productType)
    {
        adminService.addProductType(productType);
        return productType;
    }

    @PutMapping("/edit-product-type-by-Id/{id}")
    public ProductType editProductTypeById(@RequestBody ProductType productType, @PathVariable int id)
    {
        System.out.println("edit Employee is Triggered");
        return adminService.editProductTypeById(productType, id);
    }

    @GetMapping("/getProductTypeById/{id}")
    public ProductType getProductTypeById(@PathVariable int id)
    {
        System.out.println("Get Product Type By Id is Triggered");
        return adminService.getProductTypeById(id);
    }

    @DeleteMapping("/delete-product/{id}")
    public Product deleteProductById(@PathVariable int id)
    {
        return adminService.deleteProductById(id);
    }

    @PostMapping("/add-new-product")
    public Product addNewProduct(@RequestBody Product product)
    {
        return adminService.addNewProduct(product);
    }

    @PutMapping("/update-product/{id}")
    public Product updateProductById(@RequestBody Product product, @PathVariable int id)
    {
        return adminService.updateProductById(id, product);
    }

    @GetMapping("/product/{id}")
    public Product getProductById(@PathVariable int id)
    {
        return adminService.getProductById(id);
    }

    @GetMapping("/productSold")
    public List<MonthlySales> getProductsSold()
    {
        System.out.println("getProductSold is triggered");
        return adminService.getAllProductsSold();
    }

    @GetMapping("/productsoldByMonth/{str}")
    public List<MonthlySales> getProductSoldByMonth(@PathVariable String str)
    {
        return adminService.getAllProductsSoldInMonth(str);
    }

    @GetMapping("/CommisionModels")
    public List<CommisionModel> getAllCommisionModels()
    {
        return adminService.getAllCommisionModels();
    }

    @GetMapping("commision-model/{id}")
    public CommisionModel getCommisionModelById(@PathVariable int id)
    {
        return adminService.getCommisionModelById(id);
    }

    @PutMapping("update-commision-model/{id}")
    public CommisionModel updateCommisionModelById(@PathVariable int id, @RequestBody CommisionModel commisionModel)
    {
        return adminService.updateCommisionModelById(id, commisionModel);
    }

    @GetMapping("/total-sales")
    public List<MonthlySalesData> getTotalSales() throws SQLException {
        System.out.println("Total Sales is Triggered");
        return adminService.getTotalSales();
    }

    @GetMapping("/total-sales-in-month/{str}")
    public List<MonthlySalesData> getTotalSalesInMonth(@PathVariable String str) throws SQLException {
        System.out.println("Total Sales In Month is triggered");
        return adminService.getTotalSalesInMonth(str);
    }

    @GetMapping("/get-pending-requests")
    public List<DummyData> getPendingRequests()
    {
        System.out.println("Get Pending Requests is Triggered");
        return adminService.getAllPendingRequests();
    }

    @DeleteMapping("delete-request-byId/{pId}")
    public List<DummyData> deletePendingRequestById(@PathVariable int pId)
    {
        return adminService.deletePendingRequestById(pId);
    }

    @PutMapping("approve-request-by-Id/{pId}")
    public List<DummyData> approveRequestById(@PathVariable int pId)
    {
        return adminService.approvePendingRequest(pId);
    }

    @PutMapping("approve-all-pending-requests")
    public String approveAllRequests()
    {
        return adminService.approveAllPendingRequests();
    }


    @PostMapping("/product-sold-data/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {

        if(Helper.checkExcelFormat(file)) {

            System.out.println(file);

            this.adminService.save(file);

            return ResponseEntity.ok(Map.of("message", "File is uploaded and data is saved to db"));
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please upload excel file ");
    }

    @GetMapping("/check-user/{emailId}")
    public String checkUser(@PathVariable String emailId)
    {
        return adminService.checkUser(emailId);
    }

}