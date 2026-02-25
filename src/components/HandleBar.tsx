import React from 'react';
import { View, StyleSheet } from 'react-native';
import { scale, borderRadius } from '../utils/responsive';

export default function HandleBar() {
  return <View style={styles.handle} />;
}

const styles = StyleSheet.create({
  handle: {
    width: scale(40),
    height: scale(4),
    backgroundColor: '#D1D1D1',
    borderRadius: borderRadius.sm,
    alignSelf: 'center',
    marginBottom: scale(20),
  },
});
