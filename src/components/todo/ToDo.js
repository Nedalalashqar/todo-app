// import React, { useEffect, useState } from 'react';
// import useForm from '../../hooks/form.js';
// import Pagination from '../pagination/pagination';
// import { Card, Form, Button } from 'react-bootstrap';
// import { FormGroup, InputGroup } from '@blueprintjs/core';
// import { v4 as uuid } from 'uuid';
// import '../../app.css';


// const ToDo = () => {
//   const [list, setList] = useState([]);
//   const [incomplete, setIncomplete] = useState([]);
//   const { handleChange, handleSubmit } = useForm(addItem);

//   function addItem(item) {
//     console.log(item);
//     item._id = uuid();
//     item.complete = false;
//     setList([...list, item]);
//   }

//   function deleteItem(id) {
//     const items = list.filter((item) => item.id !== id);
//     setList(items);
//   }
//   const toggleComplete = (id) => {
//     let item = list.filter((i) => i._id === id)[0] || {};

//     if (item._id) {
//       item.complete = !item.complete;
//       let list2 = list.map((listItem) =>
//         listItem._id === item._id ? item : listItem
//       );
//       console.log('lisssst===>', list2);
//       setList(list2);
//     }
//   };

//   useEffect(() => {
//     let incompleteCount = list.filter((item) => !item.complete);
//     setIncomplete(incompleteCount);
//     document.title = `To Do List: ${incomplete.length}`;
//   }, [list]);

//   return (
//     <>


//       <div className='form-container'>
//         <Card style={{ width: '50rem' }}>
//           <Card.Body>
//             <Card.Title>Add Item</Card.Title>
//             <Form onSubmit={handleSubmit}>
//               <Form.Group controlId="exampleForm.ControlInput1">
//                 <Form.Label>To Do List Manager <h3 style={{color:'red'}}>{incomplete.length}</h3></Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="text"
//                   placeholder="Add To Do List Item"
//                   onChange={handleChange} 
//                   required
//                 />
//               </Form.Group>
//               <Form.Group controlId="exampleForm.ControlInput1">
//                 <Form.Label>Assigned To</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="assignee"
//                   placeholder="Assigned To"
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>
//               <FormGroup helperText='' label='Difficulty' labelFor='text-input' labelInfo='' >
//                 <input onChange={handleChange} defaultValue={3} type='range' min={1} max={5} name='difficulty' required />
//               </FormGroup>
//               <Button type="submit">Add Item</Button>
//             </Form>
//           </Card.Body>
//         </Card>
//       </div >



//       <Pagination className='pagList-container' list={list} incomplete={incomplete} toggleComplete={toggleComplete}></Pagination>
//     </>
//   );
// };

// export default ToDo;



import React, { useEffect, useState, useContext } from "react";
import { settingContext } from "../../context/settings";
import { v4 as uuid } from "uuid";
import Header from "../header/Header";

import Form from "../form/Form";
import List from "../list/List";
import Pagination from "../pagination/pagination";
import Settings from "../settings/settings";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const ToDo = () => {
  const context = useContext(settingContext);

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(4);
  const [filteredList, setFilteredList] = useState([]);

  function addItem(item) {
    console.log("items:", item);
    let details = {
      id: uuid(),
      complete: false,
      difficulty: item.difficulty,
      assignee: item.assign,
      text: item.item,
    };
    setList([...list, details]);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  useEffect(() => {
    setTodosPerPage(context.elementsPerPage);
  });

  useEffect(() => {
    if (context.showCompleted === true) {
      let InCompletedTasks = list.filter((item) =>
        item.complete === false ? item : null
      );
      console.log(InCompletedTasks);
      setFilteredList(InCompletedTasks);
    }
  }, [context.detectStorage]);

  let indexOfLastTodo = parseInt(currentPage) * parseInt(todosPerPage);

  let indexOfFirstTodo = indexOfLastTodo - parseInt(todosPerPage);

  let currentTodos = list.slice(indexOfFirstTodo, indexOfLastTodo);

  let paginate = (pageNum) => setCurrentPage(pageNum);

  return (
    <>
      <Header />

      <Router>
        <Switch>
          <Route exact path="/">
            <Container>
             
              <Row>
                <Col xs={3}>
                  <Form incomplete={incomplete} list={list} addItem={addItem} />
                </Col>
                <Col xs={9}>
                  {context.showCompleted === false ? (
                    <List
                      list={currentTodos ? currentTodos : list}
                      toggleComplete={toggleComplete}
                      deleteItem={deleteItem}
                    />
                  ) : (
                    <List
                      list={filteredList}
                      toggleComplete={toggleComplete}
                      deleteItem={deleteItem}
                    />
                  )}
                </Col>
              </Row>
              <Row>
                <Col xs={3}></Col>
                <Col xs={9}>
                  <Pagination
                    todosPerPage={todosPerPage}
                    totalTodos={list.length}
                    paginate={paginate}
                  />
                </Col>
              </Row>
            </Container>
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Switch>
      </Router>
     
    </>
  );
};

export default ToDo;
