import { formatHour } from "./formatHour"

export const formatDate = (date: string ): string => {
    const now = new Date(date)
    const year = now.getFullYear()
    const month = ('0' + (now.getMonth() + 1)).slice(-2)
    const day = ('0' + now.getDate()).slice(-2)
    const hour = now.getHours()
    const minutes = now.getMinutes()
    const formatedDate = `${year}-${month}-${day} ${formatHour(`${hour}:${minutes}`)}`
    return formatedDate
}