import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router";

import { getCountries, setLoading } from "../../../redux/actions/actions";
import Loading from "../../Loading/Loading";

import CardCountry from "../CardCountry/CardCountry";
import FilterSet from "../filters/filterSet";
import PaginationComponent from "../Pagination/PaginationComponent";

function CardsCountry() {
  const country = useSelector((state) => state.currentCountries);
  const loading = useSelector((state) => state.loading);

  const [currentPage, setCurrentPage] = useState(1);
  const [countryPerPage, SetCountryPerPage] = useState(10);
  //const navigate = useNavigate();
  //const indexOfLastCount = currentPage * countryPerPage;
  //const indexOfFirstCount = indexOfLastCount - countryPerPage;
  const startIndex = currentPage * countryPerPage - countryPerPage;
  const endIndex = startIndex + countryPerPage;
  const currentCountry = country.slice(startIndex, endIndex);

  // show the pagination
  // it consist of next and previous buttons

  const getPaginationGroup = () => {
    return new Array(Math.ceil(country.length / 10))
      .fill()
      .map((_, idx) => idx + 1);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [country]);

  /*unmounting*/
  useEffect(() => {
    return country.length
      ? dispatch(setLoading(false))
      : dispatch(setLoading(true));
  }, [country, dispatch]);

  const handleClear = () => {
    dispatch(getCountries());
  };

  return (
    <>
      {loading ? (
        <>
          <button className="btn" onClick={() => handleClear()}>
            Go Back
          </button>
          <Loading />
          {/* <p>Not Found Country!! please check and try again...</p> */}
        </>
      ) : (
        <div>
          <FilterSet />

          <PaginationComponent
            getPaginationGroup={getPaginationGroup}
            countryPerPage={countryPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          <section className="countries">
            {Array.isArray(currentCountry) ? (
              currentCountry.map((c) => {
                return (
                  <CardCountry
                    key={c.id}
                    name={c.name}
                    flag={c.flag}
                    region={c.subregion?.region?.name}
                    population={c.population?.toLocaleString()}
                    id={c.id}
                  />
                );
              })
            ) : (
              <h1>Not found</h1>
            )}
          </section>

          <PaginationComponent
            getPaginationGroup={getPaginationGroup}
            allCountries={country}
            countryPerPage={countryPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </>
  );
}

export default CardsCountry;
