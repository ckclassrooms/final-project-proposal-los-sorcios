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


    return ( <ul className="nav nav-pills navbar-expand navbar-light bg-light">
        <li className="nav-item"><NavLink className={({ isActive }) => "nav-link " + (isActive ? " active" : "")}
            to="/" end>Home</NavLink></li>
        <li className="nav-item"><NavLink className={({ isActive }) => "nav-link " + (isActive ? " active" : "")}
            to="/addImages" end>Add Images</NavLink></li>
        <li className="nav-item"><NavLink className={({ isActive }) => "nav-link " + (isActive ? " active" : "")}
            to="/displayImages" end>Display Images</NavLink></li>
    </ul>)
}

export default Nav;