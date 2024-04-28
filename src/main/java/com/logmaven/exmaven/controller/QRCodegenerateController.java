package com.logmaven.exmaven.controller;

import com.google.zxing.WriterException;
import com.logmaven.exmaven.entity.Memberdata;
import com.logmaven.exmaven.repository.Memberservice;
import com.logmaven.exmaven.service.MemberServiceImpl;
import com.logmaven.exmaven.service.QRCodegenerateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Controller
public class QRCodegenerateController {


    @Autowired
    private Memberservice memberService;

    @Autowired
    private QRCodegenerateService qrCodegenerateService;

    private static final String QR_CODE_IMAGE_PATH = "./src/main/resources/static/img/QRCode.png";

    @GetMapping("/qrcode")
    public ModelAndView generateQRCode(@RequestParam("memberid") int memberId) {
        ModelAndView modelAndView = new ModelAndView("qrcode.html");

        byte[] image = new byte[0];
        String qrcode = "";

        try {
            List<Memberdata> memberDataList = memberService.getMemberData(memberId);
            if (!memberDataList.isEmpty()) {
                Memberdata memberData = memberDataList.get(0); // Assuming there's only one member data returned
                // Generate QR code data based on member data
                String qrCodeData = "Member Name: " + memberData.getMemberName() +
                        ", Fine Charge: " + memberData.getFineCharge() +
                        ", Book Name: " + memberData.getBookName();

                // Generate QR code image
                qrCodegenerateService.generateQRCodeImage(qrCodeData, 250, 250, QR_CODE_IMAGE_PATH);
                image = qrCodegenerateService.getQRCodeImage(qrCodeData, 250, 250);

                // Convert image to base64 string
                qrcode = Base64.getEncoder().encodeToString(image);
            } else {
                modelAndView.addObject("error", "No member data found for the given member ID");
            }
        } catch (IOException | WriterException e) {
            e.printStackTrace(); // Handle this more gracefully
            modelAndView.addObject("error", "Failed to generate QR code");
        }

        modelAndView.addObject("qrcode", qrcode);
        return modelAndView;
    }

//    @Autowired
//    QRCodegenerateService qrCodegenerateService;
//
//    private static final String QR_CODE_IMAGE_PATH = "./src/main/resources/static/img/QRCode.png";
//
//    final String FINE_MEMBER_SERVIE_URL = "http://localhost:8080/member/finmemberqr?memberid=";
//
//    @GetMapping("/qrcode ")
//    public ModelAndView QRCode(){
//        ModelAndView modelAndView = new ModelAndView("qrcode.html");
//
//        byte[] image = new byte[0];
//        String qrcode = "";
//
//        try {
//            //String dataTs = fetchfinemember(FINE_MEMBER_SERVIE_URL);
//            qrCodegenerateService.generateQRCodeImage(dataTs,250,250,QR_CODE_IMAGE_PATH);
//            image = qrCodegenerateService.getQRCodeImage(dataTs,250,250);
//
//            qrcode = Base64.getEncoder().encodeToString(image);
//        }catch (WriterException | IOException e){
//            e.printStackTrace();
//        }
//        modelAndView.addObject("qrcode",qrcode);
//        return modelAndView;
//    }
//
//    private String fetchfinemember(String url){
//        RestTemplate restTemplate = new RestTemplate();
//
//        String dataTs = restTemplate.getForObject(url,String.class);
//        return dataTs;
//    }
}
