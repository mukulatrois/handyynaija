import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scale, fontSize, padding, borderRadius } from '../utils/responsive';
import CustomIcon, { IconNames } from './Icon';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

export default function Checkbox({
  label,
  checked,
  onPress,
  containerStyle,
  labelStyle,
}: CheckboxProps) {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <CustomIcon name={IconNames.checkmark} size={fontSize(12)} color="#fff" />}
      </View>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: borderRadius.sm,
    marginRight: padding.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3FA565',
    borderColor: '#3FA565',
  },
  label: {
    fontSize: fontSize(14),
    color: '#000',
  },
});
