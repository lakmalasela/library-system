package com.logmaven.exmaven.repository;

import com.logmaven.exmaven.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee,Integer> {
}
