import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ServiceScreenHeader from './ServiceScreenHeader';
import TopServiceTab from '../../../navigation/TopSericeTab';

export default function ServicesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ServiceScreenHeader title="Services" titleColor="#3FA565" />
      <View style={styles.tabs}>
        <TopServiceTab />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  tabs: {
    flex: 1,
  },
});
