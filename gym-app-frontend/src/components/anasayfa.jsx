import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./header";
import heroBg from "../assets/gy.jpg";
import firstImage from "../assets/a.jpg";
import secondImage from "../assets/gym2.webp";
import thirdImage from "../assets/gym3.webp";
import img1 from "../assets/fit.jpg";
import img2 from "../assets/yoga.jpg";
import img3 from "../assets/fines.jpg";
import img4 from "../assets/bks.jpg";
import { Link } from 'react-router-dom';
import i1 from "../assets/img1.jpg";
import i2 from "../assets/img2.jpg";
import i3 from "../assets/img3.jpg";
import i4 from "../assets/img4.jpg";
import i5 from "../assets/img5.jpg";
import i6 from "../assets/img6.jpg";
import i7 from "../assets/img7.jpg";
import i8 from "../assets/img8.jpg";
import i9 from "../assets/img9.jpg";
import i10 from "../assets/img10.jpg";
import i11 from "../assets/img11.jpg";
import i12 from "../assets/img12.jpg";
import Footer from "./footer"; // Import the Footer component





const Anasayfa = () => {
  return (
    <>
      <div>
        <Header />
        <HeroSection>
          <HeroImage src={heroBg} alt="Motivational Background" />
          <MotivationalText>
            <MainText>DAHA İYİ BİR SENSİN!</MainText>
            <SubText>Hedeflerini gerçekleştir ve kendini keşfet!</SubText>
          </MotivationalText>
        </HeroSection>
      </div>
      <br />
      <br />
      <br />
      <AboutUs />
      <CustomizedPrograms />
     
      <OurTeam />
      <Gallery /> {/* Galeri bileşenini buraya ekledik */}
      <Footer /> {/* Add Footer component here */}
    </>
  );
};

const AboutUs = () => {
  return (
    <>
    <AboutUsContainer>
  <AboutText>
    <h3 style={{ color: "#00ff00", textAlign: "center" }}>Biz Kimiz?</h3>
    <h2 style={{ textAlign: "center" }}>"Güçlü Bir Topluluğun Parçası Olun!"</h2>
    <p>
      Biz, sağlıklı yaşamı ve kişisel gelişimi destekleyen bir spor topluluğuyuz. 
      Amacımız, üyelerimize en iyi fitness deneyimini sunmak ve onları hedeflerine 
      ulaşmaları için motive etmek. Her yaştan ve seviyeden bireye hitap eden 
      programlarımızla, kendinizi güçlü, enerjik ve sağlıklı hissetmenizi sağlıyoruz. 
      Birlikte başarıya ulaşacağımıza inanıyoruz!
    </p>
  </AboutText>
  <AboutText>
    <h3 style={{ color: "#00ff00", textAlign: "center" }}>Misyonumuz</h3>
    <h2 style={{ textAlign: "center" }}>"Sağlıklı Yaşam, Hedefe Ulaş!"</h2>
    <p>
      Misyonumuz, sağlıklı yaşamı teşvik etmek ve üyelerimizin kişisel gelişimlerini 
      desteklemektir. Üyelerimize en iyi fitness deneyimini sunarak, onları hedeflerine 
      ulaşmaları için motive ediyoruz. Her yaştan bireye hitap eden programlarımızla, 
      sağlıklı bir yaşam sürmenizi sağlıyoruz. Hep birlikte daha güçlü bir geleceğe!
    </p>
  </AboutText>
  <AboutText>
    <h3 style={{ color: "#00ff00", textAlign: "center" }}>Vizyonumuz</h3>
    <h2 style={{ textAlign: "center" }}>"Sporla Sağlıklı Bir Gelecek!"</h2>
    <p>
      Vizyonumuz, sağlıklı yaşamı ve kişisel gelişimi teşvik eden bir spor topluluğu 
      oluşturmaktır. Amacımız, üyelerimizi en iyi şekilde desteklemek ve hedeflerine 
      ulaşmalarını sağlamak. Enerjik ve sağlıklı bireyler yetiştirmek için buradayız. 
      Hep birlikte daha sağlıklı bir gelecek inşa ediyoruz!
    </p>
  </AboutText>
</AboutUsContainer>

    <br/>
    </>
  );
};

const CustomizedPrograms = () => {
  return (
    <>
   <div>
  <ProgramSection>
    <ProgramImage src={firstImage} alt="First Program" />
    <ProgramText>
      <h3>Hedeflerinize Ulaşmak İçin Özel Programlar</h3>
      <p>
        Gym App'de, hayalinizdeki bedene ulaşmak artık çok kolay! Eğitmenlerimizle birlikte hazırlanan kişiye özel antrenman programları sayesinde, sadece spor yapmakla kalmayacak, aynı zamanda eğleneceksiniz. Sunduğumuz yenilikçi Türkçe sanal grup dersleri ile istediğiniz saatte ders alabilir, 100’den fazla seçenekle hedeflerinize uygun programları bulabilirsiniz.
      </p>
    </ProgramText>
  </ProgramSection>

  <ProgramSection>
    <ProgramText>
      <h3>GFX: 30 Dakikada Tam Vücut Antrenmanı</h3>
      <p>
        Sadece 30 dakikada fit bir bedene sahip olmak istemez misiniz? Gym App'nin sunduğu GFX (Gym Floor Exercise) programı ile, tüm kas gruplarınızı çalıştırarak kalori yakarken eğlenin! Yüksek yoğunluklu HIIT temalarımızla, istediğiniz bölgeye odaklanabilir ve eğitmeninizin rehberliğinde en uygun hareketleri deneyebilirsiniz. Hedeflerinize ulaşmak için şimdi başlayın!
      </p>
    </ProgramText>
    <ProgramImage src={secondImage} alt="Second Program" />
  </ProgramSection>

  <ProgramSection>
    <ProgramImage src={thirdImage} alt="Third Program" />
    <ProgramText>
      <h3>Fitness Yolculuğunuzda Yanınızdayız</h3>
      <p>
        Gym App, fitness yolculuğunuzda her aşamada yanınızda! Deneyimli eğitmenlerimiz ve modern ekipmanlarımız ile sağlıklı yaşam alışkanlıkları kazanmanıza yardımcı oluyoruz. Hedeflerinize ulaşmak için en etkili yöntemlerle dolu, eğlenceli ve motive edici bir ortam sunuyoruz. Şimdi kayıt olun, güçlü ve sağlıklı bir geleceğe adım atın!
      </p>
    </ProgramText>
  </ProgramSection>
</div>


    <br/>
    </>
  );
};




const OurTeam = () => {
    return (
      <>
       <h1 style={{textAlign:'center'}}>ÇALIŞMA ALANLARIMIZ</h1>
   <OurTeamContainer>
   
  <TeamText>
    
      <h2 style={{ textAlign: "center", color: 'white' }}>PİLATES</h2>
   
    <img src={img1} style={{ width: '100%', height: 'auto' }} />
    <p>
      Pilates, bedeninizi güçlendirmek ve esnekliğinizi artırmak için mükemmel bir yöntemdir. Eğitmenlerimiz eşliğinde, nefes kontrolü ve duruşa odaklanarak, hem fiziksel hem de zihinsel dengeyi sağlarsınız. Bireysel hedeflerinize yönelik özel programlarla, sağlıklı ve dengeli bir yaşam sürmeye bir adım daha yaklaşın!
    </p>
  </TeamText>

  <TeamText>
  
      <h2 style={{ textAlign: "center", color: 'white' }}>YOGA</h2>
  
    <img src={img2} style={{ width: '100%', height: 'auto' }} />
    <p>
      Yoga, bedeni ve zihni bir araya getirerek içsel huzuru bulmanıza yardımcı olur. Farklı seviyelerdeki derslerimizle, esneklik kazanacak, stresi azaltacak ve bedeninizi yeniden keşfedeceksiniz. Eğitmenlerimizin rehberliğinde, bedeninizi ve ruhunuzu uyum içinde bir araya getirin!
    </p>
  </TeamText>

  <TeamText>
  
      <h2 style={{ textAlign: "center", color: 'white' }}>FİTNESS</h2>
 
    <img src={img3} style={{ width: '100%', height: 'auto' }} />
    <p>
      Fitness, genel sağlığınızı ve fiziksel gücünüzü artırmak için harika bir yoldur. Eğlenceli grup dersleri ve bireysel antrenman seçenekleri ile, tüm kas gruplarınızı çalıştırarak, güçlü ve fit bir beden elde edersiniz. Hedeflerinizi gerçekleştirmek için motivasyon dolu bir ortamda yer alın!
    </p>
  </TeamText>

  <TeamText>
   
      <h2 style={{ textAlign: "center", color: 'white' }}>KİCK-BOKS</h2>
    
    <img src={img4} style={{ width: '100%', height: 'auto' }} />
    <p>
      Kick-boks, hem fiziksel dayanıklılığınızı artırır hem de stres atmanızı sağlar. Eğitmenlerimizle birlikte, tekniklerinizi geliştirecek ve kendinizi daha güvende hissetmenizi sağlayacak bir antrenman deneyimi yaşayacaksınız. Kendinizi güçlü ve dinamik hissederek, eğlenceli bir şekilde forma girin!
    </p>
  </TeamText>
</OurTeamContainer>


      </>
    );
  };



  const Gallery = () => {
    return (
        <>
      <GalleryContainer>
        <h1 style={{ textAlign: "center"}}>GYM APP</h1>
        <br/>
        <ImagesGrid>
          {[
            i11, i2, i9, 
            i4, i5, i12,
            i7, i8, i3,
            i10, i1, i6,
          ].map((src, index) => (
            <ImageWrapper key={index}>
              <StyledImage src={src} alt={`Gym Image ${index + 1}`} />
            </ImageWrapper>
          ))}
        </ImagesGrid>
      </GalleryContainer>
      <br/>
      <br/>
      </>
    );
  };


// Styled Components
const HeroSection = styled.div`
  position: relative;
  text-align: center;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const MotivationalText = styled.div`
  color: white;
  z-index: 1;
  text-align: center;
  position: relative;
  padding: 0px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

const MainText = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SubText = styled.p`
  font-size: 1.5rem;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// About Us Styled Components
const AboutUsContainer = styled.div`
  display: flex; /* Yatayda yan yana yerleştirmek için */
  justify-content: space-between; /* Boşluğu eşit dağıtmak için */
  
  margin: 20px; /* Üst ve alt margin */
  padding: 20px; /* İç boşluk */
`;

const AboutText = styled.div`
  flex: 1; /* Her bir dikdörtgen divin genişliğini ayarlamak için */
  margin: 20px; /* Divler arasında boşluk bırakmak için */
  padding: 20px; /* İçerik için alan */
  background-color: black; /* Koyu arka plan rengi */
  box-shadow: 0 0 10px rgba(57, 255, 20, 0.8); /* Neon gölge efekti */
  color: #fff; /* Yazı rengi beyaz */
  transition: transform 0.3s ease, box-shadow 0.3s ease;

&:hover {
  transform: scale(1.05); /* Üzerine gelindiğinde büyüt */
  box-shadow: 0 0 20px rgba(57, 255, 20, 1); /* Daha belirgin kutu gölgesi */
}
`;

// Program Styled Components
const ProgramSection = styled.div`
  display: flex; /* Yatayda yan yana yerleştirmek için */
  justify-content: space-between; /* Boşluğu eşit dağıtmak için */
  margin: 20px; /* Üst ve alt margin */
  padding: 20px; /* İç boşluk */
  width: 80%;
  margin-left: 150px;

`;

const ProgramImage = styled.img`
  width: 50%; /* Resmin genişliğini ayarlamak için */
  height: auto; /* Yüksekliği orantılı tutmak için */
`;

const ProgramText = styled.div`
  flex: 1; /* Metin alanını genişletmek için */
  margin: 20px; /* Divler arasında boşluk bırakmak için */
  padding: 30px; /* İçerik için alan */
  background-color: black; /* Koyu arka plan rengi */
  color: #fff; /* Yazı rengi beyaz */
  margin-top: 50px;
`;


// Styled Components
const OurTeamContainer = styled.div`
  display: flex; /* Yatayda yan yana yerleştirmek için */
  justify-content: space-between; /* Boşluğu eşit dağıtmak için */
  
  margin: 20px; /* Üst ve alt margin */
  padding: 20px; /* İç boşluk */
`;

const TeamText = styled.div`
  flex: 1;
  margin: 20px;
  padding: 20px;
  background-color: black;
  box-shadow: 0 0 10px rgba(57, 255, 20, 0.8);
  color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05); /* Üzerine gelindiğinde büyüt */
    box-shadow: 0 0 20px rgba(57, 255, 20, 1); /* Daha belirgin kutu gölgesi */
  }
`;

// Galeri için Styled Components
const GalleryContainer = styled.div`
  padding: 20px;
  
`;

const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 sütun */
  gap: 20px; /* Resimler arasında boşluk */
  
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%; /* Yükseklik, genişliğe eşit olacak şekilde ayarlandı */
  position: relative;
`;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Resmin boyutunu koruyarak kapsama */
`;


export default Anasayfa;
