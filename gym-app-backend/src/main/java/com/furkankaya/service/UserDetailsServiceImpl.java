package com.furkankaya.service;

import com.furkankaya.config.PasswordEncoderConfig;
import com.furkankaya.dto.*;
import com.furkankaya.dto.converter.*;
import com.furkankaya.model.Measurement;
import com.furkankaya.model.Price;
import com.furkankaya.model.User;
import com.furkankaya.repository.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private final MeasurementRepository measurementRepository;
    private final UserConverter userConverter;
    private final PriceConverter priceConverter;
    private final MeasurementConveter measurementConveter;
    private final PriceRepository priceRepository;
    private final PasswordEncoderConfig passwordEncoderConfig;
    private final MailService mailService;

    @Lazy
    private final JwtService jwtService;

    public UserDetailsServiceImpl(UserRepository userRepository, MeasurementRepository measurementRepository, UserConverter userConverter, PriceConverter priceConverter, MeasurementConveter measurementConveter, PriceRepository priceRepository, PasswordEncoderConfig passwordEncoderConfig, MailService mailService, @Lazy JwtService jwtService) {
        this.userRepository = userRepository;
        this.measurementRepository = measurementRepository;
        this.userConverter = userConverter;
        this.priceConverter = priceConverter;
        this.measurementConveter = measurementConveter;
        this.priceRepository = priceRepository;
        this.passwordEncoderConfig = passwordEncoderConfig;
        this.mailService = mailService;
        this.jwtService = jwtService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email);
    }

    public UserResponse createUser(CreateUserRequest request) {
        User user = userConverter.toUser(request);
        userRepository.save(user);
        return userConverter.toUserResponse(user);
    }

    @Transactional
    public UserResponse changePassword(HttpServletRequest httpServletRequest,
                                       ChangePasswordRequest request) {
        String email = jwtService.resolveRequest(httpServletRequest);
        User user = userRepository.findByEmail(email);

        if (user.getUsername().equals(email) &&
                passwordEncoderConfig.passwordEncoder().matches(request.oldPassword(), user.getPassword())) {

            user.setPassword(passwordEncoderConfig.passwordEncoder().encode(request.newPassword()));
            userRepository.save(user);

            mailService.sendMail(user.getEmail(), "Your password has been changed.💪");

            return userConverter.toUserResponse(user);
        } else {
            throw new RuntimeException("Old password is incorrect.");
        }
    }

    @Transactional
    public Boolean isAllowedToPass(String uuid) {
        User user = getUserByUUID(uuid);
        User newUser = inside(user);
        userRepository.save(newUser);
        LocalDate endDate = user.getEndDate();
        LocalDate now = LocalDate.now();
        if (endDate != null && endDate.isBefore(now)) {
            throw new RuntimeException("User's access has expired.");
        }
        return true;
    }

    public User getUserByUUID(String uuid) {
        User user = userRepository.findByUuid(uuid);
        if (user == null) {
            throw new UsernameNotFoundException(uuid);
        }
        return user;
    }

    public User inside(User user) {
        boolean response = user.isInside();
        if (response) {
            user.setInside(false);
        } else {
            user.setInside(true);
        }
        return user;
    }

    public void priceUpdate(PriceRequestResponse priceRequest) {
        Price price = priceRepository.findById(100L).orElse(null);
        if (price != null) {
            price.setOneMonths(priceRequest.oneMonths());
            price.setThreeMonths(priceRequest.threeMonths());
            price.setSixMonths(priceRequest.sixMonths());
            price.setTwelveMonths(priceRequest.twelveMonths());
            priceRepository.save(price);
        } else {
            throw new RuntimeException("Price not found.");
        }
    }

    public PriceRequestResponse getPrices() {
        Price price = priceRepository.findById(100L).orElse(null);
        if (price != null) {
            return priceConverter.toPriceRequestResponse(price);
        } else {
            throw new RuntimeException("Price not found.");
        }
    }

    public void measurementCreate(MeasurementRequestResponse measurementRequestResponse) {
        Measurement measurement = measurementConveter.toMeasurement(measurementRequestResponse);
        measurementRepository.save(measurement);
    }

    public List<MeasurementResponse> getMeasurements(HttpServletRequest httpServletRequest) {
        String email = jwtService.resolveRequest(httpServletRequest);
        return measurementConveter.toListMeasurementResponse(email);
    }

    public Long getInside() {
        return userRepository.countByInside(true);
    }

    public Long getUserDays(HttpServletRequest httpServletRequest) {
        String email = jwtService.resolveRequest(httpServletRequest);
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found.");
        }
        LocalDate endDate = user.getEndDate();
        LocalDate now = LocalDate.now();
        if (endDate == null) {
            return 0L;
        }
        if (endDate.isBefore(now)) {
            System.out.println("User's access has expired.");
            return 0L;
        }
        Long daysLeft = ChronoUnit.DAYS.between(now, endDate);
        if (daysLeft < 0) {
            return 0L;
        }
        if (daysLeft == 10) {
            mailService.sendMail(email, "You have 10 days left.");
        }
        return daysLeft;
    }

    public void updateDate(String email, int month) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found.");
        }

        LocalDate currentDate = LocalDate.now();
        LocalDate newEndDate;

        LocalDate userEndDate = user.getEndDate();

        if (userEndDate == null || userEndDate.isBefore(currentDate)) {
            newEndDate = currentDate.plusMonths(month);
        } else {
            newEndDate = userEndDate.plusMonths(month);
        }

        user.setEndDate(newEndDate);
        userRepository.save(user);
    }

    public void sendEmail(EmailRequest email) {
        mailService.sendMail("gym.app36@gmail.com",
                email.message() + "\n" +
                        email.firstName() + " " + email.lastName() + "\n" +
                        email.email());
    }


}
