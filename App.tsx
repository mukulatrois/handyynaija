import { LogBox, StyleSheet, View } from 'react-native'
import React from 'react'
import StackNavigator from './src/navigation/Stack'
LogBox.ignoreAllLogs

const App = () => {
  return (
    <View style={{ flex: 1 }}>
     <StackNavigator/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})
