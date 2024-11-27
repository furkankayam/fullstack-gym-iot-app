/* 
  CODE CREATED BY - MEHMET FURKAN KAYA
  GITHUB - furkankayam
*/

#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <PubSubClient.h>

#define SS_PIN 5  // RFID - SDA
#define RST_PIN 22  // RFID - RST

const char* ssid = "<WIFI_NAME>";
const char* password = "<WIFI_PASSWORD>";

const char* mqtt_server = "<MQTT_SERVER_IP>";
const char* mqtt_topic = "nfc";

String msg = "";

WiFiClient espClient;
PubSubClient client(espClient);

MFRC522 rfid(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key;

unsigned long lastMsgTime = 0;

void setup() {
  Serial.begin(115200);
  setupWiFi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  SPI.begin();
  rfid.PCD_Init();
  Serial.println("RFID modülü başlatıldı.");
  
  for (byte i = 0; i < 6; i++) key.keyByte[i] = 0xFF;

  while (!client.connected()) {
    Serial.print("MQTT bağlantısı sağlanıyor...");
    if (client.connect("ESP8266Client")) {
      Serial.println("bağlandı");
      client.subscribe(mqtt_topic);
    } else {
      Serial.print("Hata, rc=");
      Serial.print(client.state());
      delay(2000);
    }
  }
}

void loop() {
  client.loop();
  unsigned long currentMillis = millis();
  if (currentMillis - lastMsgTime >= 500) {
    lastMsgTime = currentMillis;
  }

  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) {
    return;
  }

  Serial.print("Kart UID: ");
  for (byte i = 0; i < rfid.uid.size; i++) {
    Serial.print(rfid.uid.uidByte[i], HEX);
    Serial.print(" ");
  }
  Serial.println();

  String message = msg;

  byte block4[16] = {0};
  byte block5[16] = {0};
  byte block6[16] = {0};

  for (int i = 0; i < message.length() && i < 16; i++) {
    block4[i] = message[i];
  }

  for (int i = 0; i < message.length() - 16 && i < 16; i++) {
    block5[i] = message[i + 16];
  }

  for (int i = 0; i < message.length() - 32 && i < 4; i++) {
    block6[i] = message[i + 32];
  }

  if (!writeToBlock(4, block4)) {
    Serial.println("4. bloğa yazma başarısız.");
    return;
  }

  if (!writeToBlock(5, block5)) {
    Serial.println("5. bloğa yazma başarısız.");
    return;
  }

  if (message.length() > 32 && !writeToBlock(6, block6)) {
    Serial.println("6. bloğa yazma başarısız.");
    return;
  }

  Serial.println("Veri başarıyla yazıldı!");
  Serial.println(msg);

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
}

bool writeToBlock(byte block, byte *data) {
  MFRC522::StatusCode status;

  status = rfid.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, block, &key, &(rfid.uid));
  if (status != MFRC522::STATUS_OK) {
    Serial.print("Kimlik doğrulama hatası: ");
    Serial.println(rfid.GetStatusCodeName(status));
    return false;
  }

  status = rfid.MIFARE_Write(block, data, 16);
  if (status != MFRC522::STATUS_OK) {
    Serial.print("Yazma hatası: ");
    Serial.println(rfid.GetStatusCodeName(status));
    return false;
  }

  return true;
}

void callback(char* topic, byte* message, unsigned int length) {
  msg = "";
  for (int i = 0; i < length; i++) {
    msg += (char)message[i];
  }
  
  if (msg.length() == 36) {
    Serial.println("Alınan mesaj: " + msg);
  } else {
    Serial.println("Geçersiz mesaj uzunluğu: " + String(msg.length()));
  }
}

void setupWiFi() {
  delay(10);
  Serial.println();
  Serial.print("WiFi'ye bağlanılıyor: ");
  Serial.print(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println();
  Serial.println("WiFi bağlantısı sağlandı");
  Serial.print("IP adresi: ");
  Serial.println(WiFi.localIP());
}
