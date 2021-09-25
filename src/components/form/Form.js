

import React from "react";
import useForm from "../../hooks/form";
import { FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import { Button } from "react-bootstrap";
import "./form.css";
function Form(props) {
  const { handleSubmit, handleChange } = useForm(props.addItem);
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        
        <h1 style={{fontFamily:"monospace" , marginLeft:"2rem"}}>Add Task </h1>
        <h6> To Do Num : {props.list.length >0 && (<span>{props.incomplete}</span>)}</h6>
        <FormGroup label={"Todo Item"} labelFor="text-input">
          <InputGroup
            id="text-input"
            placeholder="Item Details"
            onChange={handleChange}
            name="item"
            type="text"
            intent={Intent.PRIMARY}
            required
          />
        </FormGroup>
        <FormGroup label={"Assigned To"} labelFor="assign-input">
          <InputGroup
            id="assign-input"
            placeholder="Assignee Name"
            onChange={handleChange}
            name="assign"
            type="text"
            intent={Intent.PRIMARY}
            required
          />
        </FormGroup>
        <FormGroup label={"Difficulty"} labelFor="difficulty-input">
          <input 
            id="difficulty-input"
            onChange={handleChange}
            defaultValue={3}
            type="range"
            min={1}
            max={5}
            name="difficulty"
          />
        </FormGroup>
        <br />
        <Button variant="dark" style={{marginLeft:"4rem"}} type="submit">Add Item</Button>
      </form>
    </div>
  );
}

export default Form;
