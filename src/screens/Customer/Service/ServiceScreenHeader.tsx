import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { goBack } from '../../../navigation/navigationService';
import { scale, fontSize, padding } from '../../../utils/responsive';
import CustomIcon, { IconNames } from '../../../components/Icon';

export interface ServiceScreenHeaderProps {
  title: string;
  titleColor?: string;
  titleStyle?: TextStyle;
  showBack?: boolean;
  onBackPress?: () => void;
  backLabel?: string;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  subtitle?: string;
  subtitleElement?: React.ReactNode;
  backgroundColor?: string;
  borderBottomColor?: string;
  style?: ViewStyle;
}

export default function ServiceScreenHeader({
  title,
  titleColor = '#000',
  titleStyle,
  showBack = false,
  onBackPress = goBack,
  backLabel,
  rightElement,
  leftElement,
  subtitle,
  subtitleElement,
  backgroundColor = '#fff',
  borderBottomColor = '#E8E8E8',
  style,
}: ServiceScreenHeaderProps) {
  return (
    <View
      style={[
        styles.header,
        { backgroundColor, borderBottomColor },
        style,
      ]}
    >
      {leftElement ?? (showBack ? (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton} activeOpacity={0.7}>
          <CustomIcon name={IconNames.arrowBack} size={scale(24)} color="#3FA565" />
          {backLabel ? <Text style={styles.backLabel}>{backLabel}</Text> : null}
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      ))}
      <View style={styles.titleBlock}>
        <Text style={[styles.title, { color: titleColor }, titleStyle]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
        ) : subtitleElement ?? null}
      </View>
      {rightElement !== undefined ? rightElement : <View style={styles.spacer} />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.lg,
    paddingVertical: scale(12),
    borderBottomWidth: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(8),
  },
  backLabel: {
    fontSize: fontSize(16),
    color: '#000',
    marginLeft: scale(4),
  },
  titleBlock: {
    flex: 1,
    justifyContent: 'center',
    minWidth: 0,
  },
  title: {
    fontSize: fontSize(18),
    fontWeight: '700',
  },
  subtitle: {
    fontSize: fontSize(12),
    color: '#666',
    marginTop: scale(2),
  },
  spacer: {
    width: scale(40),
  },
});
