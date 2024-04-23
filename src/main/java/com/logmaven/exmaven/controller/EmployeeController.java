package com.logmaven.exmaven.controller;

import com.logmaven.exmaven.entity.Employee;
import com.logmaven.exmaven.repository.EmployeeRepository;
import com.logmaven.exmaven.repository.EmployeestatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/employee")
public class EmployeeController {

    @Autowired
    private EmployeeRepository daoemployee;

    @Autowired
    private EmployeestatusRepository daoemployeestatus;

    @GetMapping(value = "/list")
    public List<Employee>employeeList(){
        return daoemployee.findAll();
    }


    //insert data
    @PostMapping
    public String insert(@RequestBody Employee employee){
        if(employee!= null ){
            try{

                employee.setEmpstatus_id(daoemployeestatus.getReferenceById(1));
                System.out.println("EEEE "+employee);
                daoemployee.save(employee);
                return "Added Successfull";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage();
            }

        }else
            return "0";


    }



    //update data
    @PutMapping
    public String update(@RequestBody Employee employee){
        System.out.println("EMP 1"+employee);
        if(employee != null ){
            try{
                employee.setEmpstatus_id(daoemployeestatus.getReferenceById(1));
                System.out.println("EMP 2"+employee);
                daoemployee.save(employee);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage();
            }


        }else
            return "0";


    }

    //delete data
    @DeleteMapping
    public String delete(@RequestBody Employee employee){
        if(employee != null ){
            try{
                employee.setEmpstatus_id(daoemployeestatus.getReferenceById(2));
                daoemployee.save(employee);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage();
            }


        }else
            return "0";


    }



}
