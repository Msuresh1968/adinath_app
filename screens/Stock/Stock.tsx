import React, { useEffect, useState } from 'react'
import Background from '../../components/Background'
import { View, StyleSheet, FlatList } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import Button from '../../components/Button'
import CommonCard from '../../components/ComanCard'
import api from '../../services/api'
import Loader from '../../components/Loader'

const Stock = () => {
  const [stockData, setStockData] = useState([])
  const [load, setLoad] = useState(false)
  const data = {
    vender: 'adinath_app',
    token: 'Dd6CPVNjSP5#b3X',
  }

  const handleSubmit = async () => {
    setLoad(true)
    const responce = await api.post('adinathApp', data)
    setStockData(responce.data.StoneList)
    setLoad(false)
  }

  return (
    <Background>
      <View style={styles.container}>
        <Button mode='contained' onPress={handleSubmit}>
          Load
        </Button>
      </View>

      {load == true ? <Loader /> : ''}

      <FlatList
        data={stockData}
        // keyExtractor={(item) => item?.STOCK}
        renderItem={({item}:any) => (
          <CommonCard>
            <View style={styles.columnContainer}>
              <View style={styles.column}>
                <Text> {item.STOCK} </Text>
                <Text> </Text>
                <Text> {item.SHAPE}</Text>
              </View>
              <View style={styles.column}>
                <Text>
                  {item.WEIGHT} {item.COLOR} {item.CLARITY}
                </Text>
                <Text>FIN:{item.CUT} {item.POLISH} {item.SYM}</Text>
                <Text>FLO:{item.FLOLNT}</Text>
                <Text>{item.LAB}</Text>
              </View>
              <View style={styles.column}>
              <Text>{item.MEASUREMENT?.replace(/\s+/g, '')}</Text>
                <Text>TABLE(%):{item['TABLE %']}</Text>
                <Text>DEPTH(%):{item['DEPTH %']}</Text>
                <Text>RATIO:{item.RATIO}</Text>
              </View>
              <View style={styles.column}>
                <Text>Rap: {item.RAP}</Text>
                <Text>{item.DISCOUNT}</Text>
                <Text>{item.PPC}</Text>
                <Text>{item.AMT}</Text>
              </View>
            </View>
          </CommonCard>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No data available
          </Text>
        }
        contentContainerStyle={styles.listContainer}
        keyboardShouldPersistTaps='handled'
      />
    </Background>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginVertical: 10,
  },
  listContainer: {
    padding: 16,
    flexGrow: 1, // ensures list takes full space for empty state
  },
  columnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Even spacing between items
    alignItems: 'center',
    // padding: 10,
    flexWrap: 'wrap', // Ensures responsiveness
    marginTop: 10,
  },
  column: {
    flex: 1, // Equal width for both dropdowns
    marginHorizontal: 1, // Adds spacing between columns
  },
})

export default Stock
