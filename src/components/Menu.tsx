import * as React from 'react';
import { Link } from 'react-router-dom';
import '../styles/menu.css';

export function Menu() {
    return (
        <div className='menu'>
            <div className='menu_top'>
                <Link to='/'><div className='menu_btn'>TO GARAGE</div></Link>
                <Link to='/winners'><div className='menu_btn'>TO WINNERS</div></Link>
            </div>
            <div className='menu_create'>
                <input type="text" />
                <div className='set_color'></div>
                <div className='menu_btn'>CREATE</div>
            </div>
            <div className='menu_update'>
                <input type="text" />
                <div className='set_color'></div>
                <div className='menu_btn'>UPDATE</div>
            </div>
            <div className='menu_bottom'>
                <div className='menu_btn'>RACE</div>
                <div className='menu_btn'>RESET</div>
                <div className='menu_btn_long'>GENERATE CARS</div>
            </div>
        </div>
    )
}