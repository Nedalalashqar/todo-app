// import React from "react";
// import {Navbar, Nav } from 'react-bootstrap';
// function Header(props) {
//     return (<>
//         <Navbar bg="secondary" variant="light" sticky="top" style={{height:'100px'}}>
//             <Nav className="align-items-center" style={{marginLeft:'30%'}}>
//                 <h1>To Do List</h1>
//             </Nav>
//         </Navbar>
//     </>)
// }

// export default Header;

import React,{useContext} from "react";
import { Navbar, Button, Alignment } from "@blueprintjs/core";
import { AuthContext } from "../../context/auth";

function Header(props) {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <Navbar style={{backgroundColor:"pink"}}>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>To-Do</Navbar.Heading>
          <Navbar.Divider />
          <a href="/">
            <Button icon="home" text="Home"></Button>
          </a>
          <Navbar.Divider />
          <a href="/settings">
            <Button icon="settings" text="Settings"></Button>
          </a>
          <a href="/">
          
          <Button icon="log-out" style={{position:"absolute",right:"25px" , top:"12px" , backgroundColor:"dark"}}  onClick={logout}>Logout</Button>
          </a>
        </Navbar.Group>
      </Navbar>
    </div>
  );
}

export default Header;