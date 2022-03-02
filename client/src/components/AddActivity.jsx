import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createActivity, getCountries } from "../actions/create";
import "../css/AddActivity.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  }
  if (parseInt(input.duration) === 0 || input.duration === "") {
    errors.duration = "Select the duration to your activity";
  }
  if (!input.difficult || input.difficult === "0") {
    errors.dificult = "Select a dificult for your activity!";
  }
  if (!input.season || input.season === "Season") {
    errors.season = "Season is required for your activity (summer, winther...)";
  }
  if (input.countries.length === 0) {
    errors.countries = "Select one or more countries";
  }
  return errors;
}

function AddActivity() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const history = useHistory();

  const [form, setForm] = useState({
    name: "",
    difficult: "",
    duration: "",
    season: "",
    countries: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    setErrors(validate(form));
  }, [form]);

  function handleChange(e) {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    const validation = validate(form);
    setErrors(validation);
  }

  function handleSelectSeason(e) {
    setForm({
      ...form,
      season: e.target.value,
    });

    const validation = validate(form);
    setErrors(validation);
  }

  function handleSelecCountry(e) {
    setForm({
      ...form,
      countries: [...form.countries, e.target.value],
    });

    const validation = validate(form);
    setErrors(validation);
  }

  function handleDelete(c) {
    setForm({
      ...form,
      countries: form.countries.filter((e) => e !== c),
    });

    const validation = validate(form);
    setErrors(validation);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (Object.values(errors).length > 0) {
      alert("Fill in the information to create the activity");
    } else {
      dispatch(createActivity(form));
      alert("Activity Created!");

      setForm({
        name: "",
        difficult: "",
        duration: "",
        season: "",
        countries: [],
      });

      history.push("/countries");
    }
  }

  return (
    <div className="containerForm">
      <form
        className="form"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="title">Create Activity</h1>

        <div className="div">
          <label>Name</label>
          <input
            className="inputSearch"
            type="text"
            name="name"
            value={form.name}
            placeholder="Activity name"
            onChange={(e) => handleChange(e)}
          />

          {errors.name && <p className="errors">{errors.name} </p>}
        </div>

        <div className="div">
          <label>Duration</label>
          <input
            className="inputSearch"
            type="text"
            name="duration"
            value={form.duration}
            placeholder="Activity duration"
            onChange={(e) => handleChange(e)}
          />

          {errors.duration && <p className="errors">{errors.duration} </p>}
        </div>

        <div className="div">
          <label>Difficulty</label>
          <input
            className="inputSearch"
            type="number"
            min="1"
            max="5"
            name="difficult"
            value={form.difficult}
            onChange={(e) => handleChange(e)}
          />

          {errors.dificult && <p className="errors">{errors.dificult} </p>}
        </div>

        <div className="div">
          <label>Season</label>
          <select onClick={(e) => handleSelectSeason(e)}>
            <option value="Season">Season</option>
            <option name="season" value="Winter">
              Winter
            </option>
            <option name="season" value="Autumn">
              Autumn
            </option>
            <option name="season" value="Spring">
              Spring
            </option>
            <option name="season" value="Summer">
              Summer
            </option>
          </select>
          {errors.season && <p className="errors">{errors.season}</p>}
        </div>

        <div className="div">
          <div>
            <label>Countries:</label>
            <select onChange={(e) => handleSelecCountry(e)}className="selectCountry">
              <option>Please choose...</option>
              {countries.map((c) => {
                return (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            {form.countries.map((c) => {
              return (
                <div key={c} className="arrayCountries">
                  <h4>{c}</h4>
                  <button
                    onClick={() => handleDelete(c)}
                    className="buttonDelete"
                  >
                    Delete Country
                  </button>
                </div>
              );
            })}
          </div>
          {errors.countries && <p className="errors">{errors.countries}</p>}
        </div>

        <button className="buttonSubmit" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default AddActivity;
