import { StyleSheet } from 'react-native'
import { TEXT_SIZE } from './ConfigTheme'


export const styles = StyleSheet.create({
   container: {
      borderBottomWidth: 1,
      borderBottomColor: '#d9d3d2',
      marginTop: 5,
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative'
   },
   calendar: {
      position: 'absolute',
      zIndex: 3,
      height: '100%',
      padding: 5
   },
   inputSearch: {
      flex: 1,
      padding: 10,
      paddingLeft: 45,
      fontSize: TEXT_SIZE,
      fontFamily: 'Secondary',  
      backgroundColor: '#e0e0e0',
      marginBottom: 20,
      width: 350,
      borderRadius: 10,
   }
})