package com.logmaven.exmaven.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "username")
    @Basic(optional = false)
    private String username;

    @Column(name = "password")
    @Basic(optional = false)
    private String password;

    @Column(name = "hint")
    @Basic(optional = true)
    private String hint;

    @Column(name = "addeddate")
    @Basic(optional = false)
    private LocalDate addeddate;

    @Column(name = "userstatus")
    @Basic(optional = false)
    private Boolean userstatus;


    @ManyToOne
    @JoinColumn(name ="employee_id",referencedColumnName = "id")
    private Employee employee_id;


    @ManyToMany
    @JoinTable(name = "user_has_role",joinColumns = @JoinColumn(name = "User_id"),inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

}
