import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { goBack } from '../../../navigation/navigationService';
import { scale, fontSize, padding, margin } from '../../../utils/responsive';
import { Button } from '../../../components';
import CustomIcon, { IconNames } from '../../../components/Icon';
import ServiceScreenHeader from './ServiceScreenHeader';

type ProfessionalProfileRouteProp = RouteProp<{ params: { categoryId?: string } }, 'params'>;

const specifications = [
  { icon: 'business-outline', text: 'Business Profile' },
  { icon: 'refresh-outline', text: '7 have repeated' },
  { icon: 'calendar-outline', text: 'Updated schedule' },
  { icon: 'cash-outline', text: 'Minimum charge ₦30' },
  { icon: 'time-outline', text: 'Available 24/7' },
  { icon: 'shield-checkmark-outline', text: 'Verified Professional' },
];

export default function ProfessionalProfileScreen() {
  const route = useRoute<ProfessionalProfileRouteProp>();
  const [isFavorited, setIsFavorited] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ServiceScreenHeader
        title="Handyman"
        showBack
        onBackPress={goBack}
        backLabel="Profile"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Professional Card - matches FindProfessionals style */}
        <View style={styles.card}>
          {/* Top Section */}
          <View style={styles.topRow}>
            <Image
              source={require('../../../Images/logo.png')}
              style={styles.profile}
            />

            <View style={styles.cardContent}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>Nicolas bond</Text>
                <Ionicons
                  name="shield-checkmark"
                  size={scale(14)}
                  color="#2DBE60"
                  style={styles.verifyIcon}
                />
              </View>

              <Text style={styles.job}>Handyman</Text>

              <View style={styles.priceRow}>
                <Text style={styles.price}>₦20.50</Text>
                <Text style={styles.perHour}> Per hour</Text>
                <View style={{ flex: 1 }} />
                <Text style={styles.services}>656 Services</Text>
              </View>

              <View style={styles.ratingRow}>
                {[1, 2, 3, 4].map((_, i) => (
                  <FontAwesome
                    key={i}
                    name="star"
                    size={scale(12)}
                    color="#FFA500"
                  />
                ))}
                <FontAwesome name="star-o" size={scale(12)} color="#ccc" />
                <Text style={styles.reviewText}> 4.8 | 4,323 Reviews</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setIsFavorited(!isFavorited)}
              style={styles.heartIcon}
            >
              {isFavorited ? (
                <CustomIcon name={IconNames.heart} size={scale(22)} color="#2DBE60" />
              ) : (
                <CustomIcon name={IconNames.heartOutline} size={scale(22)} color="#2DBE60" />
              )}
            </TouchableOpacity>
          </View>

          {/* Specifications */}
          <View style={styles.specContainer}>
            {specifications.map((spec, index) => (
              <View key={index} style={styles.tag}>
                <Ionicons
                  name={spec.icon as any}
                  size={scale(16)}
                  color="#777"
                />
                <Text style={styles.tagText}>{spec.text}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          <View style={styles.imageRow}>
            {[1, 2, 3, 4].map((_, i) => (
              <Image
                key={i}
                source={require('../../../Images/logo.png')}
                style={styles.workImage}
              />
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Book Now"
            onPress={() => {}}
            variant="primary"
            style={{ flex: 1, marginRight: margin.md }}
          />
          <Button
            title="Message"
            onPress={() => {}}
            variant="secondary"
            style={{ flex: 1 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: padding.xl,
    paddingBottom: margin.xxxl,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: margin.lg,
  },
  topRow: {
    flexDirection: 'row',
  },
  profile: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  cardContent: {
    flex: 1,
    marginLeft: 14,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: '700',
    fontSize: 17,
    color: '#222',
  },
  verifyIcon: {
    marginLeft: 4,
  },
  job: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    color: '#2DBE60',
    fontWeight: '700',
    fontSize: 16,
  },
  perHour: {
    fontSize: 12,
    color: '#666',
  },
  services: {
    fontSize: 12,
    color: '#666',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  reviewText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  heartIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  specContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 40,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 12,
    marginLeft: 6,
    color: '#555',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 14,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  workImage: {
    width: 70,
    height: 70,
    borderRadius: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: margin.md,
  },
});
