import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer'; // Footer'ı import edin
import Anasayfa from './components/anasayfa';
import Login from './components/login';
import Planlar from './components/planlar';
import Register from './components/register';
import Iletisim from './components/iletisim';
import Hakkimizda from './components/hakkimizda';
import Profil from './components/profil'; // Profil bileşenini import edin
import Katıl from './components/katıl';
import PasswordUpdate from './components/password';
import Unauthorized from './components/unauthorized';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Anasayfa />} />
        <Route path="/hakkimizda" element={<Hakkimizda />} />
        <Route path="/planlar" element={<Planlar />} />
        <Route path="/kampanya" element={<Kampanya />} />
        <Route path="/iletisim" element={<Iletisim />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profil" element={<Profil />} />{" "}
        {/* Profil sayfası eklendi */}
        <Route path="/katıl" element={<Katıl />} />
        <Route path="/password" element={<PasswordUpdate />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

// Bileşenleri doğru şekilde tanımlayalım
function Kampanya() {
  return <div>Kampanyalar Sayfası</div>;
}

export default App;
