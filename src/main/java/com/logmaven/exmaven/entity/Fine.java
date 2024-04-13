package com.logmaven.exmaven.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "fine")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Fine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "charge")
    @Basic(optional = false)
    private BigDecimal charge;

    @ManyToOne
    @JoinColumn(name ="bookissue_id",referencedColumnName = "id")
    private Bookissue bookissue_id;

    @Basic(optional = false)
    @Column(name = "addedate")
    private LocalDate addedate;

    @ManyToOne
    @JoinColumn(name ="finestatus_id",referencedColumnName = "id")
    private Finestatus finestatus_id;



}
