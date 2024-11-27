package com.furkankaya.controller;

import com.furkankaya.dto.*;
import com.furkankaya.model.RefreshToken;
import com.furkankaya.model.Role;
import com.furkankaya.model.User;
import com.furkankaya.service.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsServiceImpl userService;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/generateToken")
    public JwtResponseDto AuthenticateAndGetToken(@RequestBody AuthRequestDto request) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        if (authentication.isAuthenticated()) {
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(request.getEmail());
            User user = (User) userService.loadUserByUsername(request.getEmail());
            Set<Role> role = user.getAuthorities();
            return JwtResponseDto.builder()
                    .accessToken(jwtService.GenerateToken(request.getEmail()))
                    .refreshToken(refreshToken.getToken())
                    .role(role)
                    .build();
        }

        log.info("invalid username " + request.getEmail());

        throw new UsernameNotFoundException("invalid username {} " + request.getEmail());
    }

    @PostMapping("/saveUser")
    public ResponseEntity<UserResponse> saveUser(@RequestBody CreateUserRequest userRequest) {

        UserResponse userResponse = userService.createUser(userRequest);
        return new ResponseEntity<>(userResponse, HttpStatus.OK);

    }

    @PostMapping("/changePassword")
    public ResponseEntity<UserResponse> changePassword(HttpServletRequest httpServletRequest,
                                                       @RequestBody ChangePasswordRequest changePasswordRequest) {
        UserResponse userResponse = userService.changePassword(httpServletRequest,
                changePasswordRequest);
        return new ResponseEntity<>(userResponse, HttpStatus.OK);

    }

    @PostMapping("/refreshToken")
    public JwtResponseDto refreshToken(@RequestBody RefreshTokenRequest request) {
        return refreshTokenService.findByToken(request.getRefreshToken())
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String accessToken = jwtService.GenerateToken(user.getUsername());
                    return JwtResponseDto.builder()
                            .accessToken(accessToken)
                            .refreshToken(request.getRefreshToken())
                            .build();
                }).orElseThrow(() -> new RuntimeException("Refresh token is not in database!"));
    }

}
