import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { fontSize, padding } from '../utils/responsive';
import CustomIcon, { IconNames } from './Icon';

interface ScreenHeaderProps {
  title: string;
  titleColor?: string;
  titleStyle?: TextStyle;
  showBack?: boolean;
  onBackPress?: () => void;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  backgroundColor?: string;
  borderBottomColor?: string;
  style?: ViewStyle;
}

export default function ScreenHeader({
  title,
  titleColor = '#3FA565',
  titleStyle,
  showBack = false,
  onBackPress,
  rightElement,
  leftElement,
  backgroundColor = '#FFFFFF',
  borderBottomColor = '#F0F0F0',
  style,
}: ScreenHeaderProps) {
  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor,
          borderBottomColor,
        },
        style,
      ]}
    >
      {leftElement ?? (showBack && onBackPress ? (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton} activeOpacity={0.7}>
          <CustomIcon name={IconNames.arrowBack} size={fontSize(24)} color="#000" />
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      ))}
      <Text style={[styles.title, { color: titleColor }, titleStyle]} numberOfLines={1}>
        {title}
      </Text>
      {rightElement !== undefined ? rightElement : <View style={styles.spacer} />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: padding.xl,
    paddingVertical: padding.lg,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: padding.xs,
    marginRight: padding.sm,
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: 'bold',
    flex: 1,
    marginHorizontal: padding.sm,
  },
  spacer: {
    width: fontSize(24) + padding.xs * 2,
  },
});
