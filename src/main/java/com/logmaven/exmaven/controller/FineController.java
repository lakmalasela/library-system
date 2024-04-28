package com.logmaven.exmaven.controller;

import com.logmaven.exmaven.entity.Book;
import com.logmaven.exmaven.entity.Bookinventory;
import com.logmaven.exmaven.entity.Fine;
import com.logmaven.exmaven.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "/fine")
public class FineController {

    @Autowired
    private FineRepository daofine;

    @Autowired
    private BookstatusRepository daobookstatus;

   @Autowired
   private FinestatusRepository daofinstatus;

    @GetMapping(value = "/list")
    public List<Fine>employeeList(){
        return daofine.findAll();
    }


    //insert data
    @PostMapping
    public String insert(@RequestBody Fine fine){
        System.out.println("FOOOOOOO "+fine);
        if(fine!= null ){
            try{
                fine.setFinestatus_id(daofinstatus.getReferenceById(1));
               fine.setAddedate(LocalDate.now());
                System.out.println("FOOOOOOO "+fine);
                daofine.save(fine);
                return "Added Successfull";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage();
            }

        }else
            return "0";


    }



    //update data
//    @PutMapping
//    public String update(@RequestBody Book book){
//        if(book != null ){
//            try{
//                book.setBookstatus_id(daobookstatus.getReferenceById(1));
//                daobook.save(book);
//                return "0";
//            }catch (Exception ex){
//                return "Not Save Your Data"+ex.getMessage();
//            }
//
//
//        }else
//            return "0";
//
//
//    }

    //delete data
//    @DeleteMapping
//    public String delete(@RequestBody Book book){
//        if(book != null ){
//            try{
//                book.setBookstatus_id(daobookstatus.getReferenceById(2));
//                daobook.save(book);
//                return "0";
//            }catch (Exception ex){
//                return "Not Save Your Data"+ex.getMessage();
//            }
//
//
//        }else
//            return "0";
//
//
//    }



}
