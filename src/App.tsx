import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { UserCupons } from "./components/UserCupons";
import { NotFound } from "./components/NotFound";
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./context/userContext";

function App() {
  const { setToken, setEmail, setId, setName, email } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    let userData = null;
    let token = null;
    
    if (userDataString) {
      userData = JSON.parse(userDataString);
      token = userData.token;
    }
    
    if (token) {
      axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setToken(token);
        setEmail(response.data.email);
        setId(response.data.id);
        setName(response.data.name);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [setToken, setEmail, setId, setName]);

  if (isLoading) {
    return <div>Cargando...</div>; // Indicador de carga mientras se obtienen los datos
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {email && <Route path="/my-cupons" element={<UserCupons />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;