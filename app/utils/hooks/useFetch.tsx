import { useEffect, useState } from 'react'
import { FetchInterface } from '../interfaces/FetchInterface'
import axios, { AxiosResponse } from 'axios'

export const useFetch = (url?: string, config?: object, service?: any): FetchInterface => {

    const [data, setData] = useState<any | null>()
    const [reFetch, setReFetch] = useState<boolean>(false)
    const [loading, setLoading] = useState<Boolean | null>()
    const [error, setError] = useState<Error | null>()
    const [finalize, setFinalize] = useState<boolean>(false)

    useEffect(() => {
        setFinalize(false)
        if (url) {
            setLoading(true)
            axios.get(url, config)
                .then(res => {
                    setData(res.data)
                    // console.warn(res.data)
                })
                .finally(() => { setLoading(false), setFinalize(true)})
                .catch(error => setError(error))
        }
        const fetch = async () => {
            if (service) {
                const data = await service()
                // await console.warn(data.data)
                await setData(data.data)
                await setLoading(false)
                await setFinalize(true)
            }
        }
        fetch()
    }, [reFetch])

    // const get = async (url: string, config: Object | null): Promise<void> => {
    //     setLoading(true)
    //     const res = await axios.get(url, config)
    //     await setData(res.data)
    //     await setLoading(false)
    // }

    const post = async (url: string, config: Object): Promise<void> => {
        setLoading(true)
        const res = await axios.post(url, config)
        // console.warn(await res.data);
        await setData(res.data)
        await setLoading(false)
    }

    return { data, error, loading, setReFetch, reFetch, finalize, post }
}