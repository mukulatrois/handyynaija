import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { scale, fontSize, padding } from '../utils/responsive';
import CustomIcon, { IconNames } from './Icon';

interface SettingsRowProps {
  title: string;
  icon: string;
  onPress?: () => void;
}

export default function SettingsRow({ title, icon, onPress }: SettingsRowProps) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.rowLeft}>
        <View style={styles.iconBox}>
          <CustomIcon name={icon} size={scale(18)} color="#3FA565" />
        </View>
        <Text style={styles.rowText}>{title}</Text>
      </View>
      <CustomIcon name={IconNames.arrowForward} size={scale(18)} color="#999" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    padding: padding.lg,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(8),
    backgroundColor: '#E8F5EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: padding.md,
  },
  rowText: {
    fontSize: fontSize(16),
    color: '#000',
  },
});
