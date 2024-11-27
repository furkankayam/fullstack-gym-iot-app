package com.furkankaya.dto;

import com.furkankaya.model.Role;
import lombok.*;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserResponse {

    private String username;
    private Set<Role> roles;

}
