package com.logmaven.exmaven.repository;

import com.logmaven.exmaven.entity.Memberdata;

import java.util.List;

public interface Memberservice {

    List<Memberdata> getMemberData(int memberId);
}
