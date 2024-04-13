package com.logmaven.exmaven.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "bookinventory")
@AllArgsConstructor
@NoArgsConstructor
public class Bookinventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name ="book_id",referencedColumnName = "id")
    private Book book_id;

    @Basic(optional = false)
    @Column(name = "author")
    private String author;


    @Basic(optional = false)
    @Column(name = "regno")
    private String regno;


    @Column(name = "price")
    @Basic(optional = false)
    private BigDecimal price;




}
