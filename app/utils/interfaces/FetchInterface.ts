export interface FetchInterface {
    // get(url: string, config: object): Promise<void>,
    post(url: string, config: object):  Promise<void>,
    data: any | null,
    error: Error | null,
    loading: Boolean | null,
    setReFetch: React.Dispatch<any>,
    reFetch: boolean,
    finalize: boolean
}