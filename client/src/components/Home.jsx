import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCountries,
  filterCountryByContinent,
  sortByName,
  sortByPopulation,
  filterActivityBySeason,
} from "../actions/create";
import Card from "./Card";
import Paginado from "./Paginado";
import "../css/Home.css";

function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const [render, setRender] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [countryPerPage] = useState(10);

  const lastIndex = countryPerPage * currentPage;
  const firstIndex = lastIndex - countryPerPage;
  const currentCountries = allCountries.slice(firstIndex, lastIndex);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const paginado = (page) => {
    setCurrentPage(page);
  };

  function handleFilterByContinent(e) {
    e.preventDefault();
    dispatch(filterCountryByContinent(e.target.value));
  }
  function handleFilterBySeason(e) {
    e.preventDefault();
    dispatch(filterActivityBySeason());
    setCurrentPage(1);
  }
  function handleSortByAlphabet(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setRender(`ordenado ${e.target.value}`);
  }
  function handleSortByPopulation(e) {
    e.preventDefault();
    dispatch(sortByPopulation(e.target.value));
    setRender(`ordenado ${e.target.value}`);
  }

  return (
    <div className="containerHome">
      <div>
        

        <button
          onClick={() => dispatch(getCountries())}
          className="buttonClean"
        >
          Clean Filters
        </button>

        <select
          onChange={(e) => handleFilterByContinent(e)}
          className="selectFilter"
        >
          <option value="default">Filter By Continent </option>
          <option value="All">All Continents</option>
          <option value="Americas">Americas </option>
          <option value="Europe">Europe </option>
          <option value="Asia">Asia </option>
          <option value="Oceania">Oceania</option>
          <option value="Africa">Africa</option>
        </select>

        <button
          onClick={(e) => handleFilterBySeason(e)}
          className="buttonClean"
        >
          Get Activities
        </button>

        <select
          onChange={(e) => handleSortByAlphabet(e)}
          className="selectFilter"
        >
          <option value="default">Sort Alphabet by </option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>

        <select
          onChange={(e) => handleSortByPopulation(e)}
          className="selectFilter"
        >
          <option value="default"> Sort population by</option>
          <option value="may">Higher population</option>
          <option value="men">Lower Population</option>
        </select>
      </div>

      <div className="cards">
        {currentCountries.map((c) => {
          return (
            <div key={c.id}>
              <Link to={"/countries/" + c.id} style={{textDecoration:"none"}}>
                <Card
                  name={c.name}
                  flag={c.flag}
                  continent={c.continent}
                  capital={c.capital}
                />
              </Link>
            </div>
          );
        })}
      </div>
      <Paginado
          countriesPerPage={countryPerPage}
          allCountries={allCountries.length}
          paginado={paginado}
        />
    </div>
  );
}

export default Home;
