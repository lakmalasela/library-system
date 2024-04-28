package com.logmaven.exmaven.repository;

import com.logmaven.exmaven.entity.Book;
import com.logmaven.exmaven.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member,Integer> {


    @Query(value = "SELECT m.name, f.charge,b.name as bookname FROM library_management.member as m inner join  library_management.bookissue as bi on m.id = bi.member_id inner join library_management.fine as f on f.bookissue_id=bi.id inner join library_management.book as b on b.id = bi.book_id where f.finestatus_id=1 and m.id=:memberid",nativeQuery = true)
    List getfinebymemberdetails(@Param("memberid") int memberid);
}
