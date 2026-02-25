import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { fontSize, margin } from '../utils/responsive';

interface FooterLinkProps {
  text: string;
  linkText: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
}

export default function FooterLink({
  text,
  linkText,
  onPress,
  containerStyle,
}: FooterLinkProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.text}>{text} </Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.link}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: margin.xxl,
    marginBottom: margin.xl,
  },
  text: {
    fontSize: fontSize(14),
    color: '#666',
  },
  link: {
    fontSize: fontSize(14),
    color: '#3FA565',
    fontWeight: '600',
  },
});
