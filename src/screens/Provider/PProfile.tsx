import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { navigate } from '../../navigation/navigationService';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontSize, padding, margin, borderRadius, scale } from '../../utils/responsive';
import { colors } from '../../theme/colors';

interface MenuItemProps {
  icon: string;
  text: string;
  onPress?: () => void;
  iconColor?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  text,
  onPress,
  iconColor = '#3FA565',
}) => {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
        <Icon name={icon} size={scale(20)} color={iconColor} />
      </View>
      <Text style={styles.menuItemText}>{text}</Text>
      <Icon name="chevron-forward" size={scale(20)} color="#666" />
    </TouchableOpacity>
  );
};

const SectionHeader: React.FC<{ title: string }> = ({ title }) => {
  return <Text style={styles.sectionHeader}>{title}</Text>;
};

export default function PProfile() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Paschaloliver</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigate('PersonalDetails')}
            >
              <Text style={styles.viewProfileLink}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SHARE AND EARN MONEY! Section */}
        <SectionHeader title="SHARE AND EARN MONEY!" />
        <MenuItem
          icon="gift-outline"
          text="₦ 10 for every friend you bring"
          iconColor="#DC2626"
        />
        <View style={styles.separator} />

        {/* Your Account Section */}
        <SectionHeader title="Your Account" />
        <MenuItem
          icon="person-outline"
          text="Personal details"
          onPress={() => navigate('PersonalDetails')}
        />
        <View style={styles.separator} />
        <MenuItem
          icon="cash-outline"
          text="My Balance"
          onPress={() => navigate('MyBalance')}
        />
        <View style={styles.separator} />
        <MenuItem icon="wallet-outline" text="Booking Preference" />
        <View style={styles.separator} />
        <MenuItem
          icon="lock-closed-outline"
          text="Change password"
          onPress={() => navigate('ChangePassword')}
        />
        <View style={styles.separator} />
        <MenuItem icon="globe-outline" text="Language" />
        <View style={styles.separator} />

        {/* So you want to offer services? Section */}
        <SectionHeader title="So you want to offer services?" />
        <MenuItem icon="swap-horizontal-outline" text="Switch to Client version" />
        <View style={styles.separator} />

        {/* Do you like the app? Section */}
        <SectionHeader title="Do you like the app?" />
        <MenuItem icon="star-outline" text="Will you give us 5 stars?😊" />
        <View style={styles.separator} />
        <MenuItem icon="share-social-outline" text="Share the HandyNaija App" />
        <View style={styles.separator} />

        {/* SUPPORT CENTRE Section */}
        <SectionHeader title="SUPPORT CENTRE" />
        <MenuItem icon="headset-outline" text="Help" />
        <View style={styles.separator} />
        <MenuItem icon="bulb-outline" text="How can we improve?" />
        <View style={styles.separator} />
        <MenuItem icon="help-circle-outline" text="About HandyNaija App" />
        <View style={styles.separator} />
        <MenuItem icon="shield-checkmark-outline" text="Privacy policy" />
        <View style={styles.separator} />
        <MenuItem icon="document-text-outline" text="Terms & Conditions" />
        <View style={styles.separator} />
        <MenuItem icon="log-out-outline" text="Log out" />
        <View style={styles.separator} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: margin.xxxl,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.xl,
    paddingVertical: padding.xxl,
    backgroundColor: colors.white,
    marginBottom: margin.md,
  },
  avatarContainer: {
    marginRight: padding.lg,
  },
  avatar: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: colors.borderLight,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: fontSize(20),
    fontWeight: '600',
    color: colors.text,
    marginBottom: padding.xs,
  },
  viewProfileLink: {
    fontSize: fontSize(14),
    color: '#3FA565',
    fontWeight: '500',
  },
  sectionHeader: {
    fontSize: fontSize(12),
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    paddingHorizontal: padding.xl,
    paddingTop: padding.lg,
    paddingBottom: padding.sm,
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.xl,
    paddingVertical: padding.lg,
    backgroundColor: colors.white,
  },
  iconContainer: {
    width: scale(36),
    height: scale(36),
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: padding.md,
  },
  menuItemText: {
    flex: 1,
    fontSize: fontSize(16),
    color: colors.text,
    fontWeight: '400',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginLeft: padding.xl,
  },
});