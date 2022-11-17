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
import { supabase } from './supabaseClient';

function App() {

  const [session, setSession] = useState(null);
  const [file, setFile] = useState(null);

  // Manage session with Github 
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

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