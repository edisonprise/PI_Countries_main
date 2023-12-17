import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Header.module.css";

const Header = () => {
  const changeTheme = () => {
    const header = document.querySelector(".header");
    const details = document.querySelectorAll(".details");
    const uls = document.querySelectorAll("ul");

    details.forEach((detail) => {
      detail.classList.toggle("light-theme");
    });
    header.classList.toggle("light-theme");
    uls.forEach((ul) => {
      ul.classList.toggle("light-theme");
    });
    document.body.classList.toggle("light-theme");
  };
  return (
    <>
      <header className={style.header}>
        <div>
          <h1>My Country!</h1>
        </div>

        <SearchBar />
      </header>
    </>
  );
};

export default Header;
