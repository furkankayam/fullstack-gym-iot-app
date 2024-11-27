package com.furkankaya.repository;

import com.furkankaya.model.RefreshToken;
import com.furkankaya.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);

    Optional<RefreshToken> findByUser(User user);

    Optional<?> deleteByUser(User user);
}
