package com.furkankaya.dto.converter;

import com.furkankaya.dto.MeasurementResponse;
import com.furkankaya.dto.MeasurementRequestResponse;
import com.furkankaya.model.Measurement;
import com.furkankaya.model.User;
import com.furkankaya.repository.MeasurementRepository;
import com.furkankaya.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class MeasurementConveter {

    private final UserRepository userRepository;
    private final MeasurementRepository measurementRepository;

    public Measurement toMeasurement(MeasurementRequestResponse measurementRequestResponse) {
        Measurement measurement = new Measurement();
        measurement.setUser(userRepository.findByEmail(measurementRequestResponse.email()));
        measurement.setHeight(measurementRequestResponse.height());
        measurement.setWeight(measurementRequestResponse.weight());
        measurement.setChest(measurementRequestResponse.chest());
        measurement.setWaist(measurementRequestResponse.waist());
        measurement.setHip(measurementRequestResponse.hip());
        return measurement;
    }

    public List<MeasurementResponse> toListMeasurementResponse(String email) {
        User user = userRepository.findByEmail(email);
        List<Measurement> measurementReponses = measurementRepository.findAllByUser(user);
        return measurementReponses
                .stream()
                .map(this::convertToMeasurementResponse)
                .toList();

    }

    private MeasurementResponse convertToMeasurementResponse(Measurement measurement) {
        return new MeasurementResponse(
                measurement.getHeight(),
                measurement.getWeight(),
                measurement.getChest(),
                measurement.getWaist(),
                measurement.getHip(),
                measurement.getCreatedDate()
        );
    }

}
