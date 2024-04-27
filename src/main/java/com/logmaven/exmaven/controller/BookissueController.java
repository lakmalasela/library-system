package com.logmaven.exmaven.controller;

import com.logmaven.exmaven.entity.Book;
import com.logmaven.exmaven.entity.Bookinventory;
import com.logmaven.exmaven.entity.Bookissue;
import com.logmaven.exmaven.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/bookissue")
public class BookissueController {

    @Autowired
    private BookissueRepository daobookissue;

    @Autowired
    private BookInventoryRepository daobookinventory;

    @Autowired
    private BookRepository daobook;

    @Autowired
    private BookissuestatusRepository daobookissuestatus;

    @Autowired
    private BookInventorystatusRepository daobookinventorystatus;



    @GetMapping(value = "/list")
    public List<Bookissue>employeeList(){
        return daobookissue.findAll();
    }


    //insert data WITH inventory up
    @PostMapping
    public String insert(@RequestBody Bookissue bookissue){
        if(bookissue!= null ){
            try{
                System.out.println("BBBBBBBBBB "+bookissue);
                bookissue.setIssuestatus_id(daobookissuestatus.getReferenceById(1));
//                Bookinventory bookinventory = new Bookinventory();
                daobookissue.save(bookissue);
                Bookinventory bookinventory = daobookinventory.getReferenceById(bookissue.getBook_id().getId());
//                Book book = daobook.getBookinventory(bookissue.getBook_id());
                bookinventory.setBook_id(bookissue.getBook_id());
                bookinventory.setAvailablebookcount((bookinventory.getAvailablebookcount())-1);
                bookinventory.setDamagecount(0);
                bookinventory.setInventorystatus_id(daobookinventorystatus.getReferenceById(1));
                daobookinventory.save(bookinventory);
                return "Added Successfull";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage();
            }

        }else
            return "0";


    }
////
//    //book in inventory
//    // /book/bookininventory
//    @GetMapping(value = "/bookininventory")
//    public List<Book>bookListinInventory(){
//        return daobook.bookfindinInventory();
//    }

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
