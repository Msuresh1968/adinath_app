import React, { useEffect, useState } from 'react';
import Background from '../../components/Background';
import { View, StyleSheet, FlatList, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import Button from '../../components/Button';
import CommonCard from '../../components/ComanCard';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStockData } from '../../slice/stock.slice';
import { AppDispatch, RootState } from '../../store';
import Master from '../Master/Master';

const Stock = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const { stockListdata, loading, error } = useSelector(
    (state: RootState) => state.stock,
  );
  const data = {
    vender: 'adinath_app',
    token: 'Dd6CPVNjSP5#b3X',
  };

  const handleSubmit = async () => {
    await dispatch(fetchStockData({ data }));
  };
  {
    loading == 'pending' ? <Loader /> : '';
  }

  useEffect(() => {
      dispatch(fetchStockData({data}))
  },[])

  

  return (
    <Background>
       {loading == 'pending' ? <Loader /> : ''}
     <View style={styles.container}>
        {/* <Button mode="contained" onPress={handleSubmit}>
          Load
        </Button> */}

     

      <FlatList
        data={stockListdata}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CommonCard>
            <TouchableOpacity
              activeOpacity={0.8}
              // onPress={() => navigation.navigate('Stone', { stock: item })}
              onPress={() => {
                console.log('Pressed:', item.STOCK); // ✅ debug log
                navigation.navigate('Stone', { stock: item });
              }}
              >
              <View style={styles.columnContainer}>
                <View style={styles.column}>
                  <Text
                    style={styles.label}
                    onPress={() => {
                      console.log('Press');
                      navigation.navigate('Stone', { stock: item });
                    }}
                    >
                    {' '}
                    {item.STOCK}{' '}
                  </Text>
                  <Text> </Text>
                  <Text style={styles.label}> {item.SHAPE}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>
                    {item.WEIGHT} {item.COLOR} {item.CLARITY}
                  </Text>
                  <Text style={styles.label}>
                    FIN:{item.CUT} {item.POLISH} {item.SYM}
                  </Text>
                  <Text style={styles.label}>FLO:{item.FLOLNT}</Text>
                  <Text style={styles.label}>{item.LAB}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>
                    {item.MEASUREMENT?.replace(/\s+/g, '')}
                  </Text>
                  <Text style={styles.label}>TABLE(%):{item['TABLE %']}</Text>
                  <Text style={styles.label}>DEPTH(%):{item['DEPTH %']}</Text>
                  <Text style={styles.label}>RATIO:{item.RATIO}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>Rap: {item.RAP}</Text>
                  <Text style={styles.label}>{item.DISCOUNT}</Text>
                  <Text style={styles.label}>{item.PPC}</Text>
                  <Text style={styles.label}>{item.AMT}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </CommonCard>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No data available
          </Text>
        }
        contentContainerStyle={styles.listContainer}
        keyboardShouldPersistTaps="handled"
        />
        </View>
    </Background>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    padding: 0,
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
  label: {
    fontSize: 9,
  },
});

export default Stock;
