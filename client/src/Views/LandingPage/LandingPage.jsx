import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";
//import tierra from "./media/tierra.m4v"

export default function LandingPage() {
  return (
    <div className={style.image}>
      {/* <video src={tierra} autoPlay loop muted></video> */}
      <div className={style.containerBtn}>
        <Link to="/home" className={style.link}>
          <button id={style.btn}>Start Now</button>
        </Link>
      </div>
    </div>
  );
}
