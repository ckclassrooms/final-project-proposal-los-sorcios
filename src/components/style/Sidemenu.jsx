import React from "react";
import { NavLink } from "react-router-dom";

export default ({ toggleMenu }) => (
    
  <div className="sidemenu">
    <NavLink className="link" to="/" onClick={toggleMenu} end>
        Home
    </NavLink>
    <NavLink className="link" to="/addImages" onClick={toggleMenu} end>
        Add Images
    </NavLink>
    <NavLink className="link" to="/displayImages" onClick={toggleMenu} end>
        Display Images
    </NavLink>
    <NavLink className="link" to="/displayBuckets" onClick={toggleMenu} end>
        Display Buckets
    </NavLink>
  </div>
);
