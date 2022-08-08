import React, { useState } from "react";
import { useCarsContext } from '../context/carsContext';

export function Race() {
    const { setAllRace, allRace, stopRace, setStopRace, setCanWin } = useCarsContext();
    const [isReset, setIsReset] = useState(true)
    const [isRace, setIsRace] = useState(false)

    return (
        <div>
            <button className='menu_btn' onClick={() => {setAllRace((prev) => !prev); setCanWin(true); setIsRace(true); setIsReset(false)}} disabled={isRace}>Race</button>
            <button className='menu_btn' onClick={() => {setStopRace((prev) => !prev); setIsReset(true); setIsRace(false)}} disabled={isReset}>Reset</button>
        </div>
    )
}