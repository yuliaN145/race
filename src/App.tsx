import React, { useEffect } from 'react';
import { useCallback } from 'react';
import { Menu } from './components/Menu';
import Cars from './components/Cars';
import { CarsContext } from './context/carsContext';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import axios from 'axios';
import { ICars } from './interfaces/getCars';

function App() {
  const [cars, setCars] = React.useState<ICars[]>([
    {name: 'Car 1', id: 1, color: 'red'},
    {name: 'Car 2', id: 2, color: 'blue'},
    {name: 'Car 3', id: 3, color: 'green'},
  ]);

  const getCars = useCallback(async() => {
    const response = await axios.get('http://127.0.0.1:3000/garage');
    console.log(response.data);
    setCars(response.data);
  } , [])

  useEffect(() => {
    getCars()
  }, [getCars])

  return (
    <BrowserRouter>
    <Menu />
    <CarsContext.Provider value={{cars}}>
    <div className="App">
      <Cars />
    </div>
    </CarsContext.Provider>
  </BrowserRouter>
  )
}
export default App;
