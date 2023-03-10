import React from "react";

import Filter from "../Filter/Filter";
import Ordenar from "../Ordenar/Ordenar";

import style from "../../css/filterandorder.module.css";
import SearchBar from "../SearchBar/SearchBar";

export default function FilterAndOrder() {
  return (
    <div className={style.contenedor}>
      <Ordenar />
      <Filter />
      <SearchBar />
    </div>
  );
}
