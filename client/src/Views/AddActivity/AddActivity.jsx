import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCountries, newActivity } from "../../redux/actions/actions";
import { NavBar } from "../HomeView/NavBar/NavBar";
import style from "./AddActivity.module.css";

//methods
const validate = (input, e) => {
  const { name } = e.target;
  console.log("e.target:", e.target);
  let error = {};
  switch (name) {
    case "name":
      if (!/^[/A-Za-z\s]+$/g.test(input.name)) {
        error.name = "The name must not contain numbers";
      }
      break;
    case "difficulty":
      if (!/^[0-5]?[0-5]{1}$|^5$/.test(input.difficulty)) {
        error.difficulty = "The difficulty must be from 0 to 5";
      }
      break;
    case "duration":
      if (!/^[0-100]?[0-1]{1}$|^10$/.test(input.duration)) {
        error.duration = "The Duration must be from 0 to 100";
      }
      break;

    default:
      return "";
  }
  return error;
};

const AddActivity = () => {
  //Global states
  const country = useSelector((state) => state.allCountries);
  // console.log("country:", country)
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  //Local states
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });
  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate(
        {
          ...input,
          [e.target.name]: e.target.value,
        },
        e
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDisable(errors)) {
      alert("it must fill all fields!");
    } else {
      dispatch(newActivity(input));
      alert("Activity/ies created successfully");
      setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: "All",
        countries: "",
      });
      Navigate("/home");
    }
  };

  function handleSelect(id) {
    setInput({
      ...input,
      countries:
        input.countries.indexOf(id) === -1
          ? [...input.countries, id]
          : [...input.countries],
    });
  }

  function handleSelectSeason(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleDelete(country) {
    setInput({
      ...input,
      countries: input.countries.filter((c) => c !== country),
    });
  }
  function isDisable(errors) {
    return Object.keys(errors).length > 0;
  }
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);
  return (
    <div>
      <NavBar />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={style.form}>
          <div className={style.containerInput}>
            <div className={style.grupo}>
              <input
                type="text"
                name="name"
                value={input.name}
                className={style.input}
                required
                onChange={(e) => handleInput(e)}
              />
              <span className={errors.name ? style.error : style.barra}></span>
              {errors.name && <h6 id={style.errorWord}>{errors.name}</h6>}
              <label htmlFor="name" className={style.label}>
                Name
              </label>
            </div>

            <div className={style.grupo}>
              <input
                type="number"
                name="difficulty"
                value={input.difficulty}
                required
                className={style.input}
                onChange={(e) => handleInput(e)}
              />
              <span
                className={errors.difficulty ? style.error : style.barra}
              ></span>
              {errors.difficulty && (
                <h6 id={style.errorWord}>{errors.difficulty}</h6>
              )}
              <label className={style.label}>Difficulty</label>
            </div>

            <div className={style.grupo}>
              <input
                type="number"
                name="duration"
                value={input.duration}
                required
                className={style.input}
                onChange={(e) => handleInput(e)}
              />
              <span
                className={errors.duration ? style.error : style.barra}
              ></span>
              {errors.duration && (
                <h6 id={style.errorWord}>{errors.duration}</h6>
              )}
              <label className={style.label}>Duration</label>
            </div>

            <div className={style.grupo}>
              <select
                className={style.input}
                value={input.season}
                name="season"
                onChange={(e) => handleSelectSeason(e)}
              >
                <option value="All">All</option>
                <option value="Winter">Winter</option>
                <option value="Summer">Summer</option>
                <option value="Autumn">Autumn</option>
                <option value="Sping">Sping</option>
              </select>
            </div>

            <div className={style.grupo}>
              <div style={{ overflow: "auto", height: "200px" }}>
                {country?.map((c) => (
                  <div key={c.id}>
                    {c.name}{" "}
                    <span onClick={(e) => handleSelect(c.id)}>Agregar</span>
                  </div>
                ))}
              </div>
              {input.countries.map((c, i) => (
                <ul key={i}>
                  <li>
                    {c} <span onClick={(e) => handleDelete(c)}>X</span>{" "}
                  </li>
                </ul>
              ))}
            </div>
          </div>
          <div className={style.button}>
            <input
              type="submit"
              disabled={isDisable(errors)}
              value="Create Activity"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddActivity;
