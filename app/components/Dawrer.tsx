import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState, useContext } from 'react';
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { userContext } from '../context/userContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { INPUT_LABEL_SIZE, SUBTITLE_SIZE, TEXT_SIZE } from '../styles/ConfigTheme';

const navigations : any = [
    {
        to: 'LotteryList',
        name: 'HOME',
        icon: 'cash-outline'
    },
    {
        to: 'ClosuresPage',
        name: 'CIERRES',
        icon: 'close-circle-outline'
    },
    {
        to: 'SaleInformation',
        name: 'VENTAS',
        icon: 'cart-outline'
    }
]


export const DrawerPage = ({ children }) => {
    const drawer = useRef<DrawerLayoutAndroid>(null)
    const navigation = useNavigation<any>()
    const { logout, auth, userData, loadingData } = useContext(userContext)
    const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>(
        'left',
    )

    const navigationView = () => (
        <SafeAreaView style={styles.navigationContainer}>
            {
                !loadingData ?
                    auth &&
                    <View style={styles.profile}>
                        <>
                            <Text style={[styles.paragraph, styles.title]}>Hola {userData?.username}</Text>
                            <Text style={[styles.paragraph, styles.role]}>Rol {userData?.role}</Text>
                        </>
                    </View>
                    :
                    <Text>Cargando...</Text>
            }
            <View style={styles.options}>
                <View>
                    {
                        navigations.map(nav => (
                            <Pressable key={nav.to} style={styles.link} onPress={() => { navigation.navigate(nav.to), drawer.current?.closeDrawer() }}>
                                <Ionicons color='#777777' name={nav.icon} size={25} />
                                <Text style={[styles.paragraph, styles.linkName]}>{nav.name}</Text>
                            </Pressable>
                        ))
                    }
                </View>
                <Pressable style={styles.link} onPress={() => { logout(navigation), drawer.current?.closeDrawer() }}>
                    <Ionicons color='#777777' name={'log-out-outline'} size={25} />
                    <Text style={[styles.paragraph, styles.linkName]}>Cerrar sesion</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );

    return (

        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerLockMode={!auth ? 'locked-closed' : null}
            drawerPosition={drawerPosition}
            renderNavigationView={navigationView}>
            {children}
        </DrawerLayoutAndroid>
    );
};

const styles = StyleSheet.create({
    navigationContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },
    paragraph: {
        fontFamily: 'Secondary'
    },
    title: {
        textAlign: 'center',
        fontSize: SUBTITLE_SIZE
    },
    role: {
        fontSize: INPUT_LABEL_SIZE,
        textAlign: 'center',
        color: '#666666'
    },
    link: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
        padding: 20,
    },
    linkName: {
        fontSize: TEXT_SIZE,
        paddingLeft: 11,
        color: '#6e6e6e',

    },
    profile: {
        paddingTop: 40,
        paddingBottom: 40
    },
    options: {
        flexGrow: 1,
        flexBasis: 0,
        justifyContent: 'space-between'
    }
});
