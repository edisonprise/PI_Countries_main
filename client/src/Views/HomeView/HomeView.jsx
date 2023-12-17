import React from "react";

import CardsCountry from "./CardsCountry/CardsCountry";
import { NavBar } from "./NavBar/NavBar";

import Header from "./Header/Header";

import style from "./home.module.css";

const Home = () => {
  return (
    <div className={style.image}>
      <Header />
      <NavBar />
      <CardsCountry />
    </div>
  );
};
export default Home;
