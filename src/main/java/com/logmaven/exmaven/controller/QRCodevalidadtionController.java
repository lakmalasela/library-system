//package com.logmaven.exmaven.controller;
//
//
//import com.google.zxing.*;
//import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
//import com.google.zxing.common.HybridBinarizer;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import javax.imageio.ImageIO;
//import java.awt.image.BufferedImage;
//import java.io.ByteArrayInputStream;
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//public class QRCodevalidadtionController {
//
//    @PostMapping("/validateQRCode")
//    public String validateQRCode(@RequestBody byte[] qrCode){
//        String fineMember = decodeQRCode(qrCode);
//
//    }
//
//
//    private String decodeQRCode(byte[]bqrCodeData){
//
//        try{
//            ByteArrayInputStream inputStream = new ByteArrayInputStream(bqrCodeData);
//            BufferedImage image = ImageIO.read(inputStream);
//
//            Map<DecodeHintType,Object> hints = new HashMap<>();
//            hints.put(DecodeHintType.TRY_HARDER,Boolean.TRUE);
//
//            BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer((new BufferedImageLuminanceSource(image))));
//
//            Result result = new MultiFormatReader().decode(bitmap,hints);
//            return  result.getText();
//
//        }catch (IOException | NotFoundException e){
//            e.printStackTrace();
//            return  null;
//        }
//    }
//}
