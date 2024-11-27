package com.furkankaya.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.NonNull;

@Builder
public record ChangePasswordRequest(
        @NonNull String oldPassword,
        @NotNull String newPassword) {
}
