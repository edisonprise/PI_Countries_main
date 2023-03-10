import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCountries } from "../../redux/actions";
import Countries from "../Countries/Countries";

import style from "../../css/Home.module.css"
import FilterAndOrder from "../FilterAndOrder/FilterAndOrder";

export default function Home() {
  const dispatch = useDispatch();
  const filtrado = useSelector((st) => st.applyFilterAndOrder);

  useEffect(() => {
    if (filtrado) dispatch(loadCountries()); //si se aplica algun filtrado y se recarga el componente, vuelve a cargar los paises
  }, []);

  return (
    <>
      <div className={style.navContainer}>
        <FilterAndOrder />
      </div>
      <Countries />
    </>
  );
}
