import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getCountryByName} from '../actions/create';
import "../css/SearchBar.css";

function SearchBar() {
    const dispatch = useDispatch();
  const [input, setInput] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setInput(e.target.value);
  }
  function handleSubmit(e) {
      e.preventDefault();
      dispatch(getCountryByName(input))
      setInput('')

      
  }

  return (
    <div className="containerSearch">
      <input className="inputSearch"
        value={input}
        type="text"
        placeholder="Search your country"
        onChange={(e) => handleChange(e)}
      />
      <button className="bSubmit" type="submit"
      onClick={(e) => handleSubmit(e)} >Search</button>
    </div>
  );
}

export default SearchBar;
