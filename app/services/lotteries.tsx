import axios, { AxiosResponse } from 'axios'

export function getLotteries(): Promise<AxiosResponse> {
    return axios.get('https://boleteria-api-rest.vercel.app/api/v1/lotteries')
}
