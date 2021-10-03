import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import "../style/style.css";

export default function Results() {
  const { searchprod } = useParams();
  const [listProducts, setListProducts] = useState([]); //Productos encontrados
  const [load, setLoad] = useState(true); //Activar/Desactivar Spinner
  //Dado el valor escrito en el input, lo tengo como parametro, para llamar a la api
  useEffect(() => {
    //const url = process.env.REACT_APP_URL_PRODUCTS + searchprod;
    const url = "http://localhost:8080/demo-0.0.1-SNAPSHOT/productos"
    fetch(url,{
      "method": "GET",
      "headers": {
        "search": searchprod
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setListProducts(data.results.slice(0, 4)); // Solo pidieron 4 elementos por eso uso el .slice(0,4)
        setLoad(false);
      })
      .catch((err) => console.log("Error:" + err));
  }, [searchprod]);

  return (
    <div className="results">
      <div className="span-path">
        <span>categoria - ciudad - pais</span>
      </div>
      {load ? (
        <div className="spinner">
          <ClipLoader color={"white"} border={"10px solid"} size={50} />
        </div>
      ) : (
        <div className="container">
          {
            /* Ternaria para mostrar resultados encontrados o avisar que no hubo resultados*/
            listProducts.length < 0 || searchprod === undefined ? (
              <div>
                <p style={{ height: "300px", color: "#ED1B3B" }}>
                  Ingrese un valor a buscar</p>
              </div>
            ) : (
              <div>
                {listProducts.map((item) => (
                  /* itero los elementos encontrados */
                  <Link to={`/item/${item.id}`} className="link" key={item.id}>
                    {/* Llamada a la pagina de ProductsResult*/}
                    <div className="flex-container">
                      <div className="flex-items-img">
                        <img src={item.thumbnail} alt={item.title} />
                      </div>
                      <div className="flex-items-title">
                        <p>{item.title}</p>
                        <p className="type">{item.prices.prices[0].type}</p>
                      </div>
                      <div className="flex-items-state">
                        <p>{item.address.state_name}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )
          }
        </div>
      )}
    </div>
  );
}
