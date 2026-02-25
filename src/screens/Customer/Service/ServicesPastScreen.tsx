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
import { navigate } from '../../../navigation/navigationService';
import { scale, fontSize, padding, margin } from '../../../utils/responsive';

const PAST_SERVICES = [
  { id: '1', serviceType: 'Cleaning', name: 'Nicolas bond', date: 'Thursday, 9 Oct. 2025', time: '10:00 AM' },
  { id: '2', serviceType: 'Cleaning', name: 'Nicolas bond', date: 'Thursday, 9 Oct. 2025', time: '10:00 AM' },
  { id: '3', serviceType: 'Handyman', name: 'Nicolas ban', date: 'Thursday, 9 Oct. 2025', time: '10:00 AM' },
];

export default function ServicesPastScreen() {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sectionTitle}>Do you want to repeat?</Text>
      {PAST_SERVICES.map((item) => (
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
          <TouchableOpacity
            style={styles.repeatBtn}
            onPress={() => navigate('FindProfessionals' as any)}
            activeOpacity={0.7}
          >
            <Ionicons name="refresh" size={scale(20)} color="#fff" />
            <Text style={styles.repeatBtnText}>Repeat</Text>
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
    color: '#3FA565',
    marginBottom: margin.lg,
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: padding.lg,
    marginBottom: margin.lg,
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
  repeatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3FA565',
    borderRadius: 12,
    paddingVertical: scale(14),
    marginTop: margin.md,
    gap: scale(8),
  },
  repeatBtnText: { fontSize: fontSize(16), fontWeight: '600', color: '#fff' },
});
