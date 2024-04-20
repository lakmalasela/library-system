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




//
//        try{
//            daoemployee.save(employee);
//        }catch (Exception e){
//            return "Not Save Your Data"+e.getMessage();
//        }
//
//        return "There has some error";

//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
//        User user = userService.findUserByUserName(auth.getName());

//        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"CUSTOMER");

//
//        if(user!= null && priv != null && priv.get("add") ){
//            try{
//
//                customer.setArrearsamount(BigDecimal.valueOf(0.00));
//                customer.setVisitcount(Integer.valueOf(0));
//                dao.save(customer);
//                return "0";
//            }catch (Exception ex){
//                return "Not Save Your Data"+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
//            }
//
//        }else
//            return "Error Saving : You do not have previleges..!";







    }



}
