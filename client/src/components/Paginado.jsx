import React from "react";
import "../css/Paginado.css";

function Paginado({ countriesPerPage, allCountries, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="order">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number} style={{ display: "inline" }}>
              <button onClick={() => paginado(number)} className="numberPage">{number}</button>
            </li>
          ))}
      </ul>
    </nav>
  );
}

export default Paginado;
