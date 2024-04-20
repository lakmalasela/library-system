package com.logmaven.exmaven.repository;

import com.logmaven.exmaven.entity.Designation;
import com.logmaven.exmaven.entity.Employeestatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeestatusRepository extends JpaRepository<Employeestatus,Integer> {
}
