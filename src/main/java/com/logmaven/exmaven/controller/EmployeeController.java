package com.logmaven.exmaven.controller;

import com.logmaven.exmaven.entity.Employee;
import com.logmaven.exmaven.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/employee")
public class EmployeeController {

    @Autowired
    private EmployeeRepository daoemployee;

    @GetMapping(value = "/list")
    public List<Employee>employeeList(){
        return daoemployee.findAll();
    }

}
