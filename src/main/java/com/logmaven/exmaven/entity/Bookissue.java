package com.logmaven.exmaven.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "bookissue")
@AllArgsConstructor
@NoArgsConstructor
public class Bookissue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name ="member_id",referencedColumnName = "id")
    private Member member_id;

    @ManyToOne
    @JoinColumn(name ="book_id",referencedColumnName = "id")
    private Book book_id;

    @Basic(optional = false)
    @Column(name = "issuedate")
    private LocalDate issuedate;

    @Basic(optional = false)
    @Column(name = "returndate")
    private LocalDate returndate;

    @ManyToOne
    @JoinColumn(name ="issuestatus_id",referencedColumnName = "id")
    private Issuestatus issuestatus_id;

    @ManyToOne
    @JoinColumn(name ="employee_id",referencedColumnName = "id")
    private Employee employee_id;


}
