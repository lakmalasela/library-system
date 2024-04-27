package com.logmaven.exmaven.repository;

import com.logmaven.exmaven.entity.Bookissue;
import com.logmaven.exmaven.entity.Issuestatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookissuestatusRepository extends JpaRepository<Issuestatus,Integer> {

}
