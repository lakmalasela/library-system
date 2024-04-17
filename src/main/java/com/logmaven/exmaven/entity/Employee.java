package com.logmaven.exmaven.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "employee")
@AllArgsConstructor
@NoArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "empname")
    @Basic(optional = false)
    private String empname;

    @Column(name = "empcode")
    @Basic(optional = false)
    private String empcode;

    @Column(name = "nic")
    @Basic(optional = false)
    private String nic;

    @Column(name = "phone")
    @Basic(optional = false)
    private String phone;

    @ManyToOne
    @JoinColumn(name ="designation_id",referencedColumnName = "id")
    private Designation designation_id;

    @ManyToOne
    @JoinColumn(name ="empstatus_id",referencedColumnName = "id")
    private Employeestatus empstatus_id;




}
