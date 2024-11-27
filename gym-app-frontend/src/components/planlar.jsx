import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const SporPlanlari = () => {
  const [plans, setPlans] = useState([
    { title: "1 AYLIK PLAN", price: "Yükleniyor..." },
    { title: "3 AYLIK PLAN", price: "Yükleniyor..." },
    { title: "6 AYLIK PLAN", price: "Yükleniyor..." },
    { title: "12 AYLIK PLAN", price: "Yükleniyor..." }
  ]);

  useEffect(() => {
    // Axios ile fiyatları çekme
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          "http://<SERVER_IP>:8080/api/v1/prices"
        );
        const { oneMonths, threeMonths, sixMonths, twelveMonths } = response.data;
        
        // Planları güncelleme
        setPlans([
          { title: "1 AYLIK PLAN", price: `${oneMonths} TL / Ay` },
          { title: "3 AYLIK PLAN", price: `${threeMonths} TL / 3 Ay` },
          { title: "6 AYLIK PLAN", price: `${sixMonths} TL / 6 Ay` },
          { title: "12 AYLIK PLAN", price: `${twelveMonths} TL / 12 Ay` }
        ]);
      } catch (error) {
        console.error("Fiyatları alırken hata oluştu:", error);
      }
    };

    fetchPrices();
  }, []);

  return (
    <>
      <PlanContainer>
        {plans.map((plan, index) => (
          <Plan key={index}>
            <h2>{plan.title}</h2>
            <PriceButton>{plan.price}</PriceButton>
          </Plan>
        ))}
      </PlanContainer>
      <br />
      <br />
    </>
  );
};

// Styled Components
const PlanContainer = styled.div`
  display: grid;
  width: 130%;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
  text-align: center;
  margin-top: 140px;
  margin-left: 50px;
  padding: 20px;
  background-color: black;
  color: #fff;
`;

const Plan = styled.div`
  background-color: #222;
  padding: 20px;
  box-shadow: 0 0 10px rgba(57, 255, 20, 0.6);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(57, 255, 20, 0.8);
  }
`;

const PriceButton = styled.button`
  background-color: rgba(57, 255, 20, 0.8);
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(57, 255, 20, 1);
  }
`;

export default SporPlanlari;
