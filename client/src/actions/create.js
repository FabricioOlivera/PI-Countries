import {
  GET_COUNTRIES,
  FILTER_BY_CONTINENT,
  SORT_BY_NAME,
  SORT_BY_POPULATION,
  GET_COUNTRY_BY_NAME,
  GET_COUNTRY_BY_ID,
  FILTER_BY_SEASON,
} from "./types";
import axios from "axios";

export function getCountries() {
  return async function (dispatch) {
    const countries = await axios.get("http://localhost:3001/countries");
    return dispatch({
      type: GET_COUNTRIES,
      payload: countries.data,
    });
  };
}
export function getCountryByName(name) {
  return async function (dispatch) {
    const countries = await axios.get(
      "http://localhost:3001/countries?name=" + name
    );
    return dispatch({
      type: GET_COUNTRY_BY_NAME,
      payload: countries.data,
    });
  };
}
export function getCountryById(id) {
  return async function (dispatch) {
    const countries = await axios.get("http://localhost:3001/countries/" + id);
    return dispatch({
      type: GET_COUNTRY_BY_ID,
      payload: countries.data,
    });
  };
}

export function createActivity(form){
  console.log(form)
  return async function () {
    const countries = await axios.post("http://localhost:3001/activities", form);
    
    return countries
  }
}

export function filterCountryByContinent(payload) {
  return { type: FILTER_BY_CONTINENT, payload };
}
export function filterActivityBySeason() {
  return { type: FILTER_BY_SEASON };
}
export function sortByName(payload) {
  return { type: SORT_BY_NAME, payload };
}
export function sortByPopulation(payload) {
  return { type: SORT_BY_POPULATION, payload };
}
