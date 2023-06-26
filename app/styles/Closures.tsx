import { StyleSheet } from "react-native";
import { BODY_TABLE_TEXT_SIZE, HEADER_TABLE_TEXT_SIZE, SUBTITLE_SECONDARY_SIZE } from "./ConfigTheme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
        gap: 20,
    },

    table: {
        borderColor: '#ffffff',
        borderRadius: 5
    },
    head: {
        height: 30,
        textAlign: ''
    },
    wrapper: {
        flexDirection: 'row',

    },
    title: {
        fontFamily: 'Secondary',
        fontSize: SUBTITLE_SECONDARY_SIZE,
        color: '#707070',
        textAlign: 'center'
    },
    row: {
        height: 60,

    },
    text: {
        textAlign: 'center',
        fontFamily: 'Secondary',
    },
    textHeader: {
        fontSize: HEADER_TABLE_TEXT_SIZE,
        color: '#868686'
    },
    textBody: {
        fontSize: BODY_TABLE_TEXT_SIZE,
        color: '#6e6e6e'
    }
});