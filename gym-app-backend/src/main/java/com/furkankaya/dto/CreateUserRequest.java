package com.furkankaya.dto;

import lombok.Builder;
import lombok.NonNull;

import java.time.LocalDate;

@Builder
public record CreateUserRequest(
        @NonNull String firstName,
        @NonNull String lastName,
        @NonNull String email,
        @NonNull LocalDate endDate) {
}
