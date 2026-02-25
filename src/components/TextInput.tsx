import React from 'react';
import { View, Text, TextInput as RNTextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { fontSize, padding, margin, borderRadius } from '../utils/responsive';

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

export default function TextInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  containerStyle,
  inputStyle,
}: TextInputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: margin.xl,
  },
  label: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: '#000',
    marginBottom: padding.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: borderRadius.lg,
    padding: padding.lg,
    fontSize: fontSize(16),
    backgroundColor: '#fff',
  },
});
