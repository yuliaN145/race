import React, { useCallback, useEffect } from "react";
import '../styles/winners.css'
import { useCarsContext } from '../context/carsContext';
import WinnersItem from '../components/WinnersItem';
import { IWinners } from '../interfaces/getCars';
import axios from 'axios';
import { useState } from "react";

const LIMIT_WINNERS = 10

function Winners() {
    const { winners, setNewRequest, setAllRace, setWinners, winnersPage, setWinnersPage, sortWinners, setSortWinners } = useCarsContext();

    const { order, sort } = sortWinners;

  const getWinnersCars = useCallback(async () => {
    const response = await axios.get(`http://127.0.0.1:3000/winners?_page=${winnersPage}&_limit=${LIMIT_WINNERS}&_sort=${sort}&_order=${order}`)
    console.log(response.data)
    setWinners(response.data)
  }, [order, setWinners, sort, winnersPage])

  useEffect(() => {
    if (winnersPage < 1) {
        setWinnersPage(1)
      }
    getWinnersCars()
  }, [winnersPage, sort, order, getWinnersCars, setWinnersPage])
  console.log(Math.ceil(winners.length / 10))
  // const { firstContentIndex, lastContentIndex, nextPage, prevPage, page, setPage, totalPages } = usePaginationWinners({
  //   contentPerPage: 10,
  //   count: winners.length,
  // })
    setAllRace(false);
    
    return (
        <div className='winners'>
            <h1>Winners ({winners.length})</h1>
            <h2>Page #{winnersPage}</h2>
            <div className='winners-box'>
                <div className="winners-top">
                    <button className="winners-top-item" onClick={() => setSortWinners({...sortWinners, sort: 'id', order: sortWinners.order === 'ASC' ? 'DESC' : 'ASC'})}>Number</button>
                    <div className="winners-top-item">Car</div>
                    <div className="winners-top-item">Name</div>
                    <button className="winners-top-item" onClick={() => setSortWinners({...sortWinners, sort: 'wins', order: sortWinners.order === 'ASC' ? 'DESC' : 'ASC'})}>Wins</button>
                    <button className="winners-top-item" onClick={() => setSortWinners({...sortWinners, sort: 'time', order: sortWinners.order === 'ASC' ? 'DESC' : 'ASC'})}>Time</button>
                </div>
                {winners.map((winnerCar: IWinners) => (
                <WinnersItem key={winnerCar.id} id={winnerCar.id} time={winnerCar.time} wins={winnerCar.wins} />
            ))}
            </div>
            <div className='winners__pagination'>
        <button
          disabled={winnersPage === 1}
          className={`page ${winnersPage === 1 ? 'disabled' : ''}`}
          onClick={() => setWinnersPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <button
          disabled={Math.ceil(winners.length / 10) !== winnersPage}
          className={`page ${Math.ceil(winners.length / 10) !== winnersPage ? 'disabled' : ''}`}
          onClick={() => setWinnersPage((prev) => prev + 1)}
        >
          Next
        </button>
        </div>
        
        </div>
    )
}

export default Winners;