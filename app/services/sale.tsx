import axios, { AxiosResponse } from 'axios'
import { SaleDto } from '../utils/dtos/saleDto'


export function process(sale: SaleDto): Promise<AxiosResponse> {
    return axios.post('https://boleteria-api-rest.vercel.app/api/v1/sale/process', sale)
}

export function getSales(idVendor: number, token: string, startDate: string, endDate: string): Promise<AxiosResponse> {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.post('https://boleteria-api-rest.vercel.app/api/v1/sale/sales', { vendor: idVendor, start_date: startDate, end_date: endDate }, config)
}
