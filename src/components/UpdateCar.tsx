import React, { useCallback } from "react";
import { useCarsContext } from "../context/carsContext";
import axios from 'axios';

export function UpdateCar() {
    const {updateCar, setUpdateCar, setNewRequest} = useCarsContext();
    const { name, color, id } = updateCar;
    
    const updatedCar = useCallback(async () => {
        await axios.put(`http://localhost:3000/garage/${id}`, {
            name,
            color
        });
        setNewRequest((prev) => !prev);
        setUpdateCar({id: 0, color: '', name: ''});
    }, [updateCar])


    return (
        <div className='menu_update'>
            <input type="text" value={name} onChange={(event) => {setUpdateCar({color, name: event.target.value, id})}} disabled={id === 0} />
            <input className='set_color' type="color" value={color} onChange={(event) => {setUpdateCar({color: event.target.value, name, id})}} disabled={id === 0} ></input>
            <button className='menu_btn' disabled={id === 0} onClick={() => updatedCar()}>UPDATE</button>
        </div>
    )
}