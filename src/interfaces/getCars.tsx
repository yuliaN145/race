export interface ICars {
    name: string
    color: string
    id: number
}
export interface ICarsProps {
    name: string
    color: string
    id: number
  
    dispatchWinner: React.Dispatch<IWinner>
  
    dispatchReset: React.Dispatch<number>
}
export interface IWinners {
    id: number
    time: number
    wins: number
}
export interface IWinner {
    id: number
    name: string
    time: number
}