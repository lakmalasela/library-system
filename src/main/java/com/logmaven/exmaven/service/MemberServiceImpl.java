package com.logmaven.exmaven.service;


import com.logmaven.exmaven.entity.Memberdata;
import com.logmaven.exmaven.repository.MemberRepository;
import com.logmaven.exmaven.repository.Memberservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
public class MemberServiceImpl implements Memberservice {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Memberdata> getMemberData(int memberId) {
        String sql = "SELECT m.name, f.charge, b.name AS bookname " +
                "FROM library_management.member AS m " +
                "INNER JOIN library_management.bookissue AS bi ON m.id = bi.member_id " +
                "INNER JOIN library_management.fine AS f ON f.bookissue_id = bi.id " +
                "INNER JOIN library_management.book AS b ON b.id = bi.book_id " +
                "WHERE f.finestatus_id = 1 AND m.id = ?";
        return jdbcTemplate.query(sql, new Object[]{memberId}, (rs, rowNum) -> {
            Memberdata memberData = new Memberdata();
            memberData.setMemberName(rs.getString("name"));
            memberData.setFineCharge(rs.getDouble("charge"));
            memberData.setBookName(rs.getString("bookname"));
            return memberData;
        });
    }
}
