import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, Button, } from 'react-native'
import Checkbox from 'expo-checkbox'
import { styles } from '../styles/LotteryList'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomButton } from '../components/CustomButton'
import { Timer } from '../components/Timer'
import { RefreshControl } from 'react-native-gesture-handler'
import { lotteryContext } from '../context/lotteryContext'
import SearchInput from '../components/SearchInput'
import { userContext } from '../context/userContext'
import { useNavigation } from '@react-navigation/native'
import { useLocalStorage } from '../utils/hooks/useLocalStorage'

export function LottreyCard({ data, addBuyLottery, removeBuyLottery }) {
    const [isChecked, setChecked] = useState(false)
    function handleChecked(value) {
        setChecked(!isChecked)
        if (value) {
            addBuyLottery(data)
        } else {
            removeBuyLottery(data)
        }
    }
    return (
        <View style={styles.lottery} key={data.idLoteria}>
            <View>
                <Text style={styles.title_lottery}>{data.nombre}</Text>
                <Text style={styles.time_lottery}><Timer time={data.cierre} id={data.idLoteria} /></Text>
            </View>
            <Checkbox
                value={isChecked}
                onValueChange={handleChecked}
                color={isChecked ? '#818181' : undefined}
            />
        </View>
    )
}

export default function LotteryListPage({ navigation }) {

    const {
        lotteries: data,
        loading,
        reload,
        finalize,
        buyLottery,
        addBuyLottery,
        removeBuyLottery
    } = useContext(lotteryContext)

    const [refreshing, setRefreshing] = useState(true)


    function handleRefresh() {
        reload()
    }

    useEffect(() => {
        if (finalize) {
            setRefreshing(false)
        }
    }, [loading, finalize])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>LOTERIAS</Text>
                <SearchInput />
                <FlatList
                    style={styles.container_list}
                    data={data}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }
                    renderItem={({ item: lot }) => (
                        <LottreyCard data={lot} addBuyLottery={addBuyLottery} removeBuyLottery={removeBuyLottery} />
                    )} />
                {
                    buyLottery.length ?
                        <CustomButton action={() => { navigation.navigate('ProcessSale') }} value='SIGUIENTE' />
                        :
                        null
                }

            </SafeAreaView>
        </>
    )
}