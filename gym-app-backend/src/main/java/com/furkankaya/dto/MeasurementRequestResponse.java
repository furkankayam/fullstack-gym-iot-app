package com.furkankaya.dto;

public record MeasurementRequestResponse(
        String email,
        Integer height,
        Integer weight,
        Integer chest,
        Integer waist,
        Integer hip
) {
}
