import "milligram/dist/milligram.min.css";
import Router from "preact-router";
import Home from "./pages/home";
import SearchCountry from "./pages/searchcountry";

export default () => (
  <div id="app">
    <Router>
      <Home path="/" />
      <SearchCountry path="/s/:countryId" />
    </Router>
  </div>
);
