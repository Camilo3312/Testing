import { StyleSheet } from "react-native";
import { SUBTITLE_SECONDARY_SIZE, SUBTITLE_SIZE, TITLE_SECONDARY_SIZE, TITLE_SIZE } from "./ConfigTheme";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 30,
        flexDirection: 'column'
    },

    titleApp: {
        color: '#7c7c7c',
        fontFamily: 'Secondary',
        fontSize: SUBTITLE_SECONDARY_SIZE,
        marginBottom: 20,
        textAlign: 'center'
    },
    dateInputsForm: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dataInputsCont: {
        marginBottom: 10,
    },
    inputSearch: {
        padding: 10,
        paddingLeft: 45,
        fontSize: 19,
        fontFamily: 'Secondary',
        backgroundColor: '#E0E0E0',
        width: '100%',
        borderRadius: 10,
    },
    searchIncon: {
        position: 'absolute',
        zIndex: 3,
        padding: 10
    },
    labelInput: {
        fontFamily: 'Secondary'
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#8D918E',
        width: 150,
        padding: 5,
        fontFamily: 'Secondary',
        paddingLeft: 15,
        borderRadius: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        width: '90%',
        padding: 35,
        alignItems: 'center',
        backgroundColor: '#ffff',
    },
    table: {
        borderColor: '#FFFFFF',
        borderRadius: 5,        
    },
    head: {
        height: 30,
        marginBottom: 5
    },
    wrapper: {
        flexDirection: 'row',
    },
    title: {
        fontFamily: 'Secondary',
        color: '#707070',
        textAlign: 'center'
    },
    row: {
    },
    text: {
        textAlign: 'center',
        fontFamily: 'Secondary',
    },
    textHeader: {
        color: '#868686'
    },
    textBody: {
        fontSize: 15,
        color: '#6E6E6E',
        margin: 2
    }
})