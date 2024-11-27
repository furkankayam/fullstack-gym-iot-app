import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate React Router v6 için kullanılır
import styled from "styled-components";

// Styled-components tanımlamaları
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Yüksekliği tam sayfa yap */
  background-color: #000; /* Arka plan siyah */
  position: relative; /* Çocuk bileşenlerin konumlandırılması için gerekli */
`;

const Wrapper1 = styled.div`
  width: 220vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: rgba(54, 194, 35, 0.9);
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    border-color: #39ff14; /* Header'daki yeşil ton */
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #152013; /* Header'daki yeşil ton */
  color: #c2b3b3; /* Siyah yazı rengi */
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #32e30f; /* Daha açık yeşil hover durumunda */
  }
`;

const Message = styled.p`
  font-size: 14px;
  color: ${(props) => (props.success ? "green" : "red")};
  margin-top: 10px;
`;

// React bileşeni
const PasswordUpdate = () => {
  const [accessToken, setAccessToken] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Yönlendirme için useNavigate hook'u

  useEffect(() => {
    // localStorage'dan token al
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);

  // Form gönderme işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      oldPassword,
      newPassword,
    };

    try {
      const response = await axios.post(
        "http://<SERVER_IP>:8080/api/v1/changePassword", // <-- endpoint URL'si
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        // Başarı durumunda formu temizle
        setOldPassword("");
        setNewPassword("");
        setSuccessMessage("Şifre başarıyla güncellendi!");
        setErrorMessage(""); // Hata mesajını temizle

        // localStorage'daki bilgileri temizle
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userRole");

        // Anasayfaya yönlendir
        navigate("/");
      }
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Şifre güncellenirken bir hata oluştu.");
      setSuccessMessage(""); // Başarı mesajını temizle
    }
  };

  return (
    <Wrapper1>
      <Wrapper>
        <h2 style={{ color: "#5ddb47" }}>Şifre Güncelle</h2>
        <Form onSubmit={handleSubmit}>
          <label style={{ color: "rgb(31, 34, 30)" }}>
            <b>Eski Şifre: </b>
          </label>
          <Input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />

          <label style={{ color: "rgb(31, 34, 30)" }}>
            <b>Yeni Şifre: </b>
          </label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <Button type="submit">Güncelle</Button>
        </Form>

        {/* Başarı ve hata mesajlarını göster */}
        {successMessage && <Message success>{successMessage}</Message>}
        {errorMessage && <Message>{errorMessage}</Message>}
      </Wrapper>
    </Wrapper1>
  );
};

export default PasswordUpdate;
