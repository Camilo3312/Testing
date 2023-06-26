
import { StyleSheet } from 'react-native'
import { SUBTITLE_SECONDARY_SIZE, SUBTITLE_SIZE,  TEXT_SECONDARY_SIZE,  TEXT_SIZE } from './ConfigTheme'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: SUBTITLE_SECONDARY_SIZE,
        color: '#797979',
        fontFamily:'Secondary',
        textAlign: 'center'
    },
    container_list: {},  
    lottery: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 17,
        paddingLeft: 0,

        fontWeight: '500',
        borderBottomWidth: 2,
        // backgroundColor: 'red'
        borderBottomColor: '#e2e2e2'
    },
   
    title_lottery: {
        fontSize: TEXT_SIZE,
        fontFamily: 'Secondary',
        color: '#585858'
    },

    time_lottery: {
        color: '#ca1c1c',
        fontSize: TEXT_SECONDARY_SIZE,
        fontFamily: 'Secondary'
    },

    button: {
        borderRadius: 10,
    }
})
