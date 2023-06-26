import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export function CustomButton({action, value}) {
    return (
        <Pressable onPress={action} style={styles.container}>
            <Text style={styles.value}>{value}</Text>
        </Pressable >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#969696',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    },
    value: {
        fontFamily: 'Secondary',
        fontSize: 20,
        color: '#FFFF'
    }
})