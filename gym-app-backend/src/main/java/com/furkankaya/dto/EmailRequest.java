package com.furkankaya.dto;

public record EmailRequest(
        String firstName,
        String lastName,
        String email,
        String message
) {
}
