## 💪 `Fullstack Gym IoT App`

This project is a web-based Gym Management System that allows both administrators and users to interact with the system. The application integrates NFC cards for gym access, where users can check in and out of the gym. Admins can manage users, update pricing, extend memberships, and view the number of people inside the gym in real-time. Additionally, admins can enter users' measurements (e.g., height, weight), and users can manage their accounts.

### Admin Dashboard:

- Add new users and assign NFC cards.
- Extend user memberships.
- View the current number of people inside the gym.
- Update pricing for memberships.
- Enter user measurements (e.g., height, weight).
- Reset their own password.

### User Account:

- Users can check how many days are left on their membership.
- Users can view their measurements, but cannot modify them.
- Users can reset their own password.

<hr>

<div>
<div align="center">
<h3>⚡Home Page </h3>
<img src="./images/home.png" alt="home">
</div>

<br>

<details>
<summary>📕 About Page </summary>
<img src="./images/about.png" alt="create">
</details>

<details>
<summary>💵 Pricing Page </summary>
<img src="./images/prices.png" alt="create">
</details>

<details>
<summary>📞 Contact Page </summary>
<img src="./images/contact.png" alt="create">
</details>

<details>
<summary>🔑 Login Page </summary>
<img src="./images/login.png" alt="create">
</details>

</div>
<hr>

<div>
<div align="center">
<h3>⚡Admin Page </h3>
<img src="./images/admin/admin_home.png" alt="home">
</div>

<br>

<details>
<summary>🚹 Admin - User Registration Page </summary>
<img src="./images/admin/admin_sign_up_user.png" alt="create">
</details>

<details>
<summary>📏 Admin - Measurement Creation Page </summary>
<img src="./images/admin/admin_user_create_measurement.png" alt="create">
</details>

<details>
<summary>➕ Admin - View Gym Occupancy </summary>
<img src="./images/admin/admin_users_inside.png" alt="create">
</details>

<details>
<summary>💵 Admin - Pricing Update Page </summary>
<img src="./images/admin/admin_update_prices.png" alt="create">
</details>

<details>
<summary>🔓 Admin - Membership Renewal Page </summary>
<img src="./images/admin/admin_user_update_date.png" alt="create">
</details>

<details>
<summary>🔓 Admin - Reset Password Page </summary>
<img src="./images/admin/admin_restart_password.png" alt="create">
</details>
</div>

<hr>

<div>
<div align="center">
<h3>⚡User Page </h3>
<img src="./images/user/user_home.png" alt="home">
</div>

<br>

<details>
<summary>🔓 User - Reset Password Page </summary>
<img src="./images/user/user_restart_password.png" alt="create">
</details>

</div>
<hr>

<div>
<div align="center">
<h3>⚡System Architecture Overview </h3>
</div>

<details>
<summary>➕ MQTT </summary>
<img src="./images/mqtt.png" alt="create">
</details>

<details>
<summary>➕ Swagger UI </summary>
<img src="./images/openapi.png" alt="create">
</details>

<details>
<summary>➕ Database </summary>
<img src="./images/database.png" alt="create">
</details>

<details>
<summary>➕ Docker Compose </summary>
<img src="./images/docker.png" alt="create">
</details>

<details>
<summary>➕ Network Connection Diagram </summary>
<img src="./images/electronics/connect.png" alt="create">
</details>

<details>
<summary>➕ Electronic Schematic </summary>
<img src="./images/electronics/electronic.png" alt="create">
<img src="./images/electronics/electronic1.jpg" alt="create">
</details>

</div>
<hr>

<br>

#### Used Technologies in The Project:

[![React](https://img.shields.io/badge/React-18.3-000?style=for-the-badge&logo=react&logoColor=white&color=61DAFB)](https://react.dev/)
[![Axios](https://img.shields.io/badge/Axios-1.7-000?style=for-the-badge&logo=axios&logoColor=white&color=5A29E4)](https://axios-http.com/docs/intro)
[![Java](https://img.shields.io/badge/java-17.0-000?style=for-the-badge&logo=openjdk&logoColor=white&color=FF9A00)](https://www.java.com/en/)
[![Spring Boot](https://img.shields.io/badge/spring%20boot-3.2-000?style=for-the-badge&logo=springboot&logoColor=white&color=6DB33F)](https://spring.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.2-000?style=for-the-badge&logo=postgresql&logoColor=white&color=4479A1)](https://www.postgresql.org/)
[![Maven](https://img.shields.io/badge/Maven-3.9-000?style=for-the-badge&logo=apache-maven&logoColor=white&color=C71A36)](https://maven.apache.org/)
[![Open API](https://img.shields.io/badge/Open%20API-2.2-000?style=for-the-badge&logo=openapiinitiative&logoColor=white&color=6BA539)](https://springdoc.org/)
[![Docker](https://img.shields.io/badge/Docker-25.0-000?style=for-the-badge&logo=Docker&logoColor=white&color=2496ED)](https://docs.docker.com/)
[![ESP32](https://img.shields.io/badge/ESP32%20WROOM%2032-000?style=for-the-badge&logo=espressif&logoColor=white&color=E7352C)](./datasheet/esp32-wroom-32_datasheet_en.pdf)
[![XL4016](https://img.shields.io/badge/XL4016-000?style=for-the-badge&logoColor=white&color=000000)](./datasheet/XL4016-Datasheet.pdf)
[![MFRC522](https://img.shields.io/badge/MFRC522-000?style=for-the-badge&logoColor=white&color=00529B)](./datasheet/MFRC522.pdf)

<br>

### Installation

```bash
git clone https://github.com/furkankayam/fullstack-gym-iot-app.git
```

<br>

### Settings

```js
//fullstack-gym-iot-app/gym-app-frontend/*

http://<SERVER_IP>:8080
```

```ino
//fullstack-gym-iot-app/esp32_gym_app_transmitter/*

const char* ssid = "<WIFI_NAME>";
const char* password = "<WIFI_PASSWORD>";
const char* mqtt_server = "<MQTT_SERVER_IP>";
```

```ino
//fullstack-gym-iot-app/esp32_gym_app_receiver/*

const char* ssid = "<WIFI_NAME>";
const char* password = "<WIFI_PASSWORD>";
const char* serverUrl = "<SERVER_ENDPOINT>";
```

<br>

### Usage

```bash
docker-compose up
```

<br>

### URL

#### ▶️ UI

```bash
http://localhost
```

#### ▶️ Swagger UI

```bash
http://localhost:8080/swagger-ui.html
```

#### ▶️ Database

```bash
http://localhost:9090
```

- `rdbms`: PostgreSQL
- `username`: postgres
- `password`: postgres
- `database`: gym_app

<br>

# License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details

Created by [Mehmet Furkan KAYA](https://www.linkedin.com/in/mehmet-furkan-kaya/)
