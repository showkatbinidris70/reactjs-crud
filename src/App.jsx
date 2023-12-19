import React, { useState } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Create from "./components/Create";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Read from "./components/Read";
import Update from "./components/Update";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <div className="main">
          <Routes>
            <Route path="/" element={<Create />}></Route>
            <Route path="/read" element={<Read />}></Route>
            <Route path="/update/:id" element={<Update />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
