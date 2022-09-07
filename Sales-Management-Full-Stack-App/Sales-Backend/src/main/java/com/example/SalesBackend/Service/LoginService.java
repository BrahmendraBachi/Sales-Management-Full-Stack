package com.example.SalesBackend.Service;

import com.example.SalesBackend.Exception.ResourceNotFoundException;
import com.example.SalesBackend.Model.Admin;
import com.example.SalesBackend.Model.Employee;
import com.example.SalesBackend.Model.LoginData;
import com.example.SalesBackend.Repository.AdminRepository;
import com.example.SalesBackend.Repository.EmployeeRepository;
import com.example.SalesBackend.Repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {
    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AdminRepository adminRepository;
    public List<LoginData> getUsers()
    {
        System.out.println("AdminLoginRepository is Triggered");
        List<LoginData> allUsers = loginRepository.findAll();
        System.out.println("admins "+allUsers);
        return allUsers;
    }


    public String changePassword(LoginData user){
        System.out.println("userDetails");
        LoginData userDetails = loginRepository.findByUsername(user.getUsername());
        userDetails.setPassword(user.getPassword());
        try{
            Admin admin = adminRepository.findByEmailId(user.getUsername());
            admin.setPassword(user.getPassword());

            adminRepository.save(admin);
            loginRepository.save(userDetails);
            return "success";
        }
        catch (NullPointerException e)
        {
            System.out.println("Admin is not Present");
            System.out.println("Employee is Triggered");
            try
            {
                Employee employee = employeeRepository.findEmployeeByEmailId(user.getUsername());
                employee.setPassword(user.getPassword());
                employeeRepository.save(employee);
                loginRepository.save(userDetails);
                return "Success";
            }
            catch(Exception e1)
            {
                throw new ResourceNotFoundException("EmailId does not exists");
            }
        }
    }
}
