import React from "react";
import {Navbar, Nav } from 'react-bootstrap';
function Header(props) {
    return (<>
        <Navbar bg="secondary" variant="light" sticky="top" style={{height:'100px'}}>
            <Nav className="align-items-center" style={{marginLeft:'30%'}}>
                <h1>To Do List</h1>
            </Nav>
        </Navbar>
    </>)
}

export default Header;