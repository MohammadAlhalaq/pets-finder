import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import SearchParams from "./SearchParams";
import { Router, Link } from "@reach/router";
import Details from "./Details";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
