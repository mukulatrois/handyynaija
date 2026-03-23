import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomIcon from '../../../components/Icon';
import { goBack } from '../../../navigation/navigationService';
import { scale, fontSize, padding } from '../../../utils/responsive';
import { COLORS } from '../../../utils/constants';

interface Booking {
  id: string;
  serviceName: string;
  paidDate: string;
  serviceDate: string;
  amount: string;
  avatarUri: string;
  serviceIcon: string;
  requestNotAccepted?: boolean;
}

const BOOKINGS_BY_MONTH: { month: string; bookings: Booking[] }[] = [
  {
    month: 'November 2025',
    bookings: [
      {
        id: '1',
        serviceName: 'Cleaning-YERXON',
        paidDate: '08/10',
        serviceDate: '09/10',
        amount: '₦30.5',
        avatarUri: 'https://i.pravatar.cc/100?img=12',
        serviceIcon: 'sparkles',
      },
    ],
  },
  {
    month: 'October 2025',
    bookings: [
      {
        id: '2',
        serviceName: 'Cleaning-YERXON',
        paidDate: '08/10',
        serviceDate: '09/10',
        amount: '₦30.5',
        avatarUri: 'https://i.pravatar.cc/100?img=12',
        serviceIcon: 'sparkles',
      },
      {
        id: '3',
        serviceName: 'Cleaning-YERXON',
        paidDate: '08/10',
        serviceDate: '09/10',
        amount: '₦30.5',
        avatarUri: 'https://i.pravatar.cc/100?img=12',
        serviceIcon: 'sparkles',
      },
      {
        id: '4',
        serviceName: 'Cleaning-YERXON',
        paidDate: '08/10',
        serviceDate: '09/10',
        amount: '₦30.5',
        avatarUri: 'https://i.pravatar.cc/100?img=12',
        serviceIcon: 'sparkles',
        requestNotAccepted: true,
      },
      {
        id: '5',
        serviceName: 'Cleaning-YERXON',
        paidDate: '08/10',
        serviceDate: '09/10',
        amount: '₦30.5',
        avatarUri: 'https://i.pravatar.cc/100?img=12',
        serviceIcon: 'sparkles',
      },
    ],
  },
];

function BookingItem({ booking }: { booking: Booking }) {
  return (
    <TouchableOpacity style={styles.bookingRow} activeOpacity={0.7}>
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: booking.avatarUri }} style={styles.avatar} />
        <View style={styles.serviceIconOverlay}>
          <CustomIcon
            name={booking.serviceIcon}
            size={scale(14)}
            color="#fff"
          />
        </View>
      </View>
      <View style={styles.bookingInfo}>
        <Text style={styles.serviceName}>{booking.serviceName}</Text>
        <Text style={styles.dateText}>Paid on {booking.paidDate}</Text>
        <Text style={styles.dateText}>Service date: {booking.serviceDate}</Text>
        {booking.requestNotAccepted && (
          <Text style={styles.requestNotAccepted}>Request not accepted</Text>
        )}
      </View>
      <Text style={styles.amount}>{booking.amount}</Text>
    </TouchableOpacity>
  );
}

export default function MyBookingsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.headerLeft}>
          <CustomIcon name="arrow-back" size={scale(24)} color={COLORS.PRIMARY} />
          <Text style={styles.headerTitle}>MY Bookings</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {BOOKINGS_BY_MONTH.map((section) => (
          <View key={section.month} style={styles.monthSection}>
            <Text style={styles.monthHeader}>{section.month}</Text>
            {section.bookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </View>
        ))}
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
    textTransform: 'uppercase',
  },
  scrollContent: {
    padding: padding.lg,
  },
  monthSection: {
    marginBottom: scale(24),
  },
  monthHeader: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: '#000',
    marginBottom: scale(12),
  },
  bookingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(14),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: scale(14),
  },
  avatar: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
  },
  serviceIconOverlay: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: '#3FA565',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: fontSize(16),
    fontWeight: '700',
    color: '#000',
    marginBottom: scale(4),
  },
  dateText: {
    fontSize: fontSize(13),
    color: '#333',
    marginBottom: scale(2),
  },
  requestNotAccepted: {
    fontSize: fontSize(13),
    color: '#E53935',
    marginTop: scale(4),
  },
  amount: {
    fontSize: fontSize(16),
    fontWeight: '700',
    color: '#3FA565',
  },
});
