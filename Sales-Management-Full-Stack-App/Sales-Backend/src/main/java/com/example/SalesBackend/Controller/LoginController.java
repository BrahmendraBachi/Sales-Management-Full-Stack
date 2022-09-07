package com.example.SalesBackend.Controller;

import com.example.SalesBackend.Exception.ResourceNotFoundException;
import com.example.SalesBackend.Model.Admin;
import com.example.SalesBackend.Model.Employee;
import com.example.SalesBackend.Model.LoginData;
import com.example.SalesBackend.Service.AdminService;
import com.example.SalesBackend.Service.EmployeeService;
import com.example.SalesBackend.Service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/login")
@RestController
@CrossOrigin("*")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/Admin")
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

    @PostMapping("/Employee")
    public Employee empLogin(@RequestBody LoginData loginData)
    {
        System.out.println("EmpLogin triggered");
        List<LoginData> users = loginService.getUsers();
        for(LoginData user : users)
        {
            if(loginData.getUsername().equals(user.getUsername()))
            {
                if(loginData.getPassword().equals(user.getPassword()))
                {
                    Employee employee = employeeService.getEmployee(loginData.getUsername());
                    return employee;
                }
            }
        }
        System.out.println("Error is Triggered");
        throw new ResourceNotFoundException("Bad Credentials!!! EmailId or Password does not Exists");
    }

    @PostMapping("/change-password")
    public String ChangePassword(@RequestBody LoginData user)
    {
        System.out.println("Change Password is Triggered");
        System.out.println(user.getPassword());
        System.out.println(user.getUsername());
        System.out.println("Change Password is Triggered");
        return loginService.changePassword(user);
    }
}
