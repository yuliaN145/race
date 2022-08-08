import * as React from 'react';
import { Link } from 'react-router-dom';
import '../styles/menu.css';
import { Button } from './Button';
import GenerateCars from './GenerateCars';
import { Race } from './Race';
import { UpdateCar } from './UpdateCar';

export function Menu() {
    return (
        <div className='menu'>
            <Button />
            <UpdateCar />
            <div className='menu_bottom'>
                <Race />
                <GenerateCars />
            </div>
        </div>
    )
}