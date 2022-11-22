import React from "react";
import "./App.css";
import Nav from './components/Navbar'
import Landing from './components/Landing'
import AddImages from "./components/AddImages";
import DisplayImages from "./components/DisplayImages";
import DisplayBuckets from "./components/DisplayBuckets";
import {
  Routes,
  Route
} from "react-router-dom";
import { useState, useEffect } from "react";

function App() {

  const [file, setFile] = useState(null);

  return (
    <>
    <div>
        <Nav/>
        <Routes>
          <Route path="/" element={<Landing file={file} setFile={setFile}/>} />
          <Route path="/addImages" element={<AddImages file={file} setFile={setFile}/>} />
          <Route path="/displayImages" element={<DisplayImages file={file} setFile={setFile}/>} />
          <Route path="/displayBuckets" element={<DisplayBuckets/>}/>
        </Routes>
    </div>
    </>
  );
}

export default App;