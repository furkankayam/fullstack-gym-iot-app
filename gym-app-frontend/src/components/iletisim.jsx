import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

// Ana Container bileşeni
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // Ortaya hizala
  padding: 20px;
  margin-left: 400px;
`;

// TextContainer bileşeni
const TextContainer = styled.div`
  padding: 20px;
  background-color: black;
  border-radius: 5px;
  text-align: center; // Metni ortalar

  h3 {
    font-size: 2em; // Daha büyük başlık
    margin-bottom: 15px;
  }

  p {
    color: #fff; // Yazı rengi beyaz
    text-shadow: 0 0 5px rgba(57, 255, 20, 0.6); // Neon gölgelik
  }
`;

// İletişim bilgileri için stil
const InfoContainer = styled.div`
  display: flex; // Yan yana yerleştir
  justify-content: space-around; // Boşlukları eşit dağıt
  margin-top: 20px;
  color: #fff;
  text-align: center;
  width: 150%;

  .info-box {
    background-color: black; // Kutuların arka plan rengi
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(57, 255, 20, 0.8); // Neon gölgelik
    flex: 1; // Eşit genişlikte yer kaplar
    margin: 0 20px; // Aralarındaki boşluk
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: scale(1.05); /* Üzerine gelindiğinde büyüt */
      box-shadow: 0 0 20px rgba(57, 255, 20, 2); /* Daha belirgin kutu gölgesi */
    }
  }

  p {
    margin: 5px 0;
  }
`;

// Form stili
const FormContainer = styled.div`
  background-color: black;
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center; // Metni ortalar
  width: 100%;

  input,
  textarea {
    width: 80%;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #39ff14; // Neon yeşil sınır
    border-radius: 5px;
    background-color: transparent;
    color: #fff;
    font-size: 1em;

    &:focus {
      outline: none; // Fokuslandığında çerçeve görünümünü kaldır
      border-color: #57ff4e; // Fokuslanınca çerçeve rengi
    }
  }

  button {
    background-color: #39ff14;
    color: black;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #57ff4e; // Hover efekti için renk
    }
  }
`;

// İletişim bileşeni
function Iletisim() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Formun varsayılan gönderimini durdur

    const [firstName, lastName] = formData.fullName.split(" ");

    const dataToSend = {
      firstName: firstName || "", // Eğer firstname yoksa boş dize gönder
      lastName: lastName || "", // Eğer lastname yoksa boş dize gönder
      email: formData.email,
      message: formData.message,
    };

    try {
      const response = await axios.post(
        "http://<SERVER_IP>:8080/api/v1/sendEmail",
        dataToSend
      );
      console.log("Response:", response.data);
      // Form başarıyla gönderildiğinde yapılacak işlemler
      setFormData({ fullName: "", email: "", message: "" }); // Formu sıfırla
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Mesaj gönderiminde bir hata oluştu.");
      // Hata durumunda yapılacak işlemler
    }
  };

  return (
    <Container>
      <TextContainer>
        <h3>Bize Ulaşabilirsiniz</h3>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Adınız ve Soyadınız"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Adresiniz"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Mesajınız"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <br />
            <button type="submit">Gönder</button>
          </form>
        </FormContainer>
        <br />
      </TextContainer>

      {/* İletişim Bilgileri */}
      <InfoContainer>
        <div className="info-box">
          <p>
            <strong>Telefon:</strong>
          </p>
          <p>(123) 456-7890</p>
        </div>
        <div className="info-box">
          <p>
            <strong>Adres:</strong>
          </p>
          <p>Sivas</p>
        </div>
        <div className="info-box">
          <p>
            <strong>Email:</strong>
          </p>
          <p>gym.app36@gmail.com</p>
        </div>
      </InfoContainer>

      {/* İletişim Formu */}
    </Container>
  );
}

export default Iletisim;
