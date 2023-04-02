import React from "react";
import { images } from "../../assets";
import "./Navbar.css";

function Navbar({ ToCreate, ToView }) {
    return (
        <nav className="app__navbar">
            <div className="app__navbar-logo">
                <img src={images.logo} alt="logo" />
            </div>
            <ul className="app__navbar-links">
                <li>
                    <button onClick={() => ToCreate()}>Book Room</button>
                </li>
                <li>
                    <button onClick={() => ToView()}>View Bookings</button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
