import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale, fontSize, padding, margin } from '../../../utils/responsive';

const CANCELED_SERVICES = [
  { id: '1', serviceType: 'Cleaning', name: 'Nicolas bond', date: 'Thursday, 9 Oct. 2025', time: '10:00 AM' },
  { id: '2', serviceType: 'Cleaning', name: 'Nicolas bond', date: 'Thursday, 9 Oct. 2025', time: '10:00 AM' },
  { id: '3', serviceType: 'Handyman', name: 'Nicolas ban', date: 'Thursday, 9 Oct. 2025', time: '10:00 AM' },
];

export default function ServicesCanceledScreen() {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {CANCELED_SERVICES.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.topRow}>
            <Image source={require('../../../Images/logo.png')} style={styles.avatar} />
            <View style={styles.content}>
              <Text style={styles.serviceType}>{item.serviceType}</Text>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{item.name}</Text>
                <Ionicons name="shield-checkmark" size={scale(14)} color="#2DBE60" style={{ marginLeft: 4 }} />
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="calendar-outline" size={scale(14)} color="#666" />
                <Text style={styles.infoText}>{item.date}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="time-outline" size={scale(14)} color="#666" />
                <Text style={styles.infoText}>{item.time}</Text>
              </View>
            </View>
          </View>
          <View style={styles.declinedBtn}>
            <Text style={styles.declinedBtnText}>Request declined</Text>
          </View>
        </View>
      ))}
      <View style={{ height: margin.xxxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { padding: padding.lg },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: padding.lg,
    marginBottom: margin.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: { flexDirection: 'row' },
  avatar: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    marginRight: padding.md,
  },
  content: { flex: 1 },
  serviceType: { fontSize: fontSize(16), fontWeight: '700', color: '#000' },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  name: { fontSize: fontSize(14), color: '#333' },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  infoText: { fontSize: fontSize(13), color: '#666', marginLeft: 6 },
  declinedBtn: {
    backgroundColor: '#E53935',
    borderRadius: 12,
    paddingVertical: scale(14),
    alignItems: 'center',
    marginTop: margin.md,
  },
  declinedBtnText: { fontSize: fontSize(16), fontWeight: '600', color: '#fff' },
});
