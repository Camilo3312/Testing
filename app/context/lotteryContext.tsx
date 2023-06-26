import React, { createContext, useEffect, useState } from 'react'
import { useFetch } from '../utils/hooks/useFetch'
import { getLotteries } from '../services/lotteries'
import { FetchInterface } from '../utils/interfaces/FetchInterface'

export interface LotteryContextInterface extends FetchInterface {
    lotteries: any,
    deleteLotterie(id: number): void,
    reload(): void,
    addBuyLottery(lottery: object): void,
    removeBuyLottery(lottery: any): void,
    buyLottery: any[]
}

export const lotteryContext: React.Context<LotteryContextInterface> = createContext(null)

export function LotteryProvider({ children }) {
    const { data, error, loading, finalize, setReFetch, reFetch, post } = useFetch(null, null, getLotteries)
    const [lotteries, setLotteries] = useState([])
    const [buyLottery, setBuyLottery] = useState([])

    function reload(): void {
        setReFetch(!reFetch)
    }

    function deleteLotterie(id: number): void {
        const copyLotteries = [...lotteries]
        const newLottery = copyLotteries.filter(item => item.idLoteria != id)
        setLotteries(newLottery)
    }

    function addBuyLottery(lottery: object): void {
        setBuyLottery([...buyLottery, lottery])
    }

    function removeBuyLottery(lottery: any): void {
        const copyLotteries = [...buyLottery]
        const newLottery = copyLotteries.filter(item => item.idLoteria != lottery.idLoteria)
        setBuyLottery(newLottery)
    } 

    useEffect(() => {
        if (finalize) {
            setLotteries(data?.data)
            // console.warn(data?.data)
        }
    }, [finalize, data])


    const provider = {
        data,
        error,
        loading,
        setReFetch,
        reFetch,
        finalize,
        lotteries,
        deleteLotterie,
        reload,
        post,
        addBuyLottery,
        removeBuyLottery,
        buyLottery
    }

    return (
        <lotteryContext.Provider value={provider}>
            {children}
        </lotteryContext.Provider>
    )
}
