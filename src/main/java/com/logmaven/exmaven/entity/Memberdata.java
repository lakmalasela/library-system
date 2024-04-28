package com.logmaven.exmaven.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Memberdata {

    private String memberName;
    private double fineCharge;
    private String bookName;
}
