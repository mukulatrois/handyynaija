import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../theme/colors';
import { scale } from '../utils/responsive';

interface CommonAppHeaderProps {
  logoSource?: ImageSourcePropType;
  containerStyle?: StyleProp<ViewStyle>;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
  showSearch?: boolean;
  showNotification?: boolean;
  showNotificationDot?: boolean;
}

export default function CommonAppHeader({
  logoSource = require('../Images/logo2.png'),
  containerStyle,
  onSearchPress,
  onNotificationPress,
  showSearch = true,
  showNotification = true,
  showNotificationDot = false,
}: CommonAppHeaderProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={logoSource} style={styles.logo} resizeMode="contain" />

      <View style={styles.rightActions}>
        {showSearch && (
          <TouchableOpacity
            style={styles.iconButton}
            activeOpacity={0.7}
            onPress={onSearchPress}
            disabled={!onSearchPress}
          >
            <Ionicons name="search-outline" size={scale(20)} color={colors.text} />
          </TouchableOpacity>
        )}

        {showNotification && (
          <TouchableOpacity
            style={styles.iconButton}
            activeOpacity={0.7}
            onPress={onNotificationPress}
            disabled={!onNotificationPress}
          >
            <Ionicons name="notifications-outline" size={scale(20)} color={colors.text} />
            {showNotificationDot ? <View style={styles.notificationDot} /> : null}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
  },
  logo: {
    width: scale(96),
    height: scale(24),
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  iconButton: {
    width: scale(34),
    height: scale(34),
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: scale(8),
    right: scale(7),
    width: scale(7),
    height: scale(7),
    borderRadius: scale(4),
    backgroundColor: '#FF3B30',
  },
});
