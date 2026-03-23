import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomIcon from '../../../components/Icon';
import { goBack, navigate } from '../../../navigation/navigationService';
import { scale, fontSize, padding } from '../../../utils/responsive';
import { COLORS } from '../../../utils/constants';

const MENU_ITEMS = [
  {
    id: 'bookings',
    title: 'My Bookings',
    icon: 'shield-checkmark-outline',
    onPress: () => navigate('MyBookings'),
  },
  {
    id: 'payments',
    title: 'Payments',
    icon: 'wallet-outline',
    onPress: () => {},
  },
  {
    id: 'invoices',
    title: 'Invoices',
    icon: 'document-text-outline',
    onPress: () => {},
  },
];

export default function PaymentsAndRefundsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.headerLeft}>
          <CustomIcon name="arrow-back" size={scale(24)} color={COLORS.PRIMARY} />
          <Text style={styles.headerTitle}>Payments and Refunds</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuRow,
                index < MENU_ITEMS.length - 1 && styles.menuRowBorder,
              ]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.iconBox}>
                <CustomIcon
                  name={item.icon}
                  size={scale(22)}
                  color={COLORS.PRIMARY}
                />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <CustomIcon name="chevron-forward" size={scale(20)} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: scale(40) }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.lg,
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  headerTitle: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: '#000',
  },
  scrollContent: {
    padding: padding.lg,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: scale(12),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: padding.lg,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconBox: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(10),
    backgroundColor: '#E8F5EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: padding.md,
  },
  menuTitle: {
    flex: 1,
    fontSize: fontSize(16),
    color: '#000',
  },
});
