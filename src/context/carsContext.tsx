import { ICars } from './../interfaces/getCars';
import { createContext, useContext } from "react";

interface ICarsContext {
    cars: ICars[];
}

export const CarsContext = createContext<ICarsContext>({
    cars: []
})

export const useCarsContext = () => useContext(CarsContext);