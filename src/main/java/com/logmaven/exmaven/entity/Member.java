package com.logmaven.exmaven.entity;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "member")
@AllArgsConstructor
@NoArgsConstructor
public class Member {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;


    @Column(name = "name")
    @Basic(optional = false)
    private String name;


    @Column(name = "nic")
    @Basic(optional = false)
    private String nic;

    @Column(name = "addeddate")
    @Basic(optional = false)
    private LocalDate addeddate;

    @ManyToOne
    @JoinColumn(name ="memberstatus_id",referencedColumnName = "id")
    private Memberstatus memberstatus_id;

}
