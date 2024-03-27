package com.logmaven.exmaven.controller;

//import com.logmaven.exmaven.entity.JwtRequest;
//import com.logmaven.exmaven.entity.JwtResponse;

import com.logmaven.exmaven.service.MyUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class LoginController {
//    @Autowired
//    private JWTUtility jwtUtility;

    @Autowired
    private AuthenticationManager authenticationManager ;

    @Autowired
    private MyUserDetailService myUserDetailService;


//    @RequestMapping(value ={"/login","/"}, method = RequestMethod.GET)
   @GetMapping(value = "/login")
    public ModelAndView loginUI(){
        ModelAndView loginui = new ModelAndView();
        loginui.setViewName("login.html");
        return loginui;
    }
//
//    @PostMapping(value = "/authnticate", consumes = "application/json")
//    public ResponseEntity<?> authnticate(@RequestBody JwtRequest jwtRequest) throws Exception{
//
//        try{
//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(
//                            jwtRequest.getUsername(),
//                            jwtRequest.getPassword()
//                    )
//            );
//        }catch (BadCredentialsException e){
//          throw  new Exception("INVALID CREDENTIALS ",e);
//        }
//
//        final UserDetails userDetails
//                = myUserDetailService.loadUserByUsername(jwtRequest.getUsername());
//
//        final String token = jwtUtility.generateToken(userDetails);
//
//        String redirectUrl;
//        if (userDetails.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
//            // Redirect to the admin dashboard
//            redirectUrl = "/dashboard";
//        } else {
//            // Redirect to the default user dashboard
//            redirectUrl = "/loginpage";
//        }
//
//        JwtResponse jwtResponse = new JwtResponse(token, redirectUrl);
//
//        return ResponseEntity.ok(jwtResponse);
//
////        return new JwtResponse(token);
//    }
}
