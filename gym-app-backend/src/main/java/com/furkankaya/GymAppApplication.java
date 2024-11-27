package com.furkankaya;

import com.furkankaya.model.Price;
import com.furkankaya.model.Role;
import com.furkankaya.model.User;
import com.furkankaya.repository.PriceRepository;
import com.furkankaya.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Collections;

@SpringBootApplication(scanBasePackages = "com.furkankaya")
@RequiredArgsConstructor
public class GymAppApplication implements CommandLineRunner {

	private final UserRepository userRepository;
	private final PriceRepository priceRepository;

	public static void main(String[] args) {
		SpringApplication.run(GymAppApplication.class, args);
	}

	@Override
	@Transactional
	public void run(String... args) {
		User user = userRepository.findByEmail("gym.app36@gmail.com");

		if (user == null) {
			user = new User();
			user.setPassword("$2a$10$M.Hd5.3.5ARnny4zEgXcX.8vGXZL.o0vjWelV8fLveG0xEk77r1S2");
			user.setFirstName("admin");
			user.setLastName("admin");
			user.setEmail("gym.app36@gmail.com");
			user.setInside(false);
			user.setAuthorities(Collections.singleton(Role.ROLE_ADMIN));
			userRepository.save(user);
		}

		Price price = priceRepository.findById(100L).orElse(null);

		if (price == null) {
			price = new Price();
			price.setId(100L);
			price.setOneMonths(1000L);
			price.setThreeMonths(2500L);
			price.setSixMonths(4500L);
			price.setTwelveMonths(8000L);
			priceRepository.save(price);
		}

	}

}
