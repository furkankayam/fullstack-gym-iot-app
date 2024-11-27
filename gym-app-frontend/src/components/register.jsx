import React from "react";
import styled from "styled-components";
import registerImage from "../assets/re.jpg";

const Register = () => {
  return (
    <RegisterContainer>
      <FormSection>
        <RegisterForm>
          <FormTitle>Üye Ol</FormTitle>
          <FormInput type="text" placeholder="Ad Soyad" />
          <FormInput type="email" placeholder="E-posta Adresi" />
          <FormInput type="password" placeholder="Şifre" />
          <RegisterButton>Kayıt Ol</RegisterButton>
        </RegisterForm>
      </FormSection>
      <ImageSection>
        <RegisterImage src={registerImage} alt="Register Background" />
      </ImageSection>
    </RegisterContainer>
  );
};

export default Register;

// Styled Components
const RegisterContainer = styled.div`
  display: flex;
  height: calc(100vh - 60px); /* Adjusting for header height */
  align-items: center;
  margin-left: 180px; /* Shift the entire container to the right */
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const RegisterForm = styled.div`
  width: 80%;
  max-width: 450px;
  padding: 30px;
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

const RegisterButton = styled.button`
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

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterImage = styled.img`
  width: 80%;
  height: auto;
  object-fit: cover;
`;
