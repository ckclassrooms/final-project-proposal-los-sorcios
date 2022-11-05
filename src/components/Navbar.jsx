import React from 'react'
import { NavLink } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function Nav({session, setSession}) {

    async function signInWithGitHub() {
        const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        })
    }

    async function signout() {
        const { error } = await supabase.auth.signOut()
    }

    const loginSubmit = async ()=>{
        // Todo - Add logic to login via Github Oauth
        setSession(signInWithGitHub());
    }

    const logoutSubmit = async ()=>{
        // Todo - Add logic to logout
        signout();
        setSession(null);
    }

    if (session != null){
        return ( <ul className="nav nav-pills navbar-expand navbar-light bg-light">
        <li className="nav-item"><NavLink className={({ isActive }) => "nav-link " + (isActive ? " active" : "")}
            to="/" end>Home</NavLink></li>
        <li className="nav-item ms-auto"><button className="btn btn-primary m-1" id='logoutSubmit' onClick={()=>logoutSubmit()}>Logout</button></li>       
    </ul>)
    }
    else {
    return ( 
    <ul className="nav nav-pills navbar-expand navbar-light bg-light">
        <li className="nav-item "><NavLink className={({ isActive }) => "nav-link " + (isActive ? " active" : "")}
            to="/" end>Home</NavLink></li> 
            <div className="ms-auto" style={{display:"flex"}}>
               <li className="nav-item ms-auto"><button className="btn btn-primary m-1" id='loginSubmit' onClick={()=>loginSubmit()}>Login</button></li>
            </div>              
    </ul>)
    }
}

export default Nav;