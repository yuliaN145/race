import React, { useRef, useState } from 'react';
import { useCarsContext } from '../context/carsContext';
import { ICars, ICarsProps } from '../interfaces/getCars';
import '../styles/Car.css';
import { useCallback, useEffect } from 'react';
import axios from 'axios';
import { ReactComponent as CarImg } from '../svg/car.svg'
import { ReactComponent as FinishImg } from '../svg/finish.svg'

function CarItem({name, id, color, dispatchWinner, dispatchReset}: ICarsProps) {
    const { setUpdateCar, setNewRequest, allRace, stopRace, setStopRace, canWin, setCanWin } = useCarsContext();
    const startA = useRef<HTMLButtonElement>(null);
    const startB = useRef<HTMLButtonElement>(null);
    const [startDisabled, setStartDisabled] = useState(false)
    const [stopDisabled, setStopDisabled] = useState(true)

    const selectCar = useCallback( () => {
        setUpdateCar({name: name, color: color, id: id});
    }, [])

    const deleteCar = useCallback ( async () => {
        await axios.delete(`http://localhost:3000/garage/${id}`);
        setNewRequest((prev) => !prev);
    }, [])

  
    const startEngine = useCallback(async () => {
        const car = document.getElementById(`${id}`) as HTMLElement
        car.style.animation = ''
        const response = await axios.patch(`http://127.0.0.1:3000/engine?id=${id}&status=started`)
        const secondTime = Math.floor(response.data.distance / response.data.velocity / 10) / 100
        car.style.animation = `move ${secondTime}s linear forwards running`
        setStartDisabled(true)
        setStopDisabled(false)
        await axios
          .patch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`)
          .then(() => {
            if (canWin) {
              dispatchWinner({ id, name, time: secondTime })
              setCanWin(false);
              console.log('hello')
              startB.current?.removeAttribute("disabled")
            }
          })
          .catch((err) => {
            console.log(err)
            car.style.animationPlayState = 'paused'
          })
          .finally(() => {
            setStopDisabled(false)
            if (canWin) {
              dispatchReset(1)
            }
          })
      }, [canWin])

      useEffect(() => {
        if (allRace) {
          startEngine()
        }
      }, [allRace])

      useEffect(() => {
        if (stopRace) {
            stopEngine()
        }
      }, [stopRace])

      const stopEngine = useCallback(async () => {
        const car = document.getElementById(`${id}`) as HTMLElement
        await axios.patch(`http://127.0.0.1:3000/engine?id=${id}&status=stopped`).then(() => {
          car.style.animation = '';
          setStartDisabled(false)
          setStopDisabled(true)
        })
      }, [])

    return (
        <div className='car_item'>
            <div className="item_top">
                <div className={`select-item ${id}`} onClick={() => selectCar()}>SELECT</div>
                <div className={`remove-item ${id}`} onClick={() => deleteCar()} >REMOVE</div>
                <div className="name-item">{name}</div>
            </div>
            <div>Example</div>
            <div className="item_bottom">
                <button disabled={startDisabled} className='a' ref={startA} onClick={() => startEngine()}>A</button>
                <button disabled={stopDisabled} className='b' ref={startB} onClick={() => stopEngine()} >B</button>
                <CarImg className='item__car' id={`${id}`} fill={color} width='100px' height='50px' />
                <div className='end-line'>
                    <FinishImg className='item__finish' fill='red' width='40px' height='40px' />
                </div>
            </div>
        </div>
    )
}
export default CarItem;