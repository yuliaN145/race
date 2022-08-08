import React, { useCallback } from "react";
import { useCarsContext } from "../context/carsContext";
import { useState } from "react";
import axios from 'axios';

export const Button = () => {
    const {setNewRequest, setCars} = useCarsContext();
    const [newCar, setNewCar] = useState({color: '', name: ''});
    const {name, color} = newCar;

    const createCar = useCallback(async () => {
        await axios.post('http://localhost:3000/garage', {
            name: newCar.name,
            color: newCar.color
        });
        // console.log(newRequest);
        setNewCar({color: '#fff', name: ' '})
        setNewRequest(true);
        console.log(newCar); 
        // const response = await axios.get('http://localhost:3000/garage');
        // console.log(response.data);
        // setCars(response.data);
    }, [newCar, setNewRequest])
    return (
        <div className="menu_create">
            <input type="text" value={name} onChange={(event) => {setNewCar({color, name: event.target.value})}} />
            <input className='set_color' type="color" value={color} onChange={(event) => {setNewCar({color: event.target.value ,name})}}></input>
            <button className='menu_btn' onClick={createCar} >Create</button>
        </div>
    )
}