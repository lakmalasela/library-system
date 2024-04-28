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
    //bookissue/finemember?memberid=7
    @GetMapping(value = "/finemember",params = {"memberid"},produces = "application/json")
    public Integer memberfineList(@RequestParam("memberid") int memberid){
        return daobookissue.getfinebymember(memberid);
    }

    //bookissue/finebookissue?memberid = 1
    @GetMapping(value = "/finebookissue",params = {"memberid"},produces = "application/json")
    public Bookissue membergetbookissue(@RequestParam("memberid") int memberid){
        return daobookissue.getfinebybookissue(memberid);
    }
////
//    //book in inventory
//    // /book/bookininventory
//    @GetMapping(value = "/bookininventory")
//    public List<Book>bookListinInventory(){
//        return daobook.bookfindinInventory();
//    }



    //delete data
    @DeleteMapping
    public String delete(@RequestBody Bookissue bookissue){
        if(bookissue != null ){
            try{
                bookissue.setIssuestatus_id(daobookissuestatus.getReferenceById(2));
                daobookissue.save(bookissue);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage();
            }


        }else
            return "0";


    }



}
