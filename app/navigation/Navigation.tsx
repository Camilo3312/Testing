import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SingInPage from '../screens/SingIn'
import ClosuresPage from '../screens/Closures'
import ProcessSalePage from '../screens/ProcessSale'
import LotteryListPage from '../screens/lotteryList'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { userContext } from '../context/userContext'
import { DrawerPage } from '../components/Dawrer'
import SaleInformation from '../screens/SaleInformation'

export default function Navigation() {
    const { auth } = useContext(userContext)
    const Drawer = createDrawerNavigator()
    const Stack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            <DrawerPage>
                <Stack.Navigator
                    initialRouteName='SingIn'
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name='SingIn' component={SingInPage} />
                    <Stack.Screen name='LotteryList' component={LotteryListPage} />
                    <Stack.Screen name='ClosuresPage' component={ClosuresPage} />
                    <Stack.Screen name='ProcessSale' component={ProcessSalePage} />
                    <Stack.Screen name='SaleInformation' component={SaleInformation} />
                </Stack.Navigator>
            </DrawerPage>
        </NavigationContainer>
    )
}