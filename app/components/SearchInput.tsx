import { View, TextInput } from 'react-native'
import React from 'react'
import Calendar from './Calendar'
import { styles } from '../styles/SearchInput'

export default function SearchInput() {
  return (
    <View style={styles.container}>
      <View style={styles.calendar}>
        <Calendar />
      </View>
      <TextInput
        style={styles.inputSearch}
        placeholder='HOY'></TextInput>

    </View>
  )
}