package com.furkankaya.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private JavaMailSender mailSender;

    @Autowired
    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public String sendMutliMediaMail() {
        return null;
    }

    public void sendMail(String email
    ,String messageContent) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("gym.app36@gmail.com");
        message.setTo(email);
        message.setSubject("Gym App");
        message.setText(messageContent);
        mailSender.send(message);
    }

}