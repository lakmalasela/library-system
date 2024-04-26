package com.logmaven.exmaven.controller;

import com.logmaven.exmaven.entity.Book;
import com.logmaven.exmaven.entity.Bookinventory;
import com.logmaven.exmaven.repository.BookInventoryRepository;
import com.logmaven.exmaven.repository.BookInventorystatusRepository;
import com.logmaven.exmaven.repository.BookRepository;
import com.logmaven.exmaven.repository.BookstatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/inventory")
public class InventoryController {

    @Autowired
    private BookInventoryRepository daobookinventory;

//    @Autowired
//    private BookRepository daobook;

    @GetMapping(value = "/list")
    public List<Bookinventory>inventoryList(){
        return daobookinventory.findAllbook();
    }



}
