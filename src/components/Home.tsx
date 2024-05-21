import axios from "axios";
import { useEffect, useState, useContext } from "react";
import banner from "../assets/background3.jpg";
import hotSale from "../assets/hotsale.png";
import { Login } from "./Login";
import { Register } from "./Register";
import { ModalContext } from "../context/modalContext";
import { ModalRegisterContext } from "../context/modalRegistarContext";
import { UserContext } from "../context/userContext";
import { PopUp } from "../commons/PopUp";

interface Product {
  id: string;
  name: string;
  available: boolean;
  price: number;
  discount: number;
  description: string;
  img: string;
}

export function Home() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/product/list")
      .then((response) => {
        setProductList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { menuOpen, togleMenu } = useContext(ModalContext);
  const { menuRegisterOpen } = useContext(ModalRegisterContext);
  const { id, email, token } = useContext(UserContext);

  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [popUpMessage, setPopUpMessage] = useState<string>("");

  const handlePopUp = (message: string) => {
    setOpenPopUp(!openPopUp);
    setPopUpMessage(message);
  };

  const getDiscountHandler = async (productId: string) => {
    if (!email) {
      handlePopUp("Debes loguearte para obtener el cupón");
      return;
    }
    try {
      const newCupon = await axios.post(
        `http://localhost:3000/api/user/add-discount`,
        { productId: productId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      handlePopUp("El cupon ha sido agregado");
      return;
    } catch (error) {
      console.log(error);
      handlePopUp(`${error?.response?.data?.error}`);
    }
  };

  return (
    <>
      <main className="home-container">
        {openPopUp && (
          <PopUp
            handlePopUp={handlePopUp}
            message={popUpMessage}
            handleNavigate={togleMenu}
          />
        )}
        {menuOpen && <Login />}
        {menuRegisterOpen && (
          <Register
            handlePopUp={handlePopUp}
            message="A continuación recibirá un email que le permitira validar su direccion de correo"
          />
        )}
        <div className="anuncio-container">
          <img
            className="anuncio-background"
            src={banner}
            alt="Banner promocional"
          />

          <h1>
            Disfruta de <span>increibles descuentos</span>
          </h1>
          <p>en productos seleccionados</p>

          <img className="anuncio-hotsale-logo" src={hotSale} alt="hot sale " />
        </div>

        <div className="grid-container">
          {productList.map((product: Product) => {
            return (
              <div className="grid-card" key={product.id}>
                <img src={product.img} alt={product.name} />
                <div className="descuento-container">
                  <p>{`CUPÓN % ${product.discount} OFF`}</p>
                </div>
                <div className="card-info">
                  <h3>{product.name}</h3>
                  <h4>{`$${product.price}`}</h4>
                  <h2>{`$${
                    (product.price * (100 - product.discount)) / 100
                  }`}</h2>
                </div>
                <button
                  onClick={() => getDiscountHandler(product.id)}
                  className="button-cupon"
                >
                  {" "}
                  Obtener cupón
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
