import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import "../style/style.css";

export default function Details() {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState({}); //Detalle de producto seleccionado
  const [productDescription, setProductDescription] = useState({}); //Descripcion de producto seleccionado
  const [loadDet, setLoadDet] = useState(true); //Activar/Desactivar Spinner
  const [loadDesc, setLoadDesc] = useState(true); //Activar/Desactivar Spinner
  useEffect(() => {
    const url = process.env.REACT_APP_URL_PRODUCTS_DETAILS + id;
    const urlDesc = process.env.REACT_APP_URL_PRODUCTS_DESCRIPTION + id + "/description";
    fetch(url)
      .then((response) => {
        setLoadDet(false);
        if (response.status !== 404) return response.json();
        else 
        throw new Error(response.status);
      })
      .then((data) => {
        setProductDetail(data);
      })
      .catch((err) => console.log("Error Detail:" + err));
    fetch(urlDesc)
      .then((response) => {
        setLoadDesc(false);
        if (response.status !== 404) return response.json();
        else 
        throw new Error(response.status);
      })
      .then((data) => {
        setProductDescription(data);
      })
      .catch((err) => console.log("Error Description:" + err));
  }, [id]);
  return (
    <div className="results">
      <div className="span-path">
        <span>categoria - ciudad - pais</span>
      </div>
      {loadDet || loadDesc ? (
        <div className="spinner">
          <ClipLoader color={"white"} border={"10px solid"} size={50} />
        </div>
      ) : (
        <div>
          {
            /*Ternaria que muestra detalles o muestra cartel que no existe detalles */
            Object.keys(productDetail).length === 0 ? (
              <h1 style={{ paddingBottom: "50px" }}>No tiene Detalles para mostrar</h1>
            ) : (
              <div className="container-details">
                <div className="flex-details">
                  <div className="flex-details-img">
                    <img src={productDetail.thumbnail} alt="Product Detail" />
                  </div>
                  <div className="container-state">
                    <div className="description">{productDetail.warranty}</div>
                    <div className="description">
                      Estado: {productDetail.status}
                    </div>
                    <div className="description">{productDetail.title}</div>
                    <div className="precio">
                      <p> $ {productDetail.price}</p>
                    </div>
                    <button className="comprarbtn">Comprar</button>
                  </div>
                </div>
                <div>
                  {
                    /* Ternaria para mostrar descripcion o avisar que no tiene descripcion */
                    Object.keys(productDescription).length === 0 ? (
                      <h1 style={{ paddingBottom: "50px" }}>
                        No tiene Descripcion
                      </h1>
                    ) : (
                      <div>
                        <h1>Descripcion del producto</h1>
                        <div className="flex-details-title">
                          {productDescription.plain_text}
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            )
          }
        </div>
      )}
    </div>
  );
}
