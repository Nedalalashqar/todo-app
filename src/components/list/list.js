import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import '../../app.css';
import { Button } from "react-bootstrap"
export default function Settings(props) {
    const setVariation = (complete) => {
        return complete ? 'success' : 'danger';
    };
    return (
        <>
            {props.activeList.map((item) => (
                <div className='cardsContainer'>
                    <Card interactive={true} elevation={Elevation.TWO} key={item.id} className='card' style={{ width: '80rem', height: '240px' }}  >
                        <small> {item.assignee}</small>
                        <p>
                            <hr />
                            <p>{item.text}</p>
                        </p>
                        <p>
                            <small>Difficulty: {item.difficulty}</small>
                        </p>
                        <Button variant={setVariation(item.complete)} type='submit' onClick={() => props.toggleComplete(item._id)}> {item.complete? 'completed' : 'pending'} </Button>
                    </Card>
                    <br />
                </div>
            ))}
        </>
    )
}