/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { filterByContinent } from "../../../redux/actions/actions";
import "./PaginationComponent.css";

export default function PaginationComponent({
  countryPerPage,
  getPaginationGroup,
  currentPage,
  setCurrentPage,
}) {
  const country = useSelector((state) => state.allCountries);
  const currenCountries = useSelector((state) => state.currentCountries);

  const [pages, setPages] = useState(
    Math.ceil(currenCountries.length / countryPerPage)
  );

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function gotToPrevPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(e) {
    const pageNumber = Number(e.target.textContent);

    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    setPages(Math.ceil(country.length / 10));

    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  useEffect(() => {
    setPages(Math.ceil(currenCountries.length / 10));

    setCurrentPage(pages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currenCountries]);

  return (
    <>
      <div className="paginationWrap">
        {/* previous button */}
        <button
          onClick={gotToPrevPage}
          className={`prev ${currentPage === 1 ? "disable" : ""}`}
        >
          prev
        </button>

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${currentPage === item ? "active" : ""}`}
          >
            <span>{item}</span>
            {console.log("item:", item)}
            {console.log("currentPage", currentPage)}
          </button>
        ))}

        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? "disable" : ""}`}
        >
          next
          {console.log("pages:", pages)}
        </button>
      </div>
    </>
  );
}
