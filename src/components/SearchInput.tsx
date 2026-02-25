import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { padding, borderRadius } from '../utils/responsive';
import CustomIcon, { IconNames } from './Icon';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: object;
}

export default function SearchInput({
  placeholder = 'Street name and number...',
  value,
  onChangeText,
  style,
}: SearchInputProps) {
  return (
    <View style={[styles.container, style]}>
      <CustomIcon name={IconNames.search} size={22} color="#777" />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#777"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#999',
    borderRadius: 14,
    paddingHorizontal: padding.lg,
    height: 60,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
});
