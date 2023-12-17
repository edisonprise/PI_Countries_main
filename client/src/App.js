import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import LandingPage from "./Views/LandingPage/LandingPage";
//import Home from './Views/Home/Home';
import Home from "./Views/HomeView/HomeView";
import AddActivity2 from "./Views/AddActivity/AddActivity2";
import CountryDetailView from "./Views/CountryDetailView/CountryDetailView";
import AllActivities from "./Views/AllActivities/AllActivities";

//import AddNewActivity  from './components/SmartComponents/Form/AddNewActivity';

function App() {
  return (
    <div className="App">
        <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/detail/:id" element={<CountryDetailView />}></Route>
        <Route path="/createActivity" element={<AddActivity2 />}></Route>
        <Route path="/viewActivity" element={<AllActivities />}></Route>
        </Routes>
    </div>
  );
}

export default App;
