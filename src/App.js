import React, { useState } from "react";
import ReactDOM from "react-dom";
import SearchParams from "./SearchParams";
import { Router, Link } from "@reach/router";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

const App = () => {
  const Theme = useState("black");
  return (
    <ThemeContext.Provider value={Theme}>
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
          <h1> Adopt me!</h1>
        </header>
        <Router>
          <Details path="/details/:id" />
          <SearchParams path="/" />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
