import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { fontSize, padding, borderRadius } from '../utils/responsive';

export type ButtonVariant = 'primary' | 'secondary' | 'apple' | 'facebook' | 'google';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: padding.lg,
    paddingHorizontal: padding.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#3FA565',
  },
  secondary: {
    backgroundColor: '#18375F',
  },
  apple: {
    backgroundColor: '#000',
  },
  facebook: {
    backgroundColor: '#1877F2',
  },
  google: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  text: {
    fontSize: fontSize(16),
    fontWeight: 'bold',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#fff',
  },
  appleText: {
    color: '#fff',
  },
  facebookText: {
    color: '#fff',
  },
  googleText: {
    color: '#000',
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});
