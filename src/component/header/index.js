import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import './Navbar.css';
import { deleteCookie } from '../../utils/cookie';

const Header = () => {
    const logout = () => {
        deleteCookie('token');
        window.location.replace('/login');
    };
    return (
        <Navbar className="navbar navbar-expand-lg navbar-dark shadow-5-strong" fixed="top">
            <div className="container">
                <Navbar.Brand href="/"><img src="img/logo_center.png" alt="" title="" width="60px"></img></Navbar.Brand>
                <Nav className="ml-auto">
                    <Link to="/" style={{textDecoration:'none'}}><p>HOME</p></Link>
                    <Link to="/final_project" style={{textDecoration:'none'}}><p>FINAL PROJECT</p></Link>
                    <Link onClick={() => {
                        logout();
                    }} style={{textDecoration:'none'}}><p>LOGOUT</p></Link>
                </Nav>
            </div>
        </Navbar>
    )
}

export default Header;
