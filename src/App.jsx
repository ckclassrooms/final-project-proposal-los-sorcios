import React from "react";
import "./App.css";
import Nav from './components/Navbar'
import Landing from './components/Landing'
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

  const callLambda = async() =>{
    const { data, error } = await supabase.functions.invoke('prova', {
      body: { name: file.name, size: file.size, type: file.type, base64: file.base64},
    })
    console.log(data)
  }

  const uploadImage = async() =>{
    //get base 64 of image
    let base64;
    // Make new FileReader
    let reader = new FileReader();
    // Convert the file to base64 text
    reader.readAsDataURL(file);
    reader.onload = () => {
      // from jpg image to base64
      base64 = reader.result.split(',')[1];
      let updatedFile = file;
      updatedFile.base64 = base64;
      // modify the file
      setFile(updatedFile);
      //call lambda with updated file
      callLambda();
    };
  }

  const setLocalFile = event => {
    setFile(event.target.files[0]);
  };

  return (
    <>
    <div>
        <Nav/>
        <Routes>
          <Route path="/" element={<Landing session={session} setSession={setSession}/>} />
        </Routes>
    </div>
    <div>
      <input type="file" onChange={setLocalFile} />
      <button onClick={uploadImage}>Upload image</button>
    </div>
    </>
  );
}

export default App;