import React from "react";
import { Link } from "react-router-dom";
import "./CardCountry.css";

export default function CardCountry({ id, name, flag, population, region }) {
  //const { id, name, flag, population, subregion } = props.data;
  return (
    <>
      <div className="cardContainer">
        <div className="flag">
          <img src={flag ? flag : null} alt="imagen" width="300" height="220" />
        </div>
        <div className="details">
          <h4 className="country-name">
            Name: <span>{name}</span>
          </h4>

          <h4>
            Region: <span>{region}</span>
          </h4>

          <h4>
            Population: <span>{population?.toLocaleString()}</span>
          </h4>

          <div className="link">
            <Link to={`/detail/${id}`} className="link" key={id}>
              <span> More Info</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
