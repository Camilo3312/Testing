import { View, SafeAreaView, TouchableOpacity, Text, Modal } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

import DatePicker from 'react-native-modern-datepicker';

import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import React from 'react';
import { styles } from '../styles/Calendar';
import { useState } from 'react';


export default function Calendar() {

    const today = new Date()
    const afterEightDays = new Date()
    afterEightDays.setDate(today.getDate() + 8)
    const startDate = getFormatedDate(new Date())
    const afterSomeDays = afterEightDays.getTime()
    const finalDate = getFormatedDate(new Date(afterEightDays));
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState('02/10/2023')

    function handleOnpress() {
        setOpen(!open)
    }

    function handleChange(propdate) {
        setDate(propdate)
    }

    return (

        <View>
            <TouchableOpacity onPress={handleOnpress}>
                <Ionicons style={styles.calendarButton} color='#777777' name='calendar-outline' size={25} />
            </TouchableOpacity>

            <Modal
                animationType='slide'
                transparent={true}
                visible={open}
            >
                <View style={styles.centeredView} >
                    <View style={styles.modalView}>
                        <DatePicker
                            minimumDate={startDate}
                            maximumDate={finalDate}
                            mode='calendar'
                            selected={date}
                            onDateChange={handleChange} />

                        <TouchableOpacity onPress={handleOnpress}>
                            <Ionicons name='close-outline' color="red" size={25} />
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </View>
    )
}