import { StyleSheet } from 'react-native'
import { TEXT_SECONDARY_SIZE, TEXT_SIZE } from './ConfigTheme'

export const styles = StyleSheet.create({
    container: { 
        backgroundColor: '#dfdfdf', 
        flex: 1, borderRadius: 15, 
        paddingLeft: 18, 
        paddingRight: 18, 
        paddingTop: 7, 
        paddingBottom: 3 
    },
    date: { 
        fontFamily: 'Secondary', 
        textAlign: 'center', 
        fontSize: TEXT_SECONDARY_SIZE,
        color: '#818181'
    },
    timer: { 
        color: '#494949', 
        fontFamily: 'Secondary', 
        fontSize: TEXT_SECONDARY_SIZE 
    }
})