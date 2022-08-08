import React, { useRef } from 'react';
import { ICars, ICarsProps } from '../interfaces/getCars';
import Car from './Car';
import { useCarsContext } from '../context/carsContext';
import '../styles/Cars.css';
import usePagination from '../hooks/usePagination';
import { IWinner } from '../interfaces/getCars'

interface IcarsProps {
    cars: ICars[];
}

interface IDispatch {
  dispatchWinner: React.Dispatch<IWinner>
  
    dispatchReset: React.Dispatch<number>
}

function Cars({dispatchReset, dispatchWinner}: IDispatch) {
    const { cars } = useCarsContext();
    const { firstContentIndex, lastContentIndex, nextPage, prevPage, page, setPage, totalPages } = usePagination({
        contentPerPage: 7,
        count: cars.length,
    })


    return (
        <div className='garage'>
            {/* <h1 className=''>Garage({cars.length})</h1>
            <h2>Page #{Math.ceil(cars.length / 7)}</h2>
            {cars.map((car: ICars) => (
                <Car key={car.name} name={car.name} id={car.id} color={car.color} />
            ))} */}
            <h1 className='itemstitle'>Garage ({cars.length})</h1>
      <h2 className='itemspage'>
        Page #{page}/{totalPages}
      </h2>
      {cars.slice(firstContentIndex, lastContentIndex).map((car: ICars) => (
        <Car key={car.id} name={car.name} color={car.color} id={car.id} dispatchWinner={dispatchWinner} dispatchReset={dispatchReset} />
      ))}
      <div className='pagination'>
        <button onClick={prevPage}>
          Prev
        </button>
        {[...Array(totalPages).keys()].map((el) => (
          <button onClick={() => setPage(el + 1)} key={el}>
            {el + 1}
          </button>
        ))}
        <button onClick={nextPage}>
          Next
        </button>
        </div>
        </div>
    )
}

export default Cars;