package com.furkankaya.dto;

import com.furkankaya.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponseDto {

    private String accessToken;
    private String refreshToken;
    private Set<Role> role;

}
