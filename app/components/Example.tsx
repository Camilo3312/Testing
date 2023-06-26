import { View, Button, StyleSheet, Text, TextInput, SafeAreaView, Alert} from "react-native";
import { Table, TableWrapper, Row, Rows, Cell } from 'react-native-table-component';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";

export default function TableComponent() {

    const [tableHead] = useState(['Head', 'Head2', 'Head3', 'head'])
    const [tableData, setTableData] = useState<any>([
        ['data 1','data','data','data'],
        ['data 2','data','data','data'],
    ])

    const Element = (
        <TouchableOpacity onPress={() => { console.warn(1) }}>
            <View style={styles.btn}>
                <Text style={styles.btnText}>button</Text>
            </View>
        </TouchableOpacity>
    );

    const handleDeleteRow = (index) => {
        let copyTableData = [...tableData]
        copyTableData.splice(index, 1)
        setTableData(copyTableData)
    }

    const deleteRow = (index) => {
        Alert.alert('Eliminar numero', 'Desea eliminar el numero', [
            {
                text: 'Eliminar',
                onPress: () => handleDeleteRow(index)
            },
            {
                text: 'Cancelar',
                style: 'cancel' 
            }
        ])
    }

    const pushData = () => {
        setTableData([...tableData, ['data','data', 'data', <Button onPress={e => deleteRow(tableData.length - 1)} title="hello"/>]])
    }

 
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Table borderStyle={{ borderWidth: 1 }}>
                    <Row data={tableHead} flexArr={[1]} style={styles.head} textStyle={styles.text} />
                    {
                         tableData?.map((row, _index) => (
                            <TableWrapper key={_index} style={styles.row} >
                                {
                                    row.map((cell, index) => (
                                        <Cell key={index} data={index === 3 ? <Button title="Borrar" onPress={() => deleteRow(_index)} /> : cell}  />
                                    ))
                                }
                            </TableWrapper>
                         ))
                    }
                    
                </Table>
                
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  height: 40, backgroundColor: '#808B97'},
    text: { margin: 6, color: 'red' },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1', height: 50 },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});