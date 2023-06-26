import React, { useContext, useEffect } from "react"
import { View, TextInput, Text, TouchableOpacity, Modal, ActivityIndicator } from "react-native"
import { useState, } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "../styles/SaleInformation";
import Ionicons from '@expo/vector-icons/Ionicons';
import DatePicker from 'react-native-modern-datepicker';
import { Rows, Row, Table, TableWrapper, Cell, Cols, Col } from "react-native-table-component"
import { formatPrice } from "../utils/formatPrice";
import { userContext } from "../context/userContext";
import { getSales } from "../services/sale";
import { getCurrentDate } from "../utils/getCurrentDate";
import { formatDate } from "../utils/formatDate";
import { ScrollView } from "react-native-gesture-handler";


const SaleInformation = () => {
    const { userData } = useContext(userContext)
    const [data, setData] = useState(null)
    const [openCalendar, setOpenCalendar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [finalize, setFinalize] = useState(true)
    const [fromDate, setFromDate] = useState(getCurrentDate())
    const [toDate, setToDate] = useState(getCurrentDate())
    const [whoSelectDate, setWhoSelectDate] = useState(null)
    const [tableTitle] = useState(['FECHA', 'LOTERIAS', 'NUMEROS', '$$$', 'TOTAL'])

    const handleFOpen = (whoSelect) => {
        setOpenCalendar(!openCalendar)
        setWhoSelectDate(whoSelect)
    }

    const handleGetSales = async () => {
        setLoading(true)
        setFinalize(false)
        const { data } = await getSales(userData.id, userData.token, `${fromDate} 00:00:00`, `${toDate} 23:00:00`)
        await setData(!data.data.length ? null : data.data)
        await setLoading(false)
        await setFinalize(true)

    }

    const handleFromDate = async (propdate) => {
        setOpenCalendar(false)
        if (whoSelectDate) {
            setFromDate(propdate.split('/').join('-'))
        } else {
            setToDate(propdate.split('/').join('-'))
        }
    }

    const formatLotteries = (data) => {
        return data?.map(item => {
            return [
                formatDate(item.fechaVenta),
                item.nombre,
                <Col textStyle={[styles.text, styles.textBody]} data={item.numbers.map(item => [item.numero])} />,
                <Col textStyle={[styles.text, styles.textBody]} data={item.numbers.map(item => [`$${item.valor == 0 ? formatPrice(item.combinado) : formatPrice(item.valor)}`])} />, `$${formatPrice(item.Total)}`]
        })
    }

    useEffect(() => {
        handleGetSales()
    }, [fromDate, toDate])

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.titleApp}>VENTAS</Text>
                <View style={styles.dateInputsForm}>
                    <View style={styles.dataInputsCont}>
                        <Text style={styles.labelInput}>DESDE</Text>
                        <TextInput onPressIn={e => handleFOpen(true)}
                            style={styles.dateInput}
                            value={fromDate}
                            placeholder="mm/dd/yy">
                        </TextInput>
                    </View>
                    <View style={styles.dataInputsCont}>
                        <Text style={styles.labelInput}>HASTA</Text>
                        <TextInput onPressIn={e => handleFOpen(false)}
                            style={styles.dateInput}
                            value={toDate}
                            placeholder="mm/dd/yy">
                        </TextInput>
                    </View>
                </View>
                <View>

                    <Ionicons
                        style={styles.searchIncon}
                        size={20}
                        name="md-search-outline" />
                    <TextInput
                        style={styles.inputSearch}
                        placeholder="Buscar">
                    </TextInput>
                </View>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={openCalendar}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <DatePicker
                                selected={fromDate}
                                mode="calendar"
                                onDateChange={handleFromDate} />
                            <TouchableOpacity onPress={handleFOpen}>
                                <Ionicons name='close-outline' color="red" size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>

            <View style={{ flexGrow: 1, flexBasis: 0 }}>
                <Row data={tableTitle} flexArr={[0.8, 1.1, 0.7, 0.5, 0.5]} style={styles.head} textStyle={[styles.text, styles.textHeader]} />
                <ScrollView>
                    <Table style={styles.table} borderStyle={{ borderWidth: 1, borderColor: '#B8B8B8', borderRadius: 10 }}>
                        <TableWrapper style={styles.wrapper}>
                            <Rows data={formatLotteries(data)} flexArr={[0.8, 1, 0.5, 0.5, 0.5]} style={styles.row} textStyle={[styles.text, styles.textBody]} />
                        </TableWrapper>
                    </Table>
                </ScrollView>
            </View>

            {
                loading && <ActivityIndicator size='large' color='#b9b9b9' />
            }
            {
                !finalize && !data && <Text>No se registraron ventas para esta fecha</Text>
            }
        </SafeAreaView>
    )
}

export default SaleInformation

