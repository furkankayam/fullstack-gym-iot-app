package com.furkankaya.controller;

import com.furkankaya.dto.EmailRequest;
import com.furkankaya.dto.MeasurementRequestResponse;
import com.furkankaya.dto.MeasurementResponse;
import com.furkankaya.dto.UUIDRequest;
import com.furkankaya.service.UserDetailsServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserDetailsServiceImpl userDetailsService;

    @PostMapping("/isAllowedToPass")
    public ResponseEntity<Boolean> isAllowedToPass(@RequestBody UUIDRequest uuid) {
        try {
            Boolean response = userDetailsService.isAllowedToPass(uuid.uuid());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User's access has expired.");
        }
    }

    @GetMapping("/measurements")
    public ResponseEntity<List<MeasurementResponse>> measurements(HttpServletRequest httpServletRequest) {
        return new ResponseEntity<>(userDetailsService.getMeasurements(httpServletRequest), HttpStatus.OK);
    }

    @PostMapping("/sendEmail")
    public ResponseEntity<Void> sendEmail(@RequestBody EmailRequest emailRequest) {
        userDetailsService.sendEmail(emailRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
