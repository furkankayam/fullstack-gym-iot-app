package com.furkankaya.config;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;

import java.util.UUID;

@Configuration
@Scope("prototype")
@Lazy
public class MqttConfig {

    private static final String MQTT_CLIENT_ID = UUID.randomUUID().toString();

    @Value("${mqtt.broker-url}")
    private String MQTT_SERVER_URL;

    @Bean
    public IMqttClient getInstance() {
        IMqttClient instance;
        try {
            instance = new MqttClient(MQTT_SERVER_URL, MQTT_CLIENT_ID);

            MqttConnectOptions options = new MqttConnectOptions();
            options.setAutomaticReconnect(true);
            options.setCleanSession(true);
            options.setMaxInflight(3000);
            options.setConnectionTimeout(10);

            if (!instance.isConnected()) {
                instance.connect(options);
            }
        } catch (org.eclipse.paho.client.mqttv3.MqttException e) {
            throw new RuntimeException("Mqtt Connection Lost!");
        }

        return instance;
    }

    public String getMQTT_SERVER_URL() {
        return MQTT_SERVER_URL;
    }

}