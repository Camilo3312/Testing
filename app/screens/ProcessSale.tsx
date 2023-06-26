import React, { useState, useContext } from 'react'
import { Text, View, TextInput, Alert, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../styles/ProcessSale'
import { CustomButton } from '../components/CustomButton'
import { Table, TableWrapper, Row, Rows, Cell } from 'react-native-table-component'
import { lotteryContext } from '../context/lotteryContext'
import { NumberData, SaleDto } from '../utils/dtos/saleDto'
import { process } from '../services/sale'
import { formatPrice } from '../utils/formatPrice'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProcessSalev2Page({ navigation }) {
    const [tableHead, setTableHead] = useState(['Número', 'Apuesta', 'Combinado', 'Acciones'])
    const [tableData, setTableData] = useState([])
    const [total, setTotal] = useState<any>('')
    const [numbers, setNumbers] = useState<NumberData[]>([])
    const [saleInf, setSaleInf] = useState<SaleDto | null>()
    const { buyLottery } = useContext(lotteryContext)

    // Inputs
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [number, setNumber] = useState<string>()
    const [value, setValue] = useState<any>('')
    const [combinado, setCombinado] = useState<any>('')
    const [message, setMessage] = useState<string>('')

    const clearForm = (): void => {
        setNumber(null)
        setValue(null)
        setCombinado(null)
        setTotal('')
    }

    const handleDeleteRow = (index: number): void => {
        let copyTableData = [...tableData]
        copyTableData.splice(index, 1)
        setTableData(copyTableData)
    }

    const handleDeleteNumber = (index: number): void => {
        let copyNumbers = [...numbers]
        copyNumbers.splice(index, 1)
        setNumbers(copyNumbers)
    }


    const validateFields = () => {
        if (name.trim() === '' || phone.trim() === '') {
            return false
        }
        return true
    }

    const handleAddNumber = (): void => {
        if (number) {
            setNumbers([
                ...numbers,
                {
                    number: number,
                    value: value ? (parseInt(value) * buyLottery.length) : 0,
                    combinado: combinado ? (parseInt(combinado) * buyLottery.length) : 0
                }
            ])
            setTableData([
                ...tableData,
                [
                    number,
                    value ? `$${formatPrice(value)}` : '-',
                    combinado ? `$${formatPrice(combinado)}` : '-',
                    null
                ]
            ])
            clearForm()
        }
    }

    const showTotal = (valor: string): void => {
        setTotal(parseInt(valor) * buyLottery.length)
    }

    const handleProcessBuy = async (): Promise<void> => {
        if (validateFields()) {
            try {
                const idLotteries = buyLottery.map(items => items.idLoteria)
                const buy: SaleDto = {
                    vendor: 1,
                    buy: {
                        numbers: numbers,
                        lotteries: [...idLotteries]
                    },
                    clientName: name,
                    phone: phone
                }
                const response = await process(buy)
                if (response.status == 200) {
                    Alert.alert('VENTA EXITOSA', `JUEGO REALIZADO, TU CODIGO DE VENTA ES: ${response.data.data.id}`, [
                        {
                            text: 'Seguir vendiendo',
                            onPress: () => { navigation.navigate('LotteryList') }
                        },
                        {
                            text: 'Ver ventas',
                            onPress: () => { navigation.navigate('SaleInformation') }
                        }
                    ])
                }
            } catch (error) {
                Alert.alert('Ocurrió un error')
            }
        } else {
            setMessage('Por favor completa todos los campos')
        }
    }

    const deleteRow = (index): void => {
        Alert.alert('Eliminar numero', `Desea eliminar el numero`, [
            {
                text: 'Eliminar',
                onPress: () => { handleDeleteRow(index), handleDeleteNumber(index) }
            },
            {
                text: 'Cancelar',
                style: 'cancel'
            }
        ])
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>NUMEROS Y VALORES</Text>
                {
                    message &&
                    <Text style={styles.message}>{message}</Text>
                }
                <View style={styles.flex}>
                    <View style={styles.container_input}>
                        <Text style={styles.input_text}>NOMBRE</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Andres'
                            onChangeText={value => setName(value)}
                            defaultValue={name}
                        />
                    </View>
                    <View style={styles.container_input}>
                        <Text style={styles.input_text}>TELEFONO</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='31687239'
                            maxLength={12}
                            keyboardType='phone-pad'
                            onChangeText={value => setPhone(value)}
                            defaultValue={phone}
                        />
                    </View>
                </View>
                <View style={styles.flex}>
                    <View style={styles.container_input}>
                        <Text style={styles.input_text}>Número</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='####'
                            keyboardType='numeric'
                            onChangeText={value => setNumber(value)}
                            maxLength={5}
                            defaultValue={number}
                        />
                    </View>
                    <View style={styles.container_input}>
                        <Text style={styles.input_text}>Valor</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='$$$$'
                            keyboardType='numeric'
                            onChangeText={value => { setValue(value), showTotal(value) }}
                            editable={combinado ? false : true}
                            defaultValue={value}
                        />
                    </View>
                    <View style={styles.container_input}>
                        <Text style={styles.input_text}>Combinado</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='$$$$'
                            keyboardType='numeric'
                            onChangeText={value => { setCombinado(value), showTotal(value) }}
                            editable={value ? false : true}
                            defaultValue={combinado}
                        />
                    </View>
                </View>
                <CustomButton value={`SUMAR - $${total ? formatPrice(total) : 0}`} action={e => handleAddNumber()} />
                <View>
                    <Row data={tableHead} flexArr={[1]} style={styles.head} textStyle={styles.textHeader} />
                    <Table style={styles.table} borderStyle={{ borderWidth: 1, borderColor: '#b8b8b8', borderRadius: 10 }}>
                        {
                            tableData?.map((row, _index) => (
                                <TableWrapper key={_index} style={styles.row} >
                                    {
                                        row?.map((cell, index) => (
                                            <Cell key={index} style={styles.cell} data={index === 3 ? <Ionicons style={styles.icon_tash} name='ios-trash-bin-outline' size={25} color='red' onPress={() => deleteRow(_index)} /> : cell} textStyle={styles.textBody} />
                                        ))
                                    }
                                </TableWrapper>
                            ))
                        }
                    </Table>
                </View>
            </View>
            {
                numbers.length > 0 ?
                    <CustomButton value='PROCESAR' action={e => handleProcessBuy()} />
                    :
                    null
            }
        </SafeAreaView>
    )
}
