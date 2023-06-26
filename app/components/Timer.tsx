import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { formatHour, formatMinutes, formatSeconds, substHour, substMinutes } from "../utils/formatHour";
import { lotteryContext } from "../context/lotteryContext";
import { styles } from "../styles/Timer";

export enum StylesEnum {
    normal = 'normal',
    timer = 'timer'
}

export function Timer({ time, id }) {
    const [time_, setTime] = useState(formatHour(time))
    const [styleType, setStyle] = useState<StylesEnum>(StylesEnum.normal)
    const { deleteLotterie } = useContext(lotteryContext)
    
    useEffect(() => {
        const closing: any = new Date()
        closing.setHours(substHour(time))
        closing.setMinutes(substMinutes(time))
        closing.setSeconds(0)
        const intervalId = setInterval(() => {
            const now: any = new Date()
            const difference = closing - now
            const remainingMinutes = Math.floor(difference / 60000)
            const remainingSeconds = Math.floor((difference % 60000) / 1000)
            
            if (remainingMinutes <= 39 && remainingMinutes > -1) {
                setStyle(StylesEnum.timer)
                setTime(`${formatMinutes(remainingMinutes)}${formatSeconds(remainingSeconds)}`)
            } else {
                setStyle(StylesEnum.normal)
                setTime(formatHour(`${closing.getHours()}:${formatSeconds(closing.getMinutes())}`))
                if (remainingMinutes <= -1) {
                    setStyle(StylesEnum.timer)
                    setTime(`cerrado`)
                    deleteLotterie(id)
                }
            }
        }, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [time])

    return (
        <View style={styleType == 'normal' ? {} : styles.container}>
            <Text style={styleType == 'normal' ? styles.date : styles.timer}>{time_} </Text>
        </View>
    )
}