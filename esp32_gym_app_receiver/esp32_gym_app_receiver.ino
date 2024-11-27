/* 
  CODE CREATED BY - MEHMET FURKAN KAYA
  GITHUB - furkankayam
*/

#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <HTTPClient.h>

#define RST_PIN         22          // RFID - RST
#define SS_PIN          5           // RFID - SLAVE
#define GREEN_LED_PIN   14          // Green LED
#define RED_LED_PIN     33          // Red LED

MFRC522 mfrc522(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key; 

const char* ssid = "<WIFI_NAME>";
const char* password = "<WIFI_PASSWORD>";
const char* serverUrl = "<SERVER_ENDPOINT>";


void setup() {
    Serial.begin(9600);
    pinMode(GREEN_LED_PIN, OUTPUT);
    pinMode(RED_LED_PIN, OUTPUT);

    while (!Serial);
    SPI.begin();
    mfrc522.PCD_Init();

    for (byte i = 0; i < 6; i++) {
        key.keyByte[i] = 0xFF;
    }

    WiFi.begin(ssid, password);    
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");
}

void loop() {
    if (!mfrc522.PICC_IsNewCardPresent()) {
        return;
    }

    if (!mfrc522.PICC_ReadCardSerial()) {
        return;
    }

    byte blockAddr[3] = { 4, 5, 6 };
    byte buffer[18];
    byte size = sizeof(buffer);
    byte status;
    String combinedData = "";
    String asciiData = "";

    for (int i = 0; i < 3; i++) {
        status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, blockAddr[i], &key, &(mfrc522.uid));
        if (status != MFRC522::STATUS_OK) {
            return;
        }

        status = mfrc522.MIFARE_Read(blockAddr[i], buffer, &size);
        if (status != MFRC522::STATUS_OK) {
            Serial.print(F("MIFARE_Read() failed: "));
            return;
        }

        for (byte j = 0; j < 16; j++) {
            if (buffer[j] != 0) {
                combinedData += String(buffer[j], HEX);
                combinedData += " ";

                if (buffer[j] >= 32 && buffer[j] <= 126) {
                    asciiData += (char)buffer[j];
                } else {
                    asciiData += '.';
                }
            }
        }
        combinedData += "\n";
    }

    Serial.println(F("ASCII Representation:"));
    Serial.println(asciiData);

    if (sendPostRequest(asciiData)) {
        digitalWrite(GREEN_LED_PIN, HIGH);
        delay(5000);
        digitalWrite(GREEN_LED_PIN, LOW);
    } else {
        digitalWrite(RED_LED_PIN, HIGH);
        delay(5000);
        digitalWrite(RED_LED_PIN, LOW);
    }

    mfrc522.PICC_HaltA();
    mfrc522.PCD_StopCrypto1();
}

void dump_byte_array(byte *buffer, byte bufferSize) {
    for (byte i = 0; i < bufferSize; i++) {
        Serial.print(buffer[i] < 0x10 ? " 0" : " ");
        Serial.print(buffer[i], HEX);
    }
    Serial.println();
}

bool sendPostRequest(String uuid) {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(serverUrl);
        http.addHeader("Content-Type", "application/json");

        String payload = "{\"uuid\": \"" + uuid + "\"}";

        int httpResponseCode = http.POST(payload);

        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);

        http.end();
        return httpResponseCode == 200;
    } else {
        Serial.println("WiFi Disconnected");
        return false;
    }
}
