import React from "react";
import styled from "styled-components";

// Importing images from the assets folder
import h1 from "../assets/h1.jpg";
import h2 from "../assets/h2.jpg";
import h3 from "../assets/h3.jpg";
import h4 from "../assets/h4.jpg";
import h5 from "../assets/h5s.jpg";

const Hakkimizda = () => {
  return (
    <AboutContainer>
      <Section>
        <ImageContainer>
          <Image src={h1} alt="Biz Kimiz" />
        </ImageContainer>
        <TextContainer>
          <h3>Biz Kimiz?</h3>
          <p>
            Sağlıklı yaşam ve güçlü bir gelecek için kurulan spor salonumuz, üyelerimizin
            fitness hedeflerine ulaşmalarını desteklemek amacıyla hizmet vermektedir.
            Deneyimli eğitmenlerimiz ve kapsamlı spor imkanlarımız ile her seviyedeki
            sporcuya uygun ortamlar sunuyoruz.
          </p>
        </TextContainer>
      </Section>

      <Section>
        <TextContainer>
          <h3>Amacımız</h3>
          <p>
            Amacımız, sağlıklı yaşam alışkanlıklarını desteklemek ve herkesin kendi
            potansiyeline ulaşmasını sağlamaktır. Bu doğrultuda, kişiye özel antrenman
            programları ve grup dersleri ile üyelerimize rehberlik ediyoruz.
          </p>
        </TextContainer>
        <ImageContainer>
          <Image src={h2} alt="Amacımız" />
        </ImageContainer>
      </Section>

      <Section>
        <ImageContainer>
          <Image src={h3} alt="Sunduğumuz Hizmetler" />
        </ImageContainer>
        <TextContainer>
          <h3>Planlarımız ve Hizmetlerimiz</h3>
          <p>
            Spor salonumuzda çeşitli antrenman planları sunuyoruz: Temel fitness, kas
            geliştirme, yağ yakımı, esneklik ve mobilite gibi farklı ihtiyaçlara yönelik
            programlar. Ayrıca grup dersleri, bireysel antrenman seansları ve yüksek
            yoğunluklu interval antrenman (HIIT) dersleri de mevcut.
          </p>
        </TextContainer>
      </Section>

      <Section>
        <TextContainer>
          <h3>Spor Salonumuzun Görünümü</h3>
          <p>
            Modern ekipmanlar, geniş spor alanları ve ferah stüdyolarımız ile üyelerimize
            rahat bir spor deneyimi sunuyoruz. Spor salonumuz, motivasyon dolu atmosferi ve
            son teknoloji ekipmanları ile her zaman en iyi hizmeti vermeyi amaçlıyor.
          </p>
        </TextContainer>
        <ImageContainer>
          <Image src={h5} alt="Spor Salonu" />
        </ImageContainer>
      </Section>

      <Section>
        <ImageContainer>
          <Image src={h4} alt="İşleyişimiz" />
        </ImageContainer>
        <TextContainer>
          <h3>İşleyişimiz</h3>
          <p>
            Spor salonumuz, üyelerin konforu için haftanın 6 günü açıktır. Uzman eğitmenler
            tarafından verilen dersler, kişisel antrenman seansları ve düzenli olarak
            güncellenen programlar ile herkesin fitness hedeflerine ulaşması için
            çalışıyoruz.
          </p>
        </TextContainer>
      </Section>
    </AboutContainer>
  );
};

// Styled Components
const AboutContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 150px;
  background-color: black;
  color: white;
  padding: 40px 20px;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 60px;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const TextContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #222;
  box-shadow: 0 0 10px rgba(57, 255, 20, 0.6);
  border-radius: 5px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

&:hover {
  transform: scale(1.05); /* Üzerine gelindiğinde büyüt */
  box-shadow: 0 0 20px rgba(57, 255, 20, 1); /* Daha belirgin kutu gölgesi */
}

  h3 {
    color: #39ff14;
    font-size: 1.8em;
    margin-bottom: 15px;
    text-align: center;
  }

  p {
    font-size: 1.1em;
    line-height: 1.6;
  }
`;

const Image = styled.img`
  width: 80%;
  height: auto;
  border-radius: 10px;
`;

export default Hakkimizda;
