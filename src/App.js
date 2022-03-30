import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./routes/search";
import Result1 from "./routes/result-1";
import Result2 from "./routes/result-2";
import Result3 from "./routes/result-3";
import Result4 from "./routes/result-4";
import Result5 from "./routes/result-5";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/result1" element={<Result1 />} />
          <Route path="/result2" element={<Result2 />} />
          <Route path="/result3" element={<Result3 />} />
          <Route path="/result4" element={<Result4 />} />
          <Route path="/result5" element={<Result5 />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
