import React from "react";
import {NavLink} from 'react-router-dom';


const Nav = () => {
    return (
        <nav className="navigation">
            <div className="logoNavBar">
                <NavLink to="/">
                    <img className='logo-image' src='/logo.png' alt='logo'></img>
                </NavLink>
            </div>
            <div className="navbar">
                <NavLink className="navbarMenu" to='/about'>About</NavLink>
                <NavLink className="navbarMenu" to='/dashboard'>Dashboard</NavLink>
                <NavLink className="navbarMenu" to='/plan'>Subscription</NavLink>
            </div>
        </nav>
        );
}
export default Nav;