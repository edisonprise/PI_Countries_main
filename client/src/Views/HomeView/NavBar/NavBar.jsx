import React from "react";
import style from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <div>
      <nav className={style.NavContainer}>
        <ul>
          <NavLink to="/" className={style.link} activeclassname={style.active}>
            {" "}
            <li>Home</li>
          </NavLink>
          <NavLink
            to="/createActivity"
            className={style.Link}
            activeclassname={style.active}
          >
            <li>New Activity</li>
          </NavLink>

          <NavLink
            to="/viewActivity"
            className={style.Link}
            activeclassname={style.active}
          >
            <li>My Activities</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};
