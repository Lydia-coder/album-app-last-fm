import React from "react";
import Home from "./components/Home";
import Albums from "./components/Albums/Albums";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/albums" component={Albums} />
      </div>
    </Router>
  );
}

export default App;
