package com.furkankaya.dto;

import java.time.LocalDate;

public record MeasurementResponse(
        Integer height,
        Integer weight,
        Integer chest,
        Integer waist,
        Integer hip,
        LocalDate createdDate
) {
}
