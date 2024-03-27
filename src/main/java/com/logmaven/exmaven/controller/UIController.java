package com.logmaven.exmaven.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class UIController {


    @GetMapping(value = "/dashboard")
    public  ModelAndView dashboard(){
        ModelAndView dashboardui = new ModelAndView();
        dashboardui.setViewName("Dashboard.html");
        return dashboardui;
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
