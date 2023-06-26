import React, { createContext, useEffect, useState } from 'react'
import { singIn } from '../services/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IUserData } from '../utils/interfaces/UserIntreface'

export interface UserContextInterface {
    auth: boolean,
    login(user: string, password: string, navigation: any): Promise<void>,
    loading: boolean,
    error: Error,
    sessionData(): any,
    logout(navigation): Promise<void>,
    userData?: IUserData,
    loadingData: boolean,
    finalize: boolean
}


export const userContext: React.Context<UserContextInterface> = createContext(null)

export function UserProvider({ children }) {
    const [auth, setAuth] = useState<boolean>(false)
    const [userData, setUserData] = useState<IUserData>(null)
    const [loadingData, setLoadingData] = useState(false)
    const [loading, setLoading] = useState(false)
    const [finalize, setFinalize] = useState(false)
    const [error, setError] = useState(null)

    const login = async (user: string, password: string, navigation: any): Promise<void> => {
        setFinalize(false)
        setLoading(true)
        try {
            const { data } = await singIn(user, password)
            if (data.auth) {
                setAuth(true)
                navigation.navigate('LotteryList')
                await AsyncStorage.setItem('@session', JSON.stringify(data))
                const userData = await sessionData()
                setUserData(userData)
            }
        } catch (error) {
            setError(error)
        }
        await setLoading(false)
        await setFinalize(true)


    }

    const sessionData = async () => {
        return JSON.parse(await AsyncStorage.getItem('@session'))
    }

    const logout = async (navigation): Promise<void> => {
        await AsyncStorage.removeItem('@session')
        setUserData(null)
        navigation.navigate('SingIn')
        setAuth(false)
    }


    useEffect(() => {
        const init = async () => {
            setLoadingData(true)
            const data = await sessionData()
            if (data) {
                setUserData(data)
                setAuth(true)
            }
            setLoadingData(false)
        }
        init()
    }, [auth])

    const provider = {
        auth,
        login,
        loading,
        sessionData,
        error,
        logout,
        userData,
        loadingData,
        finalize
    }

    return (
        <userContext.Provider value={provider}>
            {children}
        </userContext.Provider>
    )
}
