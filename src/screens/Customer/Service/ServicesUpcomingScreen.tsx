import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { navigate } from '../../../navigation/navigationService';
import { scale, fontSize, padding, margin } from '../../../utils/responsive';
import { COLORS } from '../../../utils/constants';

const SPECS = [
  { icon: 'business-outline', text: 'Business Profile' },
  { icon: 'refresh-outline', text: '7 have repeated' },
  { icon: 'calendar-outline', text: 'Updated schedule' },
  { icon: 'cash-outline', text: 'Minimum charge ₦30' },
];

const UPCOMING_SERVICES = [
  { id: '1', name: 'Nicolas bond', serviceType: 'House Cleaning', price: '₦20.50', rating: 4.8, reviews: '4,323', serviceCount: '656' },
  { id: '2', name: 'Nicolas bond', serviceType: 'House Cleaning', price: '₦20.50', rating: 4.8, reviews: '4,323', serviceCount: '656' },
];

export default function ServicesUpcomingScreen() {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* <Text style={styles.sectionTitle}>Do you want to repeat?</Text> */}
      {UPCOMING_SERVICES.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.topRow}>
            <Image source={require('../../../Images/logo.png')} style={styles.avatar} />
            <View style={styles.content}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{item.name}</Text>
                <Ionicons name="shield-checkmark" size={scale(14)} color="#2DBE60" style={{ marginLeft: 4 }} />
              </View>
              <Text style={styles.serviceType}>{item.serviceType}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.perHour}> Per hour</Text>
                <View style={{ flex: 1 }} />
                <Text style={styles.serviceCount}>{item.serviceCount} Services</Text>
              </View>
              <View style={styles.ratingRow}>
                {[1, 2, 3, 4].map((_, i) => (
                  <FontAwesome key={i} name="star" size={scale(12)} color="#FFA500" />
                ))}
                <FontAwesome name="star-o" size={scale(12)} color="#ccc" />
                <Text style={styles.reviewText}> {item.rating} | {item.reviews} Reviews</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.heartBtn}>
              <Feather name="heart" size={scale(22)} color="#2DBE60" />
            </TouchableOpacity>
          </View>
          <View style={styles.chipsRow}>
            {SPECS.map((s, i) => (
              <View key={i} style={styles.chip}>
                <Ionicons name={s.icon as any} size={scale(14)} color="#777" />
                <Text style={styles.chipText}>{s.text}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.viewDetailsBtn}
            onPress={() => navigate('ServiceBookingDetail', { bookingId: item.id })}
            activeOpacity={0.7}
          >
            <Text style={styles.viewDetailsText}>View details</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={{ height: margin.xxxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { padding: padding.lg },
  sectionTitle: {
    fontSize: fontSize(20),
    fontWeight: '700',
    color: COLORS.PRIMARY,
    marginBottom: margin.lg,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: padding.lg,
    marginBottom: margin.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  topRow: { flexDirection: 'row' },
  avatar: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    marginRight: padding.md,
  },
  content: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: fontSize(16), fontWeight: '700', color: '#222' },
  serviceType: { fontSize: fontSize(14), color: '#333', marginTop: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  price: { fontSize: fontSize(15), fontWeight: '700', color: COLORS.PRIMARY },
  perHour: { fontSize: fontSize(12), color: '#666' },
  serviceCount: { fontSize: fontSize(12), color: '#666' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  reviewText: { fontSize: fontSize(12), color: '#666', marginLeft: 4 },
  heartBtn: { position: 'absolute', top: 0, right: 0 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: scale(8), marginTop: margin.md },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
    borderRadius: 20,
  },
  chipText: { fontSize: fontSize(11), color: '#555', marginLeft: 4 },
  viewDetailsBtn: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 12,
    paddingVertical: scale(14),
    alignItems: 'center',
    marginTop: margin.md,
  },
  viewDetailsText: { fontSize: fontSize(16), fontWeight: '600', color: '#fff' },
});
