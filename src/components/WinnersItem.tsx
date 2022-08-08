import * as React from 'react';
import { useCarsContext } from '../context/carsContext';
import { ReactComponent as CarImg } from '../svg/car.svg'

interface IwinnersItemProps {
    id: number;
    wins: number;
    time: number;
}

function WinnersItem({wins, time, id}: IwinnersItemProps) {
    const { cars } = useCarsContext()

    const currentCar = cars.find((car) => car.id === id)
    return (
        <div className="winners-item">
            <div className="winners-item__number">{id}</div>
            <CarImg fill={currentCar?.color} width={50} height={40} />
            <div className="winners-item__name">{currentCar?.name}</div>
            <div className="winners-item__wins">{wins}</div>
            <div className="winners-item__time">{time}</div>
        </div>
    )
}

export default WinnersItem;