package com.furkankaya.service;

import com.furkankaya.model.RefreshToken;
import com.furkankaya.model.User;
import com.furkankaya.repository.RefreshTokenRepository;
import com.furkankaya.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    @Value("${jwt.expirationRefreshToken}")
    public long expirationRefreshToken;

    public RefreshToken createRefreshToken(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + email);
        }

        Optional<RefreshToken> existingTokenOpt = refreshTokenRepository.findByUser(user);

        RefreshToken refreshToken;
        if (existingTokenOpt.isPresent()) {
            refreshToken = existingTokenOpt.get();
            refreshToken.setToken(UUID.randomUUID().toString());
            refreshToken.setExpiryDate(Instant.now().plusMillis(expirationRefreshToken));
        } else {
            refreshToken = RefreshToken.builder()
                    .user(user)
                    .token(UUID.randomUUID().toString())
                    .expiryDate(Instant.now().plusMillis(expirationRefreshToken))
                    .build();
        }

        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public void deleteToken(User user) {
        refreshTokenRepository.deleteByUser(user);
    }

    public Optional<RefreshToken> findRefreshToken(User user) {
        return refreshTokenRepository.findByUser(user);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            return null;
        }
        return token;
    }

}
