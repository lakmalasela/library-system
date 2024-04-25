package com.logmaven.exmaven.repository;

import com.logmaven.exmaven.entity.Book;
import com.logmaven.exmaven.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book,Integer> {
}
