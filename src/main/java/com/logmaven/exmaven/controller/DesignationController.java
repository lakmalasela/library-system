package com.logmaven.exmaven.controller;

import com.logmaven.exmaven.entity.Designation;
import com.logmaven.exmaven.entity.Employee;
import com.logmaven.exmaven.repository.DesignationRepository;
import com.logmaven.exmaven.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/designation")
public class DesignationController {

    @Autowired
    private DesignationRepository daodesignation;

    @GetMapping(value = "/list")
    public List<Designation>designationList(){
        return daodesignation.findAll();
    }

}
