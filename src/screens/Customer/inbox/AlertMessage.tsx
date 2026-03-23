import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { scale, fontSize, padding, margin, borderRadius } from '../../../utils/responsive';
import CustomIcon, { IconNames } from '../../../components/Icon';

interface Alert {
  id: string;
  icon: string;
  title: string;
  description: string;
  date: string;
}

export default function AlertMessageScreen() {
  const [alerts] = useState<Alert[]>([
    { id: '1', icon: '⭐', title: 'YERXON has left you a review', description: 'Check it out on your profile.', date: 'Thursday' },
    { id: '2', icon: '⭐', title: 'Rate your service with YEROXON', description: 'Let us know how your Cleaning service...', date: 'Wednesday' },
    { id: '3', icon: '📅', title: 'Your service is about to begin', description: 'Just a reminder: in 2 hours...', date: 'Tuesday' },
    { id: '4', icon: '✅', title: 'Booking request confirmed', description: 'Congratulations! YEROXON has confirmed...', date: 'Monday' },
  ]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.alertsList}>
        {alerts.map(alert => (
          <TouchableOpacity key={alert.id} style={styles.alertCard}>
            <View style={styles.alertLeft}>
              {alert.icon === '⭐' && <CustomIcon name={IconNames.star} size={fontSize(20)} color="#FFD700" />}
              {alert.icon === '📅' && <CustomIcon name={IconNames.calendar} size={fontSize(20)} color="#666" />}
              {alert.icon === '✅' && <CustomIcon name={IconNames.checkmark} size={fontSize(20)} color={COLORS.PRIMARY} />}
              <View style={styles.alertInfo}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertDescription}>{alert.description}</Text>
              </View>
            </View>
            <View style={styles.alertRight}>
              <Text style={styles.alertDate}>{alert.date}</Text>
              <CustomIcon name={IconNames.arrowForward} size={fontSize(16)} color="#999" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: margin.xxxl },
  alertsList: { padding: padding.xl },
  alertCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingVertical: padding.md, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  alertLeft: { flexDirection: 'row', flex: 1 },
  alertInfo: { flex: 1 },
  alertTitle: { fontSize: fontSize(16), fontWeight: '600', color: '#000', marginBottom: scale(4) },
  alertDescription: { fontSize: fontSize(14), color: '#666' },
  alertRight: { alignItems: 'flex-end' },
  alertDate: { fontSize: fontSize(12), color: '#999', marginBottom: scale(4) },
});
