export function formatHour(hour) {
    const [hora, minutos] = hour.split(':');
    let hora12 = parseInt(hora, 10);
    let periodo = 'AM';

    if (hora12 > 12) {
        hora12 -= 12;
        periodo = 'PM';
    } else if (hora12 === 12) {
        periodo = 'PM';
    } else if (hora12 === 0) {
        hora12 = 12;
    }
    const hora12String = `${hora12}:${minutos} ${periodo}`;
    return hora12String
}

export function formatMinutes(minutes) {
    return minutes == 0 ? "seg " : `${minutes}:`;
}

export function formatSeconds(seconds) {
    return seconds < 10 ? `0${seconds}` : seconds;
}

export function substHour(hour) {
    return parseInt(hour.split(":")[0]);
}

export function substMinutes(hour) {
    return parseInt(hour.split(":")[1]);
}