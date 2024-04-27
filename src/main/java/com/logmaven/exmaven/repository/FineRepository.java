package com.logmaven.exmaven.repository;

import com.logmaven.exmaven.entity.Book;
import com.logmaven.exmaven.entity.Fine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FineRepository extends JpaRepository<Fine,Integer> {
//    @Query(value = "SELECT b.id,b.regno,bi.availablebookcount,bi.damagecount,bi.inventorystatus_id FROM library_management.book AS b\n" +
//            "INNER JOIN library_management.bookinventory AS bi ON b.id = bi.book_id",nativeQuery = true)
//    List<Book> findAllbook();
}
