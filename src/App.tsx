import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { Menu } from './components/Menu';
import Cars from './components/Cars';
import { CarsContext } from './context/carsContext';
import axios from 'axios';
import { ICars, IWinners } from './interfaces/getCars';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { MainRouter } from './MainRouter';
import { NavBar } from './components/NavBar';

function App() {
  const [cars, setCars] = React.useState<ICars[]>([]);
  const [winners, setWinners] = React.useState<IWinners[]>([]);
  const [newRequest, setNewRequest] = useState<boolean>(false);
  const [allRace, setAllRace] = useState<boolean>(false);
  const [stopRace, setStopRace] = useState<boolean>(false);
  const [updateCar, setUpdateCar] = useState<ICars>({id: 0, color: '#fff', name: ' '});
  const [page, setPage] = useState(1); 
  const [canWin, setCanWin] = useState<boolean>(true);
  const [winnersPage, setWinnersPage] = useState(1);
  const [sortWinners, setSortWinners] = useState({ sort: 'id', order: 'ASC' }) 

  const getCars = useCallback(async() => {
    const response = await axios.get('http://localhost:3000/garage');
    console.log(response.data);
    setCars(response.data);
  } , [])

  // const getWinners = useCallback(async() => {
  //   const response = await axios.get('http://localhost:3000/winners');
  //   console.log(response.data);
  //   setWinners(response.data);
  // } , [])

  useEffect(() => {
    getCars();
    // getWinners()
    console.log(newRequest);
  }, [newRequest]);

  console.log(winners);
  return (
    <BrowserRouter>
    <CarsContext.Provider value={{cars, setCars, setNewRequest, setPage, page, updateCar, setUpdateCar, setAllRace, allRace, stopRace, setStopRace, winners, setWinners, canWin, setCanWin, winnersPage, setWinnersPage, sortWinners, setSortWinners}}>
        <NavBar />
       <MainRouter />
    </CarsContext.Provider>
  </BrowserRouter>
  )
}
export default App;
