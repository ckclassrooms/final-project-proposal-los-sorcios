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
import { decode } from 'base64-arraybuffer';



function App() {

  const [session, setSession] = useState(null);
  const [file, setFile] = useState(null);
  const [immagine, setImmagine] = useState(null);

  // Manage session with Github 
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const getImg = async() =>{
    const { data, error } = await supabase
    .storage
    .from('images')
    .download(file.name)
    console.log(data)
  }

  const callLambda = async() =>{
    /*
    const { data, error } = await supabase.functions.invoke('prova', {
      body: { filename: file.name, filesize: file.size, filetype: file.type, base64: file.base64},
    })
    console.log(data)
    */
   //console.log(decode(file.base64))

    const googleVisionApiUrl = "https://vision.googleapis.com/v1/images:annotate?key=" // here api key should be added

    const request = {
      "requests":[
        {
          "image":{
            "content": file.base64
          },
          "features":[
            {
              "type":"LABEL_DETECTION",
              "maxResults":1
            }
          ]
        }
      ]
    }

    const response = await fetch(googleVisionApiUrl, {
      method : 'POST',
      mode : 'cors',
      body : JSON.stringify(request)
    })

    console.log(response.text)


    const { data, error } = await supabase
    .storage
    .from('images')
    .upload(file.name, file)
    console.log(file)
    /*
    .upload(file.name, decode(file.base64), {
      contentType: 'image/png'
    })
    */
  }

  const invokeFunction = async() =>{

    //get base 64 of image
    let base64;
    // Make new FileReader
    let reader = new FileReader();
  
    // Convert the file to base64 text
    reader.readAsDataURL(file);
    reader.onload = () => {
      // from jpg image to base64
      console.log("Called", reader);
      base64 = reader.result;
      let updatedFile = file;
      updatedFile.base64 = base64;
      //console.log(base64);
    
      // modify the file
      setFile(updatedFile);

      //call lambda with updated file
      callLambda();
    };
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
      <button onClick={invokeFunction}>Upload!</button>
    </div>
    <div>
    <button onClick={invokeFunction}>GetImg!</button>
    </div>
    </>
  );
}

export default App;