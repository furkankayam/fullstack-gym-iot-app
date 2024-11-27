package com.furkankaya.controller;

import com.furkankaya.dto.MeasurementRequestResponse;
import com.furkankaya.dto.MeasurementResponse;
import com.furkankaya.dto.PriceRequestResponse;
import com.furkankaya.dto.UpdateDateRequest;
import com.furkankaya.service.UserDetailsServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final UserDetailsServiceImpl userDetailsService;

    @GetMapping("/prices")
    public ResponseEntity<PriceRequestResponse> getPrices() {
        return new ResponseEntity<>(userDetailsService.getPrices(), HttpStatus.OK);
    }

    @PostMapping("/priceUpdate")
    public ResponseEntity<Void> updatePrice(@RequestBody PriceRequestResponse price) {
        userDetailsService.priceUpdate(price);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/measurementCreate")
    public ResponseEntity<Void> measurementCreate(@RequestBody MeasurementRequestResponse measurement) {
        userDetailsService.measurementCreate(measurement);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/insides")
    public ResponseEntity<Long> getInside() {
        return new ResponseEntity<>(userDetailsService.getInside(), HttpStatus.OK);
    }

    @GetMapping("/days")
    public ResponseEntity<Long> getUserDays(HttpServletRequest httpServletRequest) {
        return new ResponseEntity<>(userDetailsService.getUserDays(httpServletRequest), HttpStatus.OK);
    }

    @PostMapping("/updateDate")
    public ResponseEntity<Void> updateDate(@RequestBody UpdateDateRequest updateDateRequest) {
        userDetailsService.updateDate(
                updateDateRequest.email(),
                updateDateRequest.month()
        );
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
