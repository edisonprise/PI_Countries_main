import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCountries,
  newActivity,
  getAllActivities,
} from "../../redux/actions/actions";
import {
  AddCountryForm,
  AddCountryFormWrapper,
  AddCountryItemsWraper,
  AddCountryWrapper,
  CreateCountryInput,
} from "../../Styled/AddCountry";
import s from "./AddActivity.module.css";

const Activity2 = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getAllActivities());
  }, [dispatch]);

  const [activity, setActivity] = useState({
    name: "",
    difficult: "",
    duration: "",
    season: [],
    countries: [],
  });
  const [error, setError] = useState("Fill in the fields");

  function handleChangeNew(ev) {
    setActivity({
      ...activity,
      [ev.target.name]: ev.target.value,
    });
    setError(
      validation({
        ...activity,
        [ev.target.name]: ev.target.value,
      })
    );
  }

  function handleSelect(ev) {
    setActivity({
      ...activity,
      countries: Array.from(
        ev.target.selectedOptions,
        (option) => option.value
      ),
    });
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    dispatch(newActivity(activity));
    setActivity({
      name: "",
      difficult: "",
      duration: "",
      season: "Seasons",
      countries: "",
    });
    alert("successfully created activity");
  }

  function validation(input) {
    if (!input.name) return "Name is required.";
    if (input.name.length > 20) return "Name length limit exceeded";
    if (!isNaN(input.name)) return "Name must be a letter";

    if (!input.difficult) return "Difficult is required.";
    if (isNaN(input.difficult)) return "Difficult must be a number.";
    if (input.difficult < 0 || input.difficult > 5)
      return "Difficult range is from 0 to 5.";

    if (!input.duration) return "Duration is required.";
    if (isNaN(input.duration)) return "Duration must be a number.";
    if (input.duration < 0) return "Duration must be greater than 0.";

    return "";
  }

  return (
    <AddCountryWrapper>
      <AddCountryFormWrapper onSubmit={(ev) => handleSubmit(ev)}>
        <AddCountryForm>
          <AddCountryItemsWraper>
            <label> NAME </label>
            <CreateCountryInput
              type={"text"}
              onChange={handleChangeNew}
              autoComplete={"off"}
              name={"name"}
              value={activity.name}
              placeholder={"Please, enter activity"}
            />
          </AddCountryItemsWraper>

          <div>
            <label> Create activity: </label>
          </div>

          <div>
            {["name", "difficult", "duration"].map((el) => (
              <div key={el}>
                <input
                  className={s.input}
                  type="text"
                  autoComplete="off"
                  placeholder={el[0].toUpperCase() + el.slice(1)}
                  name={el}
                  value={activity[el]}
                  onChange={(ev) => handleChangeNew(ev)}
                />
                {el === "difficult" && <label> 0-5</label>}
                {el === "duration" && <label> in minutes</label>}
              </div>
            ))}
            <div>
              <select
                className={s.selectcss}
                name="season"
                onChange={(ev) => handleChangeNew(ev)}
              >
                {["Seasons", "Verano", "Invierno", "Primavera", "Otoño"].map(
                  (el) => (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div>
            <label>Countries related to this activity:</label> <br />
            <select
              className={s.selectcssc}
              onChange={(ev) => handleSelect(ev)}
              multiple
            >
              <option value=""></option>

              {allCountries?.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>{" "}
            <br />
            <label className={s.smallLetter}>
              Hold down the Ctrl button to select multiple options.
            </label>
          </div>
          <br />
          {error ? (
            <p className={s.errMsg}>{error}</p>
          ) : (
            <Link to="/ruta" className={s.btn}>
            <button className={s.btn} type="submit">
              Add
            </button>
            </Link> 
          )}
        </AddCountryForm>
      </AddCountryFormWrapper>
      <br />
    </AddCountryWrapper>
  );
};

export default Activity2;
