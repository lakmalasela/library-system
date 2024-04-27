package com.logmaven.exmaven.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class UIController {


    @GetMapping(value = "/dashboard")
    public  ModelAndView dashboard(){
        ModelAndView dashboardui = new ModelAndView();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // Add the username to the model
        dashboardui.addObject("username", username);
        dashboardui.setViewName("Dashboard.html");
        return dashboardui;
    }


    @GetMapping(value = "/employee")
    public  ModelAndView emplopyee(){
        ModelAndView employeeui = new ModelAndView();
        employeeui.setViewName("Employee.html");
        return employeeui;
    }

    @GetMapping(value = "/bookissue")
    public  ModelAndView bookissue(){
        ModelAndView bookissueui = new ModelAndView();
        bookissueui.setViewName("Bookissue.html");
        return bookissueui;
    }

    @GetMapping(value = "/fine")
    public  ModelAndView fine(){
        ModelAndView employeeui = new ModelAndView();
        employeeui.setViewName("Fine.html");
        return employeeui;
    }

    @GetMapping(value = "/book")
    public  ModelAndView book(){
        ModelAndView bookui = new ModelAndView();
        bookui.setViewName("Book.html");
        return bookui;
    }


    @GetMapping(value = "/inventory")
    public  ModelAndView bookinventory(){
        ModelAndView bookinventoryui = new ModelAndView();
        bookinventoryui.setViewName("Inventory.html");
        return bookinventoryui;
    }
//    public ModelAndView loginUI(){
//        ModelAndView loginui = new ModelAndView();
//        loginui.setViewName("login.html");
//        return loginui;
//    }

//
//    @GetMapping(value = "/dashboard")
//    public  String loginSucess(){
//        return "Login Success";
//    }

    @GetMapping(value = "/access-denied")
    public  String accessdenied(){
        return "Accessdenied 404";
    }


}
