import React, { useState, useReducer, useEffect } from 'react';
import { Menu } from '../components/Menu';
import Cars from '../components/Cars';
import { useCarsContext } from '../context/carsContext';
import axios from 'axios';
import { IWinner } from '../interfaces/getCars'
import usePagination from '../hooks/usePagination';
import '../styles/modal.css';


  const initialWinner = { id: 0, name: '', time: 0 }

const reduserWinner = (state: IWinner, action: IWinner) => {
  if (state.id === 0 && action.id !== 0) {
    const { id, time } = action
    axios
      .get(`http://127.0.0.1:3000/winners/${id}`)
      .then(({ data }) =>
        axios.put(`http://127.0.0.1:3000/winners/${id}`, {
          wins: data.wins + 1,
          time: data.time > time ? time : data.time,
        }),
      )
      .catch(({ response }) => {
        if (response.status === 404) axios.post('http://127.0.0.1:3000/winners', { id, time, wins: 1 })
      })
    return { ...action }
  }
  if (action.id === 0) return initWinner(action)
  return state
}

const initWinner = (state: IWinner) => {
  return { ...state }
}

const initialReset = 0

const initReset = (state: number) => state

function Garage() {
  const { cars } = useCarsContext()

  const [allRace, setAllRace] = useState(false)

  const [isReset, setIsReset] = useState(false)

  const [closeModal, setCloseModal] = useState(false)

  const { firstContentIndex, lastContentIndex, nextPage, prevPage, page, setPage, totalPages } = usePagination({
    contentPerPage: 7,
    count: cars.length,
  })

  const reduserReset = (state: number, action: number) => {
    if (action === 1) {
      if (state + 1 === cars.slice(firstContentIndex, lastContentIndex).length) {
        setAllRace(false)
      }
      return state + 1
    }
    if (action === 0) return initReset(0)
    return state
  }

  const [winner, dispatchWinner] = useReducer(reduserWinner, initialWinner, initWinner)
  const [reset, dispatchReset] = useReducer(reduserReset, initialReset, initReset)

  useEffect(() => {
    setAllRace(false)
    dispatchReset(initialReset)
    dispatchWinner(initialWinner)
    setCloseModal(false)
  }, [page])
  

  return (
    
    <div className="App">
      <Menu />
      <Cars dispatchWinner={dispatchWinner} dispatchReset={dispatchReset}/>
      {winner.id !== 0 ? (
          <h3 className={`modal ${closeModal ? 'modal__close' : ''}`} onClick={() => setCloseModal(true)}>
            Wins car {winner.name} time {winner.time}s!
          </h3>
        ) : (
          ''
        )}
    </div>

  );
}


export default Garage;