import * as React from 'react'
import {ActivityIndicator} from 'react-native-paper'
import {theme} from './theme'
import {StyleSheet, View} from 'react-native'

const Loader = () => (
  <View style={styles.container}>

  <ActivityIndicator
    // style={styles.container}
    animating={true}
    size={'large'}
    color={theme.colors.primary}
    />
    </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 280,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
})

export default Loader
