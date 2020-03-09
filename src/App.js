import React, { useState } from "react";
import { Router } from "@reach/router";

import Details from "./Details";
import SearchParams from "./SearchParams";
import ThemeContext from "./ThemeContext";
import NavBar from "./NavBar";

const App = () => {
  const Theme = useState("black");
  return (
    <ThemeContext.Provider value={Theme}>
      <div>
        <NavBar />
        {/* <Suspense fallback={<h1>routes is loading ...</h1>}> */}
        <Router>
          <Details path="/details/:id" />
          <SearchParams path="/" />
        </Router>
        {/* </Suspense> */}
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
