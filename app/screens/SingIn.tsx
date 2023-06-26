import React, { useCallback, useEffect, useState, useContext } from 'react'
import { View, Text, TextInput, SafeAreaView, ActivityIndicator } from 'react-native'
import { styles } from '../styles/SingIn'
import { CustomButton } from '../components/CustomButton'
import { userContext } from '../context/userContext'
import { useLocalStorage } from '../utils/hooks/useLocalStorage'
import * as SplashScreen from 'expo-splash-screen'
import Checkbox from 'expo-checkbox'

SplashScreen.preventAutoHideAsync()

export default function SingInPage({ navigation }) {

    const [user, setUser] = useState<string | null>('')
    const [password, setPassword] = useState<string | null>('')
    const { auth, login, loading, error, finalize } = useContext(userContext)

    const localCheck = useLocalStorage('@check', { checked: false })
    const localPassword = useLocalStorage('@password')

    // Sing in function
    async function handleSingIn() {
        login(user, password, navigation)
    }

    async function handleSetPassword(value: string): Promise<void> {
        setPassword(value)
        if(localCheck.data.checked) {
            localPassword.set(value)
        }
    }

    function handleCheck(value: boolean): void {
        localCheck.set({ checked: value })
        if (value) {
            setPassword(localPassword.data)
        } 
    }

    useEffect(() => {
        if (localCheck.data.checked) {
            setPassword(localPassword.data)
        }
    }, [localPassword.loading])

    useEffect(() => {
        if (auth) {
            navigation.navigate('LotteryList')
        }
    }, [auth])

    const onLayoutRootView = useCallback(async () => {
        await SplashScreen.hideAsync();
    }, [])

    return (
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
            <Text style={styles.logo}>Logo</Text>
            <View>
                <Text style={styles.title}>Bienvenido de nuevo</Text>
                <Text style={styles.input_text}>Nombre de Usuario</Text>
                <TextInput
                    style={styles.input}
                    placeholder='usuario112'
                    onChangeText={value => setUser(value)}
                    defaultValue={user}
                />
                <Text style={styles.input_text}>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Mi contraseña'
                    onChangeText={value => handleSetPassword(value)}
                    defaultValue={password}
                    secureTextEntry={true}
                    textContentType='password'
                />
                <View style={styles.remember_password}>
                    <Text style={styles.remember_password.title}>Recordar contraseña</Text>
                    <Checkbox
                        value={localCheck.data?.checked}
                        onValueChange={value => handleCheck(value)}
                        color={localCheck.data.checked ? '#818181' : undefined}
                    />
                </View>
                <View style={{ height: 30 }}>
                    {
                        loading ?
                            <ActivityIndicator size='large' color='#b9b9b9' />
                            :
                            !auth && finalize &&
                            <Text style={styles.alert}>¡Usuario o contraseña incorrecta!</Text>
                    }
                    {
                        error &&
                        <Text style={styles.alert}>Error de conexión, intenta más tarde</Text>
                    }
                </View>
            </View>
            <View>
                <CustomButton value='Ingresar' action={handleSingIn} />
            </View>
        </SafeAreaView>
    )
}
