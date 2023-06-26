import React, { useContext, useState } from 'react'
import { View, Text } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component'
import { styles } from '../styles/Closures'
import { formatHour } from '../utils/formatHour'
import { SafeAreaView } from 'react-native-safe-area-context'
import { lotteryContext } from '../context/lotteryContext'

const ClosuresPage = () => {
    const { data } = useContext(lotteryContext)
    const [tableHead, setTableHead] = useState(['LOTERIA', 'HORARIO']);
    
    function formatLotteries(data) {
        return data?.map(item => { return [item.nombre, formatHour(item.cierre)] })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>CIERRES</Text>
            <View>
                <Row data={tableHead} style={styles.head} textStyle={[styles.text, styles.textHeader]} />
                <Table style={styles.table} borderStyle={{ borderWidth: 1, borderColor: '#b8b8b8', borderRadius: 10 }}>
                    <TableWrapper style={styles.wrapper}>
                        <Rows data={formatLotteries(data?.data)} flexArr={[1, 1, 2, 1]} style={styles.row} textStyle={[styles.text, styles.textBody]} />
                    </TableWrapper>
                </Table>
            </View>
        </SafeAreaView>
    )
}

export default ClosuresPage