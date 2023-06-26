import 'react-native-gesture-handler';
import React, { useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import Navigation from './app/navigation/Navigation';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { LotteryProvider } from './app/context/lotteryContext';
import { UserProvider } from './app/context/userContext';

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    'Primary': require('./assets/fonts/Poppins-Bold.ttf'),
    'Secondary': require('./assets/fonts/Poppins-Regular.ttf')
  })
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <UserProvider>
      <LotteryProvider>
        <Navigation />
      </LotteryProvider>
    </UserProvider>

  );
}
