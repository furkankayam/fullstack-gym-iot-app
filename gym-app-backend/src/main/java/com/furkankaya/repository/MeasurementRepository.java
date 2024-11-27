package com.furkankaya.repository;

import com.furkankaya.model.Measurement;
import com.furkankaya.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MeasurementRepository extends JpaRepository<Measurement, Long> {

    List<Measurement> findAllByUser(User user);

}
