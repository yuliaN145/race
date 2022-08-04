import * as React from 'react';
import { ICars } from '../interfaces/getCars';
import Car from './Car';
import { useCarsContext } from '../context/carsContext';
import '../styles/Cars.css';

interface IcarsProps {
    cars: ICars[];
}

function Cars() {
    const { cars } = useCarsContext();
    return (
        <div className='garage'>
            <h1 className=''>Garage({cars.length})</h1>
            <h2>Page #{Math.ceil(cars.length / 7)}</h2>
            {cars.map((car: ICars) => (
                <Car key={car.name} name={car.name} id={car.id} color={car.color} />
            ))}
        </div>
    )
}

export default Cars;