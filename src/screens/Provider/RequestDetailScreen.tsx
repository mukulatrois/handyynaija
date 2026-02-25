import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontSize, padding, margin, borderRadius, scale } from '../../utils/responsive';
import { colors } from '../../theme/colors';
import { goBack, navigate } from '../../navigation/navigationService';

interface RequestDetailParams {
  requestId: string;
  name?: string;
  avatar?: string;
  price?: string;
  date?: string;
  time?: string;
  services?: string;
  email?: string;
  phone?: string;
  location?: string;
}

export default function RequestDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RequestDetailParams;

  // Mock data - replace with actual data fetching based on requestId
  const requestData = {
    id: params?.requestId || '1',
    name: params?.name || 'Mr. Hamid',
    avatar: params?.avatar || '👨‍💼',
    price: params?.price || '$20',
    date: params?.date || '12 July 2025',
    time: params?.time || '10:00 AM - 11 AM',
    services: params?.services || 'Cleaner',
    email: params?.email || 'example@gmail.com',
    phone: params?.phone || '012562589663',
    location: params?.location || '13th Street, 47 W 13th St, New York, NY 10011',
    rating: '4.8',
    startLocation: { latitude: 40.7379, longitude: -73.9985 }, // Start point A
    endLocation: { latitude: 40.7358, longitude: -73.9915 }, // End point B
    duration: '15 min',
    distance: '1.1 Km',
    addresses: [
      'Road No. 6 Avenue - 05',
      'Moroccan university road',
    ],
  };

  const handleSendMessage = () => {
    // Navigate to chat conversation
    navigate('ChatConversation', { chatId: requestData.id });
  };

  const handleViewPaymentDetails = () => {
    // Navigate to payment details screen
    console.log('View payment details');
  };

  const handleCancel = () => {
    // Handle cancel action
    console.log('Cancel request');
    goBack();
  };

  const handleAccept = () => {
    // Handle accept action
    console.log('Accept request');
    goBack();
  };

  // Route coordinates for the polyline
  const routeCoordinates = [
    requestData.startLocation,
    requestData.endLocation,
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Icon name="arrow-back" size={scale(24)} color="#3FA565" />
        </TouchableOpacity>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Map Section */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: (requestData.startLocation.latitude + requestData.endLocation.latitude) / 2,
              longitude: (requestData.startLocation.longitude + requestData.endLocation.longitude) / 2,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {/* Start Marker (A) */}
            <Marker
              coordinate={requestData.startLocation}
              identifier="start"
            >
              <View style={styles.markerContainer}>
                <View style={[styles.markerCircle, styles.startMarker]}>
                  <Text style={styles.markerText}>A</Text>
                </View>
              </View>
            </Marker>

            {/* End Marker (B) */}
            <Marker
              coordinate={requestData.endLocation}
              identifier="end"
            >
              <View style={styles.markerContainer}>
                <View style={[styles.markerCircle, styles.endMarker]}>
                  <Text style={styles.markerText}>B</Text>
                </View>
              </View>
            </Marker>

            {/* Route Polyline */}
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#3FA565"
              strokeWidth={4}
            />
          </MapView>
        </View>

        {/* Client Information Section */}
        <View style={styles.clientSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{requestData.avatar}</Text>
          </View>
          <View style={styles.clientInfo}>
            <Text style={styles.clientName}>{requestData.name}</Text>
            <Text style={styles.clientRole}>Client</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{requestData.rating}</Text>
            <Icon name="star" size={scale(16)} color="#FFD700" />
          </View>
        </View>

        {/* Service Details Section */}
        <View style={styles.serviceCard}>
          <Text style={styles.serviceTitle}>Cleaning Service</Text>

          {/* Payment Details */}
          <TouchableOpacity
            style={styles.paymentRow}
            onPress={handleViewPaymentDetails}
            activeOpacity={0.7}
          >
            <View style={styles.paymentLeft}>
              <Icon name="receipt-outline" size={scale(20)} color="#3FA565" />
              <Text style={styles.paymentText}>View payment details</Text>
            </View>
            <Icon name="chevron-forward" size={scale(20)} color={colors.textSecondary} />
          </TouchableOpacity>

          {/* Addresses */}
          <View style={styles.addressesContainer}>
            <View style={styles.addressRow}>
              <View style={[styles.addressBullet, styles.blueBullet]} />
              <Text style={styles.addressText}>{requestData.addresses[0]}</Text>
            </View>
            <View style={styles.addressRow}>
              <View style={[styles.addressBullet, styles.greenBullet]} />
              <Text style={styles.addressText}>{requestData.addresses[1]}</Text>
            </View>
          </View>

          {/* Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Icon name="calendar-outline" size={scale(18)} color={colors.textSecondary} />
              <Text style={styles.detailText}>Date: {requestData.date}</Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="time-outline" size={scale(18)} color={colors.textSecondary} />
              <Text style={styles.detailText}>Time: {requestData.time}</Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="construct-outline" size={scale(18)} color={colors.textSecondary} />
              <Text style={styles.detailText}>Services: {requestData.services}</Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="mail-outline" size={scale(18)} color={colors.textSecondary} />
              <Text style={styles.detailText}>Email: {requestData.email}</Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="call-outline" size={scale(18)} color={colors.textSecondary} />
              <Text style={styles.detailText}>Phone: {requestData.phone}</Text>
            </View>
          </View>
        </View>

        {/* Duration and Distance Pills */}
        <View style={styles.pillsContainer}>
          <View style={styles.pill}>
            <Icon name="time-outline" size={scale(20)} color="#3FA565" />
            <View style={styles.pillContent}>
              <Text style={styles.pillLabel}>Duration</Text>
              <Text style={styles.pillValue}>{requestData.duration}</Text>
            </View>
          </View>

          <View style={styles.pill}>
            <Icon name="location-outline" size={scale(20)} color="#3FA565" />
            <View style={styles.pillContent}>
              <Text style={styles.pillLabel}>Distance</Text>
              <Text style={styles.pillValue}>{requestData.distance}</Text>
            </View>
          </View>
        </View>

        {/* Send Message Button */}
        <TouchableOpacity
          style={styles.sendMessageButton}
          onPress={handleSendMessage}
          activeOpacity={0.7}
        >
          <Icon name="chatbubble-outline" size={scale(18)} color={colors.text} />
          <Text style={styles.sendMessageText}>Send message</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}
          activeOpacity={0.7}
        >
          <Icon name="close" size={scale(20)} color={colors.white} />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.acceptButton}
          onPress={handleAccept}
          activeOpacity={0.7}
        >
          <Icon name="checkmark" size={scale(20)} color={colors.white} />
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
    backgroundColor: colors.background,
  },
  backButton: {
    padding: padding.xs,
  },
  headerSpacer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: margin.xxxl + 80, // Space for bottom buttons
  },
  mapContainer: {
    height: scale(200),
    marginHorizontal: padding.lg,
    marginBottom: margin.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerCircle: {
    width: scale(32),
    height: scale(32),
    borderRadius: borderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  startMarker: {
    backgroundColor: '#87CEEB', // Light blue
  },
  endMarker: {
    backgroundColor: '#3FA565', // Green
  },
  markerText: {
    fontSize: fontSize(14),
    fontWeight: 'bold',
    color: colors.white,
  },
  clientSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
    marginBottom: margin.md,
  },
  avatarContainer: {
    width: scale(60),
    height: scale(60),
    borderRadius: borderRadius.round,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: margin.md,
    borderWidth: 2,
    borderColor: colors.border,
  },
  avatar: {
    fontSize: fontSize(28),
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: fontSize(18),
    fontWeight: '600',
    color: colors.text,
    marginBottom: margin.xs,
  },
  clientRole: {
    fontSize: fontSize(14),
    color: colors.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: margin.xs,
  },
  rating: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.text,
  },
  serviceCard: {
    backgroundColor: colors.white,
    marginHorizontal: padding.lg,
    padding: padding.lg,
    borderRadius: borderRadius.lg,
    marginBottom: margin.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceTitle: {
    fontSize: fontSize(20),
    fontWeight: '700',
    color: colors.text,
    marginBottom: margin.lg,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: padding.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: margin.md,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: margin.sm,
  },
  paymentText: {
    fontSize: fontSize(14),
    fontWeight: '500',
    color: colors.text,
  },
  addressesContainer: {
    marginBottom: margin.lg,
    gap: margin.sm,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: margin.sm,
  },
  addressBullet: {
    width: scale(8),
    height: scale(8),
    borderRadius: borderRadius.round,
  },
  blueBullet: {
    backgroundColor: '#4285F4',
  },
  greenBullet: {
    backgroundColor: '#3FA565',
  },
  addressText: {
    fontSize: fontSize(14),
    color: colors.text,
    flex: 1,
  },
  detailsContainer: {
    gap: margin.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: margin.sm,
  },
  detailText: {
    fontSize: fontSize(14),
    color: colors.text,
  },
  pillsContainer: {
    flexDirection: 'row',
    gap: margin.md,
    paddingHorizontal: padding.lg,
    marginBottom: margin.lg,
  },
  pill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: padding.md,
    borderRadius: borderRadius.xl,
    gap: margin.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  pillContent: {
    flex: 1,
  },
  pillLabel: {
    fontSize: fontSize(12),
    color: colors.textSecondary,
    marginBottom: margin.xs,
  },
  pillValue: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.text,
  },
  sendMessageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: padding.md,
    paddingHorizontal: padding.lg,
    borderRadius: borderRadius.md,
    marginHorizontal: padding.lg,
    marginBottom: margin.lg,
    gap: margin.sm,
  },
  sendMessageText: {
    fontSize: fontSize(14),
    fontWeight: '500',
    color: colors.text,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: padding.lg,
    paddingBottom: padding.lg,
    paddingTop: padding.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: margin.md,
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4444',
    paddingVertical: padding.lg,
    borderRadius: borderRadius.md,
    gap: margin.sm,
  },
  cancelButtonText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.white,
  },
  acceptButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3FA565',
    paddingVertical: padding.lg,
    borderRadius: borderRadius.md,
    gap: margin.sm,
  },
  acceptButtonText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.white,
  },
});
