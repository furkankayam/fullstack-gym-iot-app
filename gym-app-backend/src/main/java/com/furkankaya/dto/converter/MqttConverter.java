package com.furkankaya.dto.converter;

import com.furkankaya.model.MqttPublishModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MqttConverter {

    public MqttPublishModel toMqttPublishModel(String message) {
        MqttPublishModel mqttPublishModel = new MqttPublishModel();
        mqttPublishModel.setQos(2);
        mqttPublishModel.setRetained(true);
        mqttPublishModel.setTopic("nfc");
        mqttPublishModel.setMessage(message);
        return mqttPublishModel;
    }

}
