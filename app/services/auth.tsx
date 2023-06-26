import axios, { AxiosResponse } from 'axios'

export function singIn(user: string, password: string): Promise<AxiosResponse> {
    return axios.post('https://boleteria-api-rest.vercel.app/api/v1/auth/login', { user, password })
}
