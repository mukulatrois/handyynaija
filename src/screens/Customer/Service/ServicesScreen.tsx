import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ServiceScreenHeader from './ServiceScreenHeader';
import TopServiceTab from '../../../navigation/TopSericeTab';
import { COLORS } from '../../../utils/constants';
import { fontSize } from '../../../utils/responsive';
import { CommonAppHeader } from '../../../components';

export default function ServicesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
       <CommonAppHeader />
      <ServiceScreenHeader title="Services" titleColor={COLORS.PRIMARY} titleStyle={{fontSize:fontSize(24)}} />
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
