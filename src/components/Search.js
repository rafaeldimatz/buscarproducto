import React, { useState } from "react";
import "../style/style.css";
import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {withRouter} from 'react-router-dom'

function Search(props) {
  const [searchText, setSearchText] = useState(""); //Guarda la palabra escrita en el input
  const onSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };
  const {history} = props;
  const handleSubmit = (search) => {
       history.push(`/items/search/${searchText}`)
  };

  return (
    <header>
      <div className="item-logo">
        <img src={logo} alt="Mercado Libre"></img>
      </div>
      <div className="item-header">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(searchText);
          }}
        >
          <input
            type="text"
            name="inputsearch"
            data-testid="inputsearch"
            placeholder="Nunca dejes de buscar"
            value={searchText}
            onChange={onSearchTextChange}
          />
        </form>
      </div>
      <div className="item-button">
        <div className="awasone">
          <a id="home-link" data-testid="a" href={`/items/search/${searchText}`}>
            {" "}
            {/* Llamada a la pagina de ProductsResult*/}
            <FontAwesomeIcon
              icon={faSearch}
              size={"lg"}
              style={{ margin: "8px", color: "#4c4949" }}
            />
          </a>
        </div>
      </div>
    </header>
  );
}
export default withRouter(Search);