import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface ILocalStorage {
    data: any | null,
    set(data: object | string): Promise<void>,
    remove(): Promise<void>,
    loading: boolean
}

export const useLocalStorage = (key: string, initial?, ) : ILocalStorage => {

    const [data, setData] = useState<any | null>(initial)
    const [loading, setLoading] = useState<boolean>(false)

    const set = async (data: object): Promise<void> => {
        try {
            setData(data)
            await AsyncStorage.setItem(key, JSON.stringify(data))
        } catch (error) {
            await AsyncStorage.setItem(key, JSON.stringify(initial))

        }
    }

    const remove = async (): Promise<void> => {
        await AsyncStorage.removeItem(key)
    }

    useEffect(() => {
        setLoading(true)
        const onLoad = async () => {
            const data = JSON.parse(await AsyncStorage.getItem(key))
            if (data) {
                await setData(data)
            } else {
                await setData(initial)
            }
            await setLoading(false)
        }
        onLoad()
    }, [])

    return {
        data,
        set,
        remove,
        loading
    }
}