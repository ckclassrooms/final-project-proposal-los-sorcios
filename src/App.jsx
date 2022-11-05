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
    <div>
      {!session ? (
        <>
        <Nav/>
        </>
        ) : (
        <>
        <Nav session={session} setSession={setSession} key={session.user.id}/>
        <Routes>
          <Route path="/" element={<Landing session={session} setSession={setSession}/>} />
        </Routes>
        </>
      )}
    </div>
  );
}

export default App;