package com.furkankaya.service;

import com.furkankaya.config.MqttConfig;
import com.furkankaya.dto.converter.MqttConverter;
import com.furkankaya.model.MqttPublishModel;
import lombok.RequiredArgsConstructor;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MqttService {

    private final MqttConfig mqttConfig;
    private final MqttConverter mqttConverter;

    public void publishMessage(String message) {
        MqttPublishModel mqttPublishModel = mqttConverter.toMqttPublishModel(message);
        try {
            MqttMessage mqttMessage = new MqttMessage(mqttPublishModel.getMessage().getBytes());
            mqttMessage.setQos(mqttPublishModel.getQos());
            mqttMessage.setRetained(mqttPublishModel.getRetained());
            mqttConfig.getInstance().publish(mqttPublishModel.getTopic(), mqttMessage);
        } catch (MqttException e) {
            throw new RuntimeException("Mqtt Broker Failed To Deliver The Message!");
        }
    }

}
