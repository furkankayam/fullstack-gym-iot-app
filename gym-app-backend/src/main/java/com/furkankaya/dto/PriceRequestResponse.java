package com.furkankaya.dto;

public record PriceRequestResponse(
        Long oneMonths,
        Long threeMonths,
        Long sixMonths,
        Long twelveMonths) {
}
