//package com.logmaven.exmaven.controller;
//
//import com.logmaven.exmaven.entity.Book;
//import com.logmaven.exmaven.entity.Bookinventory;
//import com.logmaven.exmaven.repository.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping(value = "/fine")
//public class FineController {
//
//    @Autowired
//    private FineRepository daofine;
//
//    @Autowired
//    private BookstatusRepository daobookstatus;
//
//    @Autowired
//    private BookInventoryRepository daobookinventory;
//
//    @Autowired
//    private BookInventorystatusRepository daobookinventorystatus;
//
//    @GetMapping(value = "/list")
//    public List<Book>employeeList(){
//        return daobook.findAll();
//    }
//
//
//    //insert data
//    @PostMapping
//    public String insert(@RequestBody Book book){
//        if(book!= null ){
//            try{
//                System.out.println("BBBBBBBBBB "+book);
//                book.setBookstatus_id(daobookstatus.getReferenceById(1));
//                Bookinventory bookinventory = new Bookinventory();
//                daobook.save(book);
//                bookinventory.setBookcount(book.getBookcount());
//                bookinventory.setAvailablebookcount(book.getBookcount());
//                bookinventory.setDamagecount(0);
//                bookinventory.setInventorystatus_id(daobookinventorystatus.getReferenceById(1));
//                bookinventory.setBook_id(book);
//                daobookinventory.save(bookinventory);
//                return "Added Successfull";
//            }catch (Exception ex){
//                return "Not Save Your Data"+ex.getMessage();
//            }
//
//        }else
//            return "0";
//
//
//    }
//
//
//
//    //update data
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
//
//    //delete data
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
//
//
//
//}
