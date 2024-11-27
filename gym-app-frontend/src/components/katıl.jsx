import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  width: 700px;
  text-align: center;
  background-color: #121212;
  color: #ffffff;
  margin-top: 120px;
  margin-left: 400px;
`;

const Heading = styled.h1`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 300px;
  border: 2px solid #4caf50; /* Neon green border */
  border-radius: 5px;
  background-color: #1e1e1e;
  color: #ffffff;

  &:focus {
    outline: none;
    border-color: #76ff03; /* Neon green on focus */
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #76ff03;
  }
`;

const Katıl = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    address: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form verilerini işleme (örneğin, API çağrısı)
    console.log('Form submitted:', formData);
  };

  return (
    <Container>
      <Heading>Aramıza Hoşgeldin!</Heading>
      <p>Hadi Tanışalım !  Aşağıdaki formu doldurarak başlayabiliriz</p>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Adınız"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="E-posta Adresiniz"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="tel"
          name="phone"
          placeholder="Telefon Numaranız"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <Input
          type="number"
          name="age"
          placeholder="Yaşınız"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="gender"
          placeholder="Cinsiyetiniz (Erkek/Kadın/Diğer)"
          value={formData.gender}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="address"
          placeholder="Adresiniz"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="message"
          placeholder="Mesajınız (isteğe bağlı)"
          value={formData.message}
          onChange={handleChange}
        />
        <Button type="submit">Hadi Başlayalım</Button>
      </Form>
    
    </Container>
  );
};

export default Katıl;
