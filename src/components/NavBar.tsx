import * as React from 'react';
import { Link } from 'react-router-dom';

export function NavBar() {
    return (
        <div className='menu_top'>
            <Link to='/'><div className='menu_btn'>TO GARAGE</div></Link>
            <Link to='/winners'><div className='menu_btn'>TO WINNERS</div></Link>
        </div>
    )
}