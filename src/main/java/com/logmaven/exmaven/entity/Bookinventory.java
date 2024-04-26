package com.logmaven.exmaven.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
@Table(name = "bookinventory")
@AllArgsConstructor
@NoArgsConstructor
public class Bookinventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name ="inventorystatus_id",referencedColumnName = "id")
    private Bookinventorystatus inventorystatus_id;

    @ManyToOne
    @JoinColumn(name ="book_id",referencedColumnName = "id")
    private Book book_id;


    @Basic(optional = false)
    @Column(name = "bookcount")
    private Integer bookcount;


    @Basic(optional = false)
    @Column(name = "availablebookcount")
    private Integer availablebookcount;


    @Column(name = "damagecount")
    @Basic(optional = false)
    private Integer damagecount;




}
