import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [userRole, setUserRole] = useState("");
  
  const navigate = useNavigate(); // Yönlendirme için useNavigate hook'u

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://<SERVER_IP>:8080/api/v1/generateToken",
        {
          email,
          password,
        }
      );

      const { accessToken: token, refreshToken: refresh, role } = response.data;

      // Değişkenlere gelen veriyi ata
      setAccessToken(token);
      setRefreshToken(refresh);
      setUserRole(role);

      // Gelen verileri localStorage'de ayrı ayrı sakla
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("userRole", JSON.stringify(role));

      // Giriş başarılı olduğunda profil sayfasına yönlendir
      navigate("/profil");
    } catch (error) {
      console.error("Giriş işlemi sırasında hata oluştu:", error);
      alert("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <>
      <LoginContainer>
        <ImageSection>
          <LoginImage src={loginImage} alt="Login Background" />
        </ImageSection>
        <FormSection>
          <LoginForm>
            <FormTitle>Üye Girişi</FormTitle>
            <FormInput
              type="email"
              placeholder="E-posta Adresi"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginButton onClick={handleLogin}>Giriş Yap</LoginButton>
          </LoginForm>
        </FormSection>
      </LoginContainer>
      <br />
    </>
  );
};

export default Login;

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  align-items: center;
  margin-left: 50px;
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginImage = styled.img`
  width: 65%;
  height: auto;
  object-fit: cover;
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const LoginForm = styled.div`
  width: 80%;
  max-width: 400px;
  padding: 40px;
  margin-left: 120px;
  border: 2px solid #39ff14;
  border-radius: 8px;
  box-shadow: 0 0 20px #39ff14;
  background-color: #1e1e1e;
  text-align: center;
`;

const FormTitle = styled.h2`
  color: white;
  margin-bottom: 20px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: white;
`;

const LoginButton = styled.button`
  width: 30%;
  padding: 10px;
  background-color: #39ff14;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  color: black;
  font-weight: bold;

  &:hover {
    background-color: #32e30f;
  }
`;
