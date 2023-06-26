export interface NumberData {
    number: string,
    value: number,
    combinado: number
}

interface BuyData {
    numbers: NumberData[],
    lotteries: number[]
}

export interface SaleDto {
    vendor: number,
    buy: BuyData,
    clientName: string,
    phone: string
}