import { StyleSheet } from 'react-native'
import { BODY_TABLE_TEXT_SIZE, HEADER_TABLE_TEXT_SIZE } from './ConfigTheme'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    title: {
        color: '#7c7c7c',
        fontFamily: 'Secondary',
        fontSize: 23,
        marginBottom: 40,
        textAlign: 'center'
    },
    input_text: { 
        fontSize: 19, 
        color: '#969696', 
        fontFamily: 'Secondary' 
    },
    message: {
        fontFamily: 'Secondary',
        backgroundColor: '#ffd5d5',
        padding: 5,
        borderRadius: 10,
        textAlign: 'center',
        color: '#ff0000',
        marginBottom: 20
    },

    container_input: {
        flexGrow: 1,
        flexBasis: 0,
    },
    input: {
        height: 50,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#e2e2e2',
        fontSize: 22,
        marginBottom: 20,
        fontFamily: 'Secondary'
    },
    flex: {
        flexDirection: 'row',
        gap: 30
    },

    table: {
        // marginTop: 30,
        // marginBottom: 30,
        borderColor: '#ffffff',
        borderRadius: 5
    },
    head: {
        height: 50,
    },
    text: {textAlign: 'center', fontFamily: 'Secondary', color: '#6d6d6d', fontSize: 16},
    row: {
        flexDirection: 'row',
        height: 40
    },
    cell: {
        flex: 1,
        alignItems: 'center'
    },
    icon_tash: {
    },
    textHeader: {
        fontSize: HEADER_TABLE_TEXT_SIZE,
        color: '#868686',
        textAlign: 'center',
    },
    textBody: {
        fontSize: BODY_TABLE_TEXT_SIZE,
        color: '#6e6e6e'
    }
})
