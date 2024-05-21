import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/userContext";

interface ProductOptions{
  id: string;
    name: string;
    available: boolean;
    price: number;
    discount: number;
    description: string;
    img: string;
}

interface CuponOptions{
  product:ProductOptions,
  used:boolean,
  promotionalCode:string

}



export function UserCupons() {
  const [userCupons, setUserCupons] = useState<CuponOptions[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { token, setToken } = useContext(UserContext);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3000/api/user/discounts", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setUserCupons(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user coupons:", error);
        })
        .finally(() => {
          setIsLoading(false); // Set loading to false after data is fetched
        });
    }
  }, [token]);

  const handleCupon = (promotionalCode:string) => {
    if (token) {
      axios
        .patch(
          "http://localhost:3000/api/user/use-discount",
          { promotionalCode: promotionalCode },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          // Actualizar el estado local
          setUserCupons((prevCupons) =>
            prevCupons.map((item) =>
              item.promotionalCode === promotionalCode
                ? { ...item, used: true }
                : item
            )
          );
          setToken(token); 
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <section className="userCupons-container">
        {isLoading ? (
          <h2>Cargando cupones...</h2>
        ) : userCupons.length > 0 ? (
          <table>
            <thead>
              <tr className="campos">
                <th>Producto</th>
                <th>Precio de lista</th>
                <th>Descuento</th>
                <th>Cupón</th>
              </tr>
            </thead>
            <tbody>
              {userCupons.map((item) => (
                <tr key={item.product.id}>
                  <td>{item.product.name}</td>
                  <td>{`$${item.product.price}`}</td>
                  <td>{`%${item.product.discount}`}</td>
                  <td className="promotional-code">
                    {item.used ? (
                      item.promotionalCode
                    ) : (
                      <button
                        className="generate-promotionalCode"
                        onClick={() => handleCupon(item.promotionalCode)}
                      >
                        Generar cupón
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2>NO HAY CUPONES AGREGADOS</h2>
        )}
      </section>
    </>
  );
}