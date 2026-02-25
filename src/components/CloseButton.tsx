import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { scale, fontSize, borderRadius } from '../utils/responsive';
import CustomIcon, { IconNames } from './Icon';

interface CloseButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

export default function CloseButton({ onPress, style }: CloseButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <CustomIcon name={IconNames.close} size={fontSize(18)} color="#000" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: scale(32),
    height: scale(32),
    borderRadius: borderRadius.round,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
