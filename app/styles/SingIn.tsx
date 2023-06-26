import { StyleSheet } from 'react-native'
import { INPUT_LABEL_SIZE, INPUT_TEXT_SIZE, SUBTITLE_SECONDARY_SIZE, SUBTITLE_SIZE, TEXT_SECONDARY_SIZE, TEXT_SIZE, TITLE_SIZE } from './ConfigTheme'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 30,
        paddingTop: 60,
        backgroundColor: '#FFFF'
    },
    logo: { 
        fontFamily: 'Secondary', 
        color: '#c5c5c5', 
        fontSize: SUBTITLE_SIZE
    },
    title: { 
        fontFamily: 'Secondary', 
        color: '#a1a1a1', 
        fontSize: TITLE_SIZE, 
        width: '70%',
        paddingTop: 10, 
        paddingBottom: 20 
    },
    input_text: { 
        fontSize: INPUT_LABEL_SIZE, 
        color: '#969696', 
        fontFamily: 'Secondary' 
    },
    input: {
        height: 50,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#e2e2e2',
        fontSize: INPUT_TEXT_SIZE,
        marginBottom: 20,   
        fontFamily: 'Secondary'
    },
    remember_password: { 
        paddingTop: 10, 
        paddingBottom: 10, 
        flexDirection: 'row', 
        gap: 10, 
        alignItems: 'center',
        title: { 
            fontSize: TEXT_SIZE, 
            color: '#adadad', 
            fontFamily: 'Secondary' 
        }

    },
    alert: { 
        fontSize: TEXT_SIZE, 
        color: '#818181', 
        fontFamily: 'Secondary' 
    },
    button: {
        padding: 10
    }
})