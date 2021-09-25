
//


import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import { Form, Button } from 'react-bootstrap'
import './sign.css';

function Sign(params) {
  const [values, setValues] = useState({});
  const [flip, setFlip] = useState(false);
  const { login, signup, loggedIn } = useContext(AuthContext);
  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
    console.log("from sign comp:", values);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!values.role) {
      login(values.username, values.password);
    } else {
      signup(values.username, values.password, values.role);
      setValues((values) => ({ ...values, [e.target.name]: "" }));
    }
  }
  function flipFunction(params) {
    setValues({});
    setFlip(true);
  }
  function restflipFunction(params) {
    setValues({});
    setFlip(false);
  }
  return (
    <div>
      {flip === false ? (

        <Form className="signForm" onSubmit={handleSubmit}>
          <div className="signUp">
            <h1 style={{paddingTop:"17px"}}>SignUp Form</h1>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              name="username"
              placeholder="username"
            />
            <br />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={handleChange}
              name="password"
              placeholder="password"
            />
            <br />
            <Form.Label for="role">Role:</Form.Label>
            <Form.Select onClick={handleChange} name="role" id="role">
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
            <br />
            <Button type="submit">Create user</Button>

            {loggedIn && <a style={{ color: "black", marginLeft: "15px" }} href="/">Home</a>
            }
            <br />
            <p>
              Already registered?{" "}
              <a style={{ color: "black" }} onClick={() => flipFunction(false)} href="/#">
                Sign In
              </a>
            </p>
          </div>
        </Form>
      ) : (
        <Form  className="signForm" onSubmit={handleSubmit}>
          <div className="signIn">
            <h1 style={{paddingTop:"35px"}}>Signin</h1>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              name="username"
              placeholder="username"
            />
            <br />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={handleChange}
              name="password"
              placeholder="password"
            />
            <br />
            <br />
            <Button> Sign In</Button>

            {loggedIn && <a href="/">Home</a>
            }
            <br />
            <p className="message">
              Don't have an account ?{" "}
              <a style={{ color: "black" }} onClick={() => restflipFunction(true)} href="#">
                Sign up
              </a>
            </p>
          </div>
        </Form>
      )}
    </div>
  );
}

export default Sign;
