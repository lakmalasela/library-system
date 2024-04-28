package com.logmaven.exmaven.repository;

import com.logmaven.exmaven.entity.Book;
import com.logmaven.exmaven.entity.Bookissue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookissueRepository extends JpaRepository<Bookissue,Integer> {


    @Query(value = "SELECT datediff(bis.returndate,bis.issuedate) as fined FROM library_management.bookissue as bis where bis.member_id=:memberid and bis.issuestatus_id=3",nativeQuery = true)
    Integer getfinebymember(@Param("memberid") int memberid);

    @Query(value = "SELECT * FROM library_management.bookissue as bis where bis.member_id=:memberid and bis.issuestatus_id=3",nativeQuery = true)
    Bookissue getfinebybookissue(@Param("memberid") int memberid);
}
