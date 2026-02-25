import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSize, margin } from '../utils/responsive';

interface SeparatorProps {
  text?: string;
}

export default function Separator({ text = 'or' }: SeparatorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      {text && <Text style={styles.text}>{text}</Text>}
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: margin.xl,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  text: {
    marginHorizontal: margin.md,
    color: '#666',
    fontSize: fontSize(14),
  },
});
