// import { useState } from 'react';

// const useForm = (callback) => {

//   const [values, setValues] = useState({});

//   const handleSubmit = (event) => {
//     if (event) event.preventDefault();
//     callback(values);
//   };

//   const handleChange = (event) => {
//     event.persist();
//     setValues(values => ({ ...values, [event.target.name]: event.target.value }));
//   };

//   return {
//     handleChange,
//     handleSubmit,
//     values,
//   };
// };

// export default useForm;


import { useState } from "react";
import superagent from "superagent";
import cookie from "react-cookies";
const useForm = (callback) => {
  const [values, setValues] = useState({});

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    
    const token = cookie.load("token");
    let response = await superagent.post(
      "https://ibrahem-todo-server.herokuapp.com/todo"
    ).set('authorization', `Bearer ${token}`).send(values);
    callback(values);
  };

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
