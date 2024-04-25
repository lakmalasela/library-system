package com.logmaven.exmaven.controller;

import com.logmaven.exmaven.entity.Book;
import com.logmaven.exmaven.entity.Bookstatus;
import com.logmaven.exmaven.entity.Employee;
import com.logmaven.exmaven.repository.BookRepository;
import com.logmaven.exmaven.repository.BookstatusRepository;
import com.logmaven.exmaven.repository.EmployeeRepository;
import com.logmaven.exmaven.repository.EmployeestatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/book")
public class BookController {

    @Autowired
    private BookRepository daobook;

    @Autowired
    private BookstatusRepository daobookstatus;

    @GetMapping(value = "/list")
    public List<Book>employeeList(){
        return daobook.findAll();
    }


    //insert data
    @PostMapping
    public String insert(@RequestBody Book book){
        if(book!= null ){
            try{
                System.out.println("BBBBBBBBBB "+book);
                book.setBookstatus_id(daobookstatus.getReferenceById(1));
                daobook.save(book);
                return "Added Successfull";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage();
            }

        }else
            return "0";


    }



    //update data
    @PutMapping
    public String update(@RequestBody Book book){
        if(book != null ){
            try{
                book.setBookstatus_id(daobookstatus.getReferenceById(1));
                daobook.save(book);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage();
            }


        }else
            return "0";


    }

    //delete data
    @DeleteMapping
    public String delete(@RequestBody Book book){
        if(book != null ){
            try{
                book.setBookstatus_id(daobookstatus.getReferenceById(2));
                daobook.save(book);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage();
            }


        }else
            return "0";


    }



}
