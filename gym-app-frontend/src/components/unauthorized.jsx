// App.js
import React from "react";
import styled from "styled-components";

// Styled Components
const UnauthorizedContainer = styled.div`
  background-color: transparent;
  color: white;
  margin-left: 450px;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 0 20px #c56767; /* Kırmızı gölge yetkisiz erişim vurgusu için */
`;

const UnauthorizedTitle = styled.h1`
  font-size: 4rem;
  color: #f07272; /* Başlıkta kırmızı renk kullanıldı */
  margin-bottom: 20px;
`;

const UnauthorizedMessage = styled.p`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 20px;
  max-width: 600px;
`;

const BackButton = styled.button`
  background-color: #39ff14;
  color: black;
  padding: 12px 25px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #32e30f;
  }
`;

const Unauthorized = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <UnauthorizedContainer>
      <UnauthorizedTitle>403</UnauthorizedTitle>
      <UnauthorizedMessage>
        Unauthorized Access - You do not have permission to view this page.
      </UnauthorizedMessage>
          <BackButton onClick={handleGoBack}>Go Back</BackButton>
          <br />
          <br />
    </UnauthorizedContainer>
  );
};

export default Unauthorized;
