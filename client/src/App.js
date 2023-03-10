import { Route } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home.jsx";
import NavBar from "./views/NavBar/NavbBar.jsx";
import CountryDetail from "./views/Detail/CountryDetail";
import Activity from "./views/Activity/Activity";

function App() {
  return (
    <>
      <Route path="/" exact>
        <Landing />
      </Route>
      <Route path="/home">
        <NavBar />
      </Route>
      <Route path="/home" exact>
        <Home />
      </Route>
      <Route path="/country/:idPais" exact>
        <CountryDetail />
      </Route>
      <Route path="/activity" exact>
        <Activity />
      </Route>
    </>
  );
}

export default App;
