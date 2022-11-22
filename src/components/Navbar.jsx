import React from 'react'
import { NavLink } from 'react-router-dom'

function Nav() {


    return ( <ul className="nav nav-pills navbar-expand navbar-light bg-light">
        <li className="nav-item"><NavLink className={({ isActive }) => "nav-link " + (isActive ? " active" : "")}
            to="/" end>Home</NavLink></li>
        <li className="nav-item"><NavLink className={({ isActive }) => "nav-link " + (isActive ? " active" : "")}
            to="/addImages" end>Add Images</NavLink></li>
        <li className="nav-item"><NavLink className={({ isActive }) => "nav-link " + (isActive ? " active" : "")}
            to="/displayImages" end>Display Images</NavLink></li>
        <li className="nav-item"><NavLink className={({ isActive }) => "nav-link " + (isActive ? " active" : "")}
            to="/displayBuckets" end>Display Buckets</NavLink></li>
    </ul>)
}

export default Nav;