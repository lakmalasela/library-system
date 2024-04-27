package com.logmaven.exmaven.repository;

import com.logmaven.exmaven.entity.Book;
import com.logmaven.exmaven.entity.Employee;
import com.logmaven.exmaven.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRepository extends JpaRepository<Book,Integer> {

    @Query(value = "SELECT * FROM library_management.book as b where b.id in (select bi.book_id from library_management.bookinventory as bi where bi.availablebookcount >0)",nativeQuery = true)
    List<Book> bookfindinInventory();


//    @Query(value = "SELECT b.id,b.regno,bi.availablebookcount,bi.damagecount,bi.inventorystatus_id FROM library_management.book AS b\n" +
//            "INNER JOIN library_management.bookinventory AS bi ON b.id = bi.book_id",nativeQuery = true)
//    List<Book> findAllbook();
}
