package com.logmaven.exmaven.repository;

import com.logmaven.exmaven.entity.Bookstatus;
import com.logmaven.exmaven.entity.Employeestatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookstatusRepository extends JpaRepository<Bookstatus,Integer> {
}
