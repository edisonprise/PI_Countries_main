import { BrowserRouter, Route } from "react-router-dom"
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home.jsx"
import AddActivity from "./views/AddActivity/AddActivity";
import Card from "./views/Card/Card";
import NavBar from "./views/NavBar/NavbBar";



function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/countries" component={Home} />
        <Route exact path="/country" component={Card} />
        <Route exact path="/AddActivity" component={AddActivity} />
      </BrowserRouter>
    </>
  );
}

export default App;
