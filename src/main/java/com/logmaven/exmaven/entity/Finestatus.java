package com.logmaven.exmaven.entity;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "finestatus")
@AllArgsConstructor
@NoArgsConstructor
public class Finestatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    @Basic(optional = false)
    private String name;
}
