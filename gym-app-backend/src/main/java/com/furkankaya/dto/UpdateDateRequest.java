package com.furkankaya.dto;

import lombok.Builder;

@Builder
public record UpdateDateRequest(
        String email,
        Integer month
) {
}
