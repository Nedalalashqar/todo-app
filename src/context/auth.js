





import React, { useState, useEffect } from "react";
import axios from "axios";
import superagent from "superagent";
import base64 from "base-64";
import cookie from "react-cookies";
import jwt from "jsonwebtoken";
const API = "https://ibrahem-todo-server.herokuapp.com";
export const AuthContext = React.createContext();
export default function Auth(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    const token = cookie.load("token");
    validateToken(token);
    console.log("ueseeeeee",user);
  }, []);




  const validateToken = (token) => {
    if (token !== undefined && token !== "null" && token !== "") {
      const user = jwt.decode(token);
      setLoginState(true, token, user);
    } else {
      setLoginState(false, null, {});
    }
  };




  const setLoginState = async (isLogged, token, user) => {
    try {
      cookie.save("token", token);
      setUser(user);
      setLoggedIn(isLogged);
    } catch (error) {
      console.log(error.message);
    }
  };
  const login = async (username, password) => {
    try {
      const response = await superagent
        .post(`${API}/signin`)
        .set(
          "authorization",
          `Basic ${base64.encode(`${username}:${password}`)}`
        );
      console.log("context signin:", response);
      validateToken(response.body.token);
    } catch (error) {
      console.log(error);
    }
  };



  const logout = () => {
    cookie.remove('token');
    localStorage.clear();
    setLoginState(false, "", {});
  };
  const signup = async (username, password, role) => {
    try {
      let body = {
        username: username,
        password: password,
        role: role,
      };
      const response = await axios.post(`${API}/signup`, body);
      console.log("context signUp:", response);
      validateToken(response.data.token);
    } catch (error) {
      console.log("from signup", error.message);
    }
  };


  
  const state = {
    validateToken,
    setLoginState,
    logout,
    login,
    signup,
    loggedIn,
    setLoggedIn,
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
}
