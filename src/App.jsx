import React from "react";
import "./App.css";
import Nav from './components/Navbar'
import Landing from './components/Landing'
import {
  Routes,
  Route
} from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from './supabaseClient'



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

  const invokeFunction = async() =>{
    const { data, error } = await supabase.functions.invoke('prova', {
      body: { filename: file.name },
    })
    console.log(data)

  }

  const onFileChange = event => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    invokeFunction();
  }

  return (
    <>
    <div>
        <Nav/>
        <Routes>
          <Route path="/" element={<Landing session={session} setSession={setSession}/>} />
        </Routes>
    </div>
    <div>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload!</button>
    </div>
    </>
  );
}

export default App;