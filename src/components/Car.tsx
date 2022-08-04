import * as React from 'react';
import { ICars } from '../interfaces/getCars';
import '../styles/Car.css';

function CarItem({name, id, color}: ICars) {
    return (
        <div className='car_item'>
            <div className="item_top">
                <div className={`select-item ${id}`}>SELECT</div>
                <div className={`remove-item ${id}`}>REMOVE</div>
                <div className="name-item">{name}</div>
            </div>
            <div className="item_bottom">
                <div className='a'>A</div>
                <div className='b'>B</div>
                <img className='car' color={color} src="car.svg" alt="some"/>
                <img className='end-line' src="" alt="flag" />
            </div>
        </div>
    )
}
export default CarItem;