package com.furkankaya.repository;

import com.furkankaya.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
    User findByUuid(String uuid);
    Long countByInside(Boolean inside);

}
