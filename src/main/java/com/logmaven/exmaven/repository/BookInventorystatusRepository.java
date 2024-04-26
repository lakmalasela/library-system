package com.logmaven.exmaven.repository;

import com.logmaven.exmaven.entity.Bookinventory;
import com.logmaven.exmaven.entity.Bookinventorystatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookInventorystatusRepository extends JpaRepository<Bookinventorystatus,Integer> {
}
