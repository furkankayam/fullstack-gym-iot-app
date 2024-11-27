import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios"; // Axios'ı import ettik
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [userRole, setUserRole] = useState([]);
  const [activeForm, setActiveForm] = useState(""); // Aktif form state'i
  const [email, setEmail] = useState(""); // Email state'i
  const [month, setMonth] = useState(0); // Month state'i
  const [formData, setFormData] = useState({
    oneMonths: 0,
    threeMonths: 0,
    sixMonths: 0,
    twelveMonths: 0,
  });
  const [formData1, setFormData1] = useState({
    email: "",
    height: 0,
    weight: 0,
    chest: 0,
    waist: 0,
    hip: 0,
  });
  const [formData2, setFormData2] = useState({
    firstName: "",
    lastName: "",
    email: "",
    endDate: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); // Başarı mesajı için state
  const [errorMessage, setErrorMessage] = useState(""); // Hata mesajı için state
  const [numberFromApi, setNumberFromApi] = useState(0);
  const [numberFromApi1, setNumberFromApi1] = useState(0);
  const [measurements, setMeasurements] = useState([
    {
      height: 0,
      weight: 0,
      chest: 0,
      waist: 0,
      hip: 0,
      createdDate: "",
    },
  ]);

  useEffect(() => {
    // localStorage'dan verileri çek
    const token = localStorage.getItem("accessToken");
    const refresh = localStorage.getItem("refreshToken");
    const role = JSON.parse(localStorage.getItem("userRole")) || []; // Boş bir dizi ile başla

    // State'e aktar
    setAccessToken(token);
    setRefreshToken(refresh);
    setUserRole(role);
  }, []);

  // Formları aktif yapmak için kullanılan fonksiyon
  const handleFormClick = (formName) => {
    setActiveForm(formName);
    setEmail("");
    setMonth(0);
    setSuccessMessage(""); // Başarı mesajını sıfırla
    setErrorMessage(""); // Hata mesajını sıfırla

    // Form 2 için verileri sıfırla
    if (formName === "form2") {
      setFormData({
        oneMonths: 0,
        threeMonths: 0,
        sixMonths: 0,
        twelveMonths: 0,
      });
    }
  };

  // Form 1 için veriyi gönderme fonksiyonu
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, month };

    try {
      const response = await axios.post(
        "http://<SERVER_IP>:8080/api/v1/updateDate",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!accessToken) {
        navigate("/unauthorized");
        return;
      }

      if (response.status === 200) {
        // Eğer yanıt 200 ise formu temizle ve başarı mesajını ayarla
        setEmail("");
        setMonth(0);
        setSuccessMessage("Başarıyla gönderildi!"); // Başarı mesajı
      }
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Bir hata oluştu!"); // Hata mesajı
    }
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    const data = {
      email,
      month,
      ...formData, // Form 2 verilerini ekle
    };

    try {
      const response = await axios.post(
        "http://<SERVER_IP>:8080/api/v1/priceUpdate",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!accessToken) {
        navigate("/unauthorized");
        return;
      }

      if (response.status === 200) {
        // Eğer yanıt 200 ise formu temizle ve başarı mesajını ayarla
        setFormData({
          oneMonths: 0,
          threeMonths: 0,
          sixMonths: 0,
          twelveMonths: 0,
        });
        setSuccessMessage("Başarıyla gönderildi!"); // Başarı mesajı
      }
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Bir hata oluştu!"); // Hata mesajı
    }
  };

  // Form 2 için veriyi gönderme fonksiyonu
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const data = {
      email,
      month,
      ...formData1, // Form 3 verilerini ekle
    };

    try {
      const response = await axios.post(
        "http://<SERVER_IP>:8080/api/v1/measurementCreate",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!accessToken) {
        navigate("/unauthorized");
        return;
      }

      if (response.status === 200) {
        // Eğer yanıt 200 ise formu temizle ve başarı mesajını ayarla
        setFormData1({
          email: "",
          height: 0,
          weight: 0,
          chest: 0,
          waist: 0,
          hip: 0,
        });
        setSuccessMessage("Başarıyla gönderildi!"); // Başarı mesajı
      }
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Bir hata oluştu!"); // Hata mesajı
    }
  };

  // Form 3 için veriyi gönderme fonksiyonu
  const handleSubmit3 = async (e) => {
    e.preventDefault();
    const data = {
      email,
      month,
      ...formData2, // Form 3 verilerini ekle
    };

    try {
      const response = await axios.post(
        "http://<SERVER_IP>:8080/api/v1/saveUser",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!accessToken) {
        navigate("/unauthorized");
        return;
      }

      if (response.status === 200) {
        // Eğer yanıt 200 ise formu temizle ve başarı mesajını ayarla
        setFormData2({
          firstName: "",
          lastName: "",
          email: "",
          endDate: "",
        });
        setSuccessMessage("Başarıyla gönderildi!"); // Başarı mesajı
      }
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Bir hata oluştu!"); // Hata mesajı
    }
  };

  const fetchNumber = async () => {
    try {
      const response = await axios.get(
        "http://<SERVER_IP>:8080/api/v1/insides",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!accessToken) {
        navigate("/unauthorized");
        return;
      }

      setNumberFromApi(response.data); // Assuming the response contains a number
    } catch (error) {
      console.error("Error fetching data:", error);
      setNumberFromApi(null); // Reset if there's an error
    }
  };

  const fetchNumber1 = async () => {
    try {
      const response = await axios.get("http://<SERVER_IP>:8080/api/v1/days", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!accessToken) {
        navigate("/unauthorized");
        return;
      }

      setNumberFromApi1(response.data); // Assuming the response contains a number
    } catch (error) {
      console.error("Error fetching data:", error);
      setNumberFromApi1(null); // Reset if there's an error
    }
  };

  useEffect(() => {
    if (activeForm === "form5") {
      fetchNumber(); // Fetch the number when form5 is active

      // Set up interval to refresh every 30 seconds
      const intervalId = setInterval(() => {
        fetchNumber();
      }, 10000); // 30000 milliseconds = 30 seconds

      // Clean up the interval on component unmount or when activeForm changes
      return () => clearInterval(intervalId);
    }
  }, [activeForm]);

  // Sill
  const fetchMeasurements = async () => {
    try {
      const response = await axios.get(
        "http://<SERVER_IP>:8080/api/v1/measurements",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!accessToken) {
        navigate("/unauthorized");
        return;
      }

      setMeasurements(response.data); // Assuming the response contains an array of measurements
    } catch (error) {
      console.error("Error fetching data:", error);
      setMeasurements([]); // Reset to an empty array if there's an error
    }
  };

  useEffect(() => {
    fetchMeasurements(); // Fetch the measurements when the component is mounted
    fetchNumber1();

    // Set up interval to refresh every 10 seconds
    const intervalId = setInterval(() => {
      fetchMeasurements();
      fetchNumber1();
    }, 10000); // 10000 milliseconds = 10 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [accessToken]); // Consider adding accessToken as a dependency if it might change

  return (
    <ProfilContainer userRole={userRole}>
      <h2>
        <strong></strong>{" "}
        {userRole.map((role) => role.split("_")[1]).join(", ")}
      </h2>

      {/* Admin rolü kontrolü */}
      {userRole.includes("ROLE_ADMIN") && (
        <>
          {/* Form Seçenekleri */}
          <FormButtonsContainer>
            <FormButton onClick={() => handleFormClick("form1")}>
              Tarih Güncelle
            </FormButton>
            <FormButton onClick={() => handleFormClick("form2")}>
              Fiyatları Güncelle
            </FormButton>
            <FormButton onClick={() => handleFormClick("form3")}>
              Ölçüm Oluştur
            </FormButton>
            <FormButton onClick={() => handleFormClick("form4")}>
              Kullanıcı Oluştur
            </FormButton>
            <FormButton onClick={() => handleFormClick("form5")}>
              İçerideki Kullanıcı Sayısı
            </FormButton>
          </FormButtonsContainer>

          {/* Aktif Forma Göre İçeriği Göster */}
          {activeForm === "form1" && (
            <Form1>
              <form onSubmit={handleSubmit}>
                <label>
                  Email:
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <br />
                <br />
                <label>
                  <span>Ay: </span>
                  <select
                    value={month}
                    onChange={(e) => setMonth(parseInt(e.target.value))}
                  >
                    <option value={0}>Seçiniz</option>
                    <option value={1}>1</option>
                    <option value={3}>3</option>
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                  </select>
                </label>
                <br />
                <br />
                <button type="submit">Gönder</button>
              </form>
              {successMessage && (
                <SuccessMessage>{successMessage}</SuccessMessage>
              )}{" "}
              {/* Başarı mesajını göster */}
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}{" "}
              {/* Hata mesajını göster */}
            </Form1>
          )}
          {activeForm === "form2" && (
            <Form2>
              <form onSubmit={handleSubmit1}>
                <label>
                  1 Aylık:
                  <input
                    type="number"
                    value={formData.oneMonths}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        oneMonths: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </label>
                <br />
                <label>
                  3 Aylık:
                  <input
                    type="number"
                    value={formData.threeMonths}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        threeMonths: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </label>
                <br />
                <label>
                  6 Aylık:
                  <input
                    type="number"
                    value={formData.sixMonths}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sixMonths: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </label>
                <br />
                <label>
                  12 Aylık:
                  <input
                    type="number"
                    value={formData.twelveMonths}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        twelveMonths: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </label>
                <br />
                <button type="submit">Gönder</button>
              </form>
              {successMessage && (
                <SuccessMessage>{successMessage}</SuccessMessage>
              )}
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </Form2>
          )}
          {activeForm === "form3" && (
            <Form3>
              <form onSubmit={handleSubmit2}>
                <label>
                  Email:
                  <input
                    type="email"
                    value={formData1.email}
                    onChange={(e) =>
                      setFormData1({ ...formData1, email: e.target.value })
                    }
                    required
                  />
                </label>
                <br />
                <label>
                  Boy:
                  <input
                    type="number"
                    value={formData1.height}
                    onChange={(e) =>
                      setFormData1({
                        ...formData1,
                        height: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </label>
                <br />
                <label>
                  Kilo:
                  <input
                    type="number"
                    value={formData1.weight}
                    onChange={(e) =>
                      setFormData1({
                        ...formData1,
                        weight: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </label>
                <br />
                <label>
                  Göğüs:
                  <input
                    type="number"
                    value={formData1.chest}
                    onChange={(e) =>
                      setFormData1({
                        ...formData1,
                        chest: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </label>
                <br />
                <label>
                  Bel:
                  <input
                    type="number"
                    value={formData1.waist}
                    onChange={(e) =>
                      setFormData1({
                        ...formData1,
                        waist: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </label>
                <br />
                <label>
                  Kalça:
                  <input
                    type="number"
                    value={formData1.hip}
                    onChange={(e) =>
                      setFormData1({
                        ...formData1,
                        hip: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </label>
                <br />
                <button type="submit">Gönder</button>
              </form>
              {successMessage && (
                <SuccessMessage>{successMessage}</SuccessMessage>
              )}
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </Form3>
          )}
          {activeForm === "form4" && (
            <Form4>
              <form onSubmit={handleSubmit3}>
                <label>
                  Ad:
                  <input
                    type="text"
                    value={formData2.firstName}
                    onChange={(e) =>
                      setFormData2({ ...formData2, firstName: e.target.value })
                    }
                    required
                  />
                </label>
                <br />
                <label>
                  Soyad:
                  <input
                    type="text"
                    value={formData2.lastName}
                    onChange={(e) =>
                      setFormData2({ ...formData2, lastName: e.target.value })
                    }
                    required
                  />
                </label>
                <br />
                <label>
                  Email:
                  <input
                    type="email"
                    value={formData2.email}
                    onChange={(e) =>
                      setFormData2({ ...formData2, email: e.target.value })
                    }
                    required
                  />
                </label>
                <br />
                <label>
                  Bitiş Tarihi:
                  <input
                    type="date"
                    value={formData2.endDate}
                    onChange={(e) =>
                      setFormData2({ ...formData2, endDate: e.target.value })
                    }
                    required
                  />
                </label>
                <br />
                <button type="submit">Gönder</button>
              </form>
              {successMessage && (
                <SuccessMessage>{successMessage}</SuccessMessage>
              )}
            </Form4>
          )}
          {activeForm === "form5" && (
            <Form5>
              <p style={{ fontSize: "24px" }}>
                {numberFromApi !== null ? numberFromApi : "Loading..."}
              </p>
            </Form5>
          )}
        </>
      )}
      {/* user rolü kontrolü */}
      {userRole.includes("ROLE_USER") && (
        <Wrapper1>
          <b>Kalan Süre: </b>{" "}
          {numberFromApi1 !== null ? numberFromApi1 : "Loading..."}
          <hr />
          <h2>Ölçümler</h2>
          <ScrollableList>
            {measurements.map((measurement, index) => (
              <div key={index}>
                <p>
                  <strong>Boy:</strong> {measurement.height} cm
                </p>
                <p>
                  <strong>Kilo:</strong> {measurement.weight} kg
                </p>
                <p>
                  <strong>Göğüs:</strong> {measurement.chest} cm
                </p>
                <p>
                  <strong>Bel:</strong> {measurement.waist} cm
                </p>
                <p>
                  <strong>Kalça:</strong> {measurement.hip} cm
                </p>
                <p>
                  <strong>Ölçüm Tarihi:</strong> {measurement.createdDate}
                </p>
                <hr />
              </div>
            ))}
          </ScrollableList>
        </Wrapper1>
      )}
    </ProfilContainer>
  );
};

export default Profil;

const Wrapper1 = styled.div`
  margin-left: ;
`;

// Styled Components
const ProfilContainer = styled.div`
  background-color: #1e1e1e;
  color: white;
  padding: 20px;
  height: auto;
  margin-left: 175px;
  border-radius: 8px;
  box-shadow: 0 0 20px #39ff14;
  text-align: center;
  width: 100%;

  ${(props) =>
    props.userRole.includes("ROLE_USER") &&
    `
    margin-top: 70px;
    margin-left: 400px;
    background-color: #333; /* User rolü için farklı arka plan */
    box-shadow: 0 0 20px #ff6347; /* User rolü için farklı gölge */
  `}
`;

const FormButtonsContainer = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 15px; /* Butonlar arasında boşluk için gap'i artırdım */
`;

const FormButton = styled.button`
  background-color: #39ff14;
  color: black;
  padding: 12px 25px; /* Buton içindeki boşluğu artırdım */
  border: none;
  border-radius: 6px; /* Köşe yuvarlama için radius'u artırdım */
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease; /* Geçiş efekti ekledim */

  &:hover {
    background-color: #32e30f;
  }
`;

const Form1 = styled.div`
  display: flex;
  flex-direction: column; /* İçeriği dikey olarak hizalamak için column ayarlandı */
  align-items: center; /* İçeriği ortalamak için align-items kullanıldı */

  background-color: #333;
  padding: 25px; /* Formun içindeki boşluğu artırdım */
  border-radius: 8px;
  margin-top: 20px;
`;

const Form2 = styled.div`
  display: flex;
  flex-direction: column; /* İçeriği dikey olarak hizalamak için column ayarlandı */
  align-items: center; /* İçeriği ortalamak için align-items kullanıldı */

  background-color: #333;
  padding: 25px; /* Formun içindeki boşluğu artırdım */
  border-radius: 8px;
  margin-top: 20px;
`;

const Form3 = styled.div`
  display: flex;
  flex-direction: column; /* İçeriği dikey olarak hizalamak için column ayarlandı */
  align-items: center; /* İçeriği ortalamak için align-items kullanıldı */

  background-color: #333;
  padding: 25px; /* Formun içindeki boşluğu artırdım */
  border-radius: 8px;
  margin-top: 20px;
`;

const Form4 = styled.div`
  display: flex;
  flex-direction: column; /* İçeriği dikey olarak hizalamak için column ayarlandı */
  align-items: center; /* İçeriği ortalamak için align-items kullanıldı */

  background-color: #333;
  padding: 25px; /* Formun içindeki boşluğu artırdım */
  border-radius: 8px;
  margin-top: 20px;
`;

const Form5 = styled.div`
  display: flex;
  flex-direction: column; /* İçeriği dikey olarak hizalamak için column ayarlandı */
  align-items: center; /* İçeriği ortalamak için align-items kullanıldı */

  background-color: #333;
  padding: 25px; /* Formun içindeki boşluğu artırdım */
  border-radius: 8px;
  margin-top: 20px;
`;

const MessageContainer = styled.div`
  margin-top: 20px;
  color: #ff0000; /* Hata mesajı için kırmızı renk */
`;

const SuccessMessage = styled.div`
  margin-top: 10px;
  color: #39ff14; /* Başarı mesajı için yeşil renk */
  font-weight: bold;
`;

const ScrollableList = styled.ul`
  max-height: 240px; /* Listenin maksimum yüksekliğini belirliyoruz */
  overflow-y: scroll; /* Y ekseni boyunca kaydırmayı etkinleştiriyoruz */
  padding: 0; /* Varsayılan padding'i kaldırıyoruz */
  margin: 0; /* Varsayılan margin'i kaldırıyoruz */
  list-style-type: none; /* Liste işaretçilerini kaldırıyoruz */
`;
