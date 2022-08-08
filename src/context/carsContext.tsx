import { ICars, IWinners } from './../interfaces/getCars';
import { createContext, useContext } from "react";

interface ICarsContext {
    cars: ICars[];
    setCars: (cars: ICars[]) => void;
    setNewRequest: React.Dispatch<React.SetStateAction<boolean>>;
    page: number;
    setPage: (page: React.SetStateAction<number>) => void
    updateCar: ICars;
    setUpdateCar: (cars: ICars) => void;
    setAllRace: React.Dispatch<React.SetStateAction<boolean>>;
    allRace: boolean;
    setStopRace: React.Dispatch<React.SetStateAction<boolean>>;
    stopRace: boolean;
    winners: IWinners[];
    setWinners: (winners: IWinners[]) => void;
    canWin: boolean;
    setCanWin: React.Dispatch<React.SetStateAction<boolean>>;
    winnersPage: number;
    setWinnersPage: (page: React.SetStateAction<number>) => void;
    sortWinners: {sort: string
      order: string};
    setSortWinners: React.Dispatch<
    React.SetStateAction<{
      sort: string
      order: string
    }>
  >;
}
export interface IUsePaginationReturn {
    page: number
    totalPages: number
    firstContentIndex: number
    lastContentIndex: number
    nextPage: () => void
    prevPage: () => void
    setPage: (page: number) => void
  }
  export interface IUsePaginationProps {
    contentPerPage: number
    count: number
  }

export type UsePagination = (arg0: IUsePaginationProps) => IUsePaginationReturn
export const CarsContext = createContext<ICarsContext>({
    cars: [],
    setCars: (cars: ICars[]) => {},
    setNewRequest: () => {},
    page: 1,
    setPage: () => 1,
    updateCar: {id: 0, color: '', name: ''},
    setUpdateCar: (cars: ICars) => {},
    setAllRace: () => false,
    allRace: false,
    setStopRace: () => false,
    stopRace: false,
    winners: [],
    setWinners: (winners: IWinners[]) => {},
    canWin: true,
    setCanWin: () => {},
    winnersPage: 1,
    setWinnersPage: () => 1,
    sortWinners: { sort: 'id', order: 'DESC' },
    setSortWinners: () => {},
})

export const useCarsContext = () => useContext(CarsContext);