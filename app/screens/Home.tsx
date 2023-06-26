import React, { useCallback, useContext, useEffect } from 'react'
import { View, Text, Button, TextInput, SafeAreaView } from 'react-native'
import { styles } from '../styles/SingIn'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { lotteryContext } from '../context/lotteryContext';

export function HomePage  ()  {
    


    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ fontFamily: 'Secondary', color: '#a8a8a8', fontSize: 45 }}>Bienvenido</Text>
        </SafeAreaView>
    )
}
