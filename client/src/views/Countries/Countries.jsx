import React from "react";

import Country from "../Country/Country";

import Paginator from "../Paginator/Paginator";

export default function Countries() {
  return <Paginator RenderComponent={Country} />;
}
