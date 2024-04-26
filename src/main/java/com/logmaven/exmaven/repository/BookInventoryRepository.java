package com.logmaven.exmaven.repository;

import com.logmaven.exmaven.entity.Book;
import com.logmaven.exmaven.entity.Bookinventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookInventoryRepository extends JpaRepository<Bookinventory,Integer> {

    @Query(value = "SELECT * FROM library_management.bookinventory as bi where bi.book_id in (select b.id from library_management.book as b)",nativeQuery = true)
    List<Bookinventory> findAllbook();
}
