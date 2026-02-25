import React, { useState } from 'react';
import { View, Text, TextInput as RNTextInput, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { fontSize, padding, margin, borderRadius } from '../utils/responsive';
import Icon from 'react-native-vector-icons/FontAwesome';


interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

export default function PasswordInput({
  label,
  placeholder,
  value,
  onChangeText,
  containerStyle,
  inputStyle,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.passwordContainer}>
        <RNTextInput
          style={[styles.passwordInput, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon
  name={showPassword ? 'eye' : 'eye-slash'}
  size={20}
  color="#666"
/>

        </TouchableOpacity>
      </View>
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: borderRadius.lg,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    padding: padding.lg,
    fontSize: fontSize(16),
  },
  eyeIcon: {
    padding: padding.lg,
  },
  eyeIconText: {
    fontSize: fontSize(20),
  },
});
