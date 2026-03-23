import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontSize, padding, margin, borderRadius, scale } from '../../utils/responsive';
import { colors } from '../../theme/colors';
import { navigate } from '../../navigation/navigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../../utils/constants';
import { CommonAppHeader } from '../../components';

const AUTH_TOKEN_KEY = 'auth_accessToken';
const AUTH_USER_KEY = 'auth_user';

type TabType = 'new' | 'completed' | 'cancelled';

interface Request {
  id: string;
  name: string;
  avatar: string;
  price: string;
  date: string;
  time: string;
  services: string;
  email: string;
  phone: string;
  location: string;
}

// Mock data - replace with actual data fetching
const mockRequests: Record<TabType, Request[]> = {
  new: [
    {
      id: '1',
      name: 'Mr. Hamid',
      avatar: '👨‍💼',
      price: '$20',
      date: '12 July 2025',
      time: '10:00 AM - 11 AM',
      services: 'Cleaner',
      email: 'example@gmail.com',
      phone: '012562589663',
      location: '13th Street, 47 W 13th St, New York, NY 10011',
    },
    {
      id: '2',
      name: 'Willems',
      avatar: '👩',
      price: '$20',
      date: '12 July 2025',
      time: '10:00 AM - 11 AM',
      services: 'Cleaner',
      email: 'example@gmail.com',
      phone: '012562589663',
      location: '13th Street, 47 W 13th St, New York, NY 10011',
    },
  ],
  completed: [
    {
      id: '3',
      name: 'Mr. Hamid',
      avatar: '👨‍💼',
      price: '$20',
      date: '12 July 2025',
      time: '10:00 AM-11 AM',
      services: 'Cleaner',
      email: 'example@gmail.com',
      phone: '012562589663',
      location: '13th Street 47 W 13th St. New York, NY 10011',
    },
    {
      id: '4',
      name: 'Mr. Hamid',
      avatar: '👨‍💼',
      price: '$20',
      date: '12 July 2025',
      time: '10:00 AM-11 AM',
      services: 'Dentists',
      email: 'example@gmail.com',
      phone: '012562589663',
      location: '13th Street 47 W 13th St. New York, NY 10011',
    },
  ],
  cancelled: [
    {
      id: '5',
      name: 'Mr. Hamid',
      avatar: '👨‍💼',
      price: '$20',
      date: '12 July 2025',
      time: '10:00 AM-AM',
      services: 'Cleaner',
      email: 'example@gmail.com',
      phone: '012562589663',
      location: '13th Street 47 W 13th St. New York, NY 10011',
    },
    {
      id: '6',
      name: 'Mr. Hamid',
      avatar: '👨‍💼',
      price: '$20',
      date: '12 July 2025',
      time: '10:00 AM-AM',
      services: 'Cleaner',
      email: 'example@gmail.com',
      phone: '012562589663',
      location: '13th Street 47 W 13th St. New York, NY 10011',
    },
  ],
};

const RequestList = ({ requests, emptyMessage, showPrice = true, showCancelledStatus = false, showViewDetails = true }: { requests: Request[]; emptyMessage: string; showPrice?: boolean; showCancelledStatus?: boolean; showViewDetails?: boolean }) => {
  const handleViewDetails = (request: Request) => {
    navigate('RequestDetail', {
      requestId: request.id,
      name: request.name,
      avatar: request.avatar,
      price: request.price,
      date: request.date,
      time: request.time,
      services: request.services,
      email: request.email,
      phone: request.phone,
      location: request.location,
    });
  };

  if (requests.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>📋</Text>
        <Text style={styles.emptyText}>No requests yet</Text>
        <Text style={styles.emptySubtext}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.requestsList}>
        {requests.map((request) => (
          <View key={request.id} style={styles.requestCard}>
            {/* Top Row: Avatar, Name, Price/Cancelled Status */}
            <View style={styles.cardHeader}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>{request.avatar}</Text>
              </View>
              <Text style={styles.name}>{request.name}</Text>
              {showCancelledStatus ? (
                <View style={styles.cancelledStatusContainer}>
                  <Icon name="close-circle" size={scale(18)} color="#FF4444" />
                  <Text style={styles.cancelledText}>Cancelled</Text>
                </View>
              ) : showPrice ? (
                <Text style={styles.price}>Price: {request.price}</Text>
              ) : null}
            </View>

            {/* Details Section */}
            <View style={styles.detailsSection}>
              {showCancelledStatus ? (
                <>
                  {/* Cancelled tab order: Location, Date, Time, Email, Phone, Services */}
                  <View style={styles.detailRow}>
                    <Icon name="location-outline" size={scale(16)} color={colors.textSecondary} />
                    <Text style={styles.detailText} numberOfLines={2}>
                      <Text style={styles.detailLabel}>Location: </Text>
                      <Text style={styles.detailValue}>{request.location}</Text>
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Icon name="calendar-outline" size={scale(16)} color={colors.textSecondary} />
                    <Text style={styles.detailText}>
                      <Text style={styles.detailLabel}>Date: </Text>
                      <Text style={styles.detailValue}>{request.date}</Text>
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Icon name="time-outline" size={scale(16)} color={colors.textSecondary} />
                    <Text style={styles.detailText}>
                      <Text style={styles.detailLabel}>Time: </Text>
                      <Text style={styles.detailValue}>{request.time}</Text>
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Icon name="mail-outline" size={scale(16)} color={colors.textSecondary} />
                    <Text style={styles.detailText}>
                      <Text style={styles.detailLabel}>Email: </Text>
                      <Text style={styles.detailValue}>{request.email}</Text>
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Icon name="call-outline" size={scale(16)} color={colors.textSecondary} />
                    <Text style={styles.detailText}>
                      <Text style={styles.detailLabel}>Phone: </Text>
                      <Text style={styles.detailValue}>{request.phone}</Text>
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Icon name="briefcase-outline" size={scale(16)} color={colors.textSecondary} />
                    <Text style={styles.detailText}>
                      <Text style={styles.detailLabel}>Services: </Text>
                      <Text style={styles.detailValue}>{request.services}</Text>
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  {/* Default order: Date, Time, Services, Email, Phone, Location */}
                  <View style={styles.detailRow}>
                    <Icon name="calendar-outline" size={scale(16)} color={colors.textSecondary} />
                    <Text style={styles.detailText}>
                      <Text style={styles.detailLabel}>Date: </Text>
                      <Text style={styles.detailValue}>{request.date}</Text>
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Icon name="time-outline" size={scale(16)} color={colors.textSecondary} />
                    <Text style={styles.detailText}>
                      <Text style={styles.detailLabel}>Time: </Text>
                      <Text style={styles.detailValue}>{request.time}</Text>
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Icon name="briefcase-outline" size={scale(16)} color={colors.textSecondary} />
                    <Text style={styles.detailText}>
                      <Text style={styles.detailLabel}>Services: </Text>
                      <Text style={styles.detailValue}>{request.services}</Text>
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Icon name="mail-outline" size={scale(16)} color={colors.textSecondary} />
                    <Text style={styles.detailText}>
                      <Text style={styles.detailLabel}>Email: </Text>
                      <Text style={styles.detailValue}>{request.email}</Text>
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Icon name="call-outline" size={scale(16)} color={colors.textSecondary} />
                    <Text style={styles.detailText}>
                      <Text style={styles.detailLabel}>Phone: </Text>
                      <Text style={styles.detailValue}>{request.phone}</Text>
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Icon name="location-outline" size={scale(16)} color={colors.textSecondary} />
                    <Text style={styles.detailText} numberOfLines={2}>
                      <Text style={styles.detailLabel}>Location: </Text>
                      <Text style={styles.detailValue}>{request.location}</Text>
                    </Text>
                  </View>
                </>
              )}
            </View>

            {/* View Details Button - Only show for new requests */}
            {showViewDetails && (
              <TouchableOpacity
                style={styles.viewDetailsButton}
                onPress={() => handleViewDetails(request)}
                activeOpacity={0.7}
              >
                <Text style={styles.viewDetailsButtonText}>View Details</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Scene components for each tab
const NewRequestsScene = () => (
  <RequestList requests={mockRequests.new} emptyMessage="New requests will appear here" />
);

const CompletedScene = () => (
  <RequestList requests={mockRequests.completed} emptyMessage="Completed requests will appear here" showPrice={false} showViewDetails={false} />
);

const CancelledScene = () => (
  <RequestList requests={mockRequests.cancelled} emptyMessage="Cancelled requests will appear here" showPrice={false} showCancelledStatus={true} showViewDetails={false} />
);

export default function PRequests() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'new', title: 'New Requests' },
    { key: 'completed', title: 'Completed' },
    { key: 'cancelled', title: 'Cancelled' },
  ]);

  const [checkingVerification, setCheckingVerification] = useState(true);
  const [verificationPending, setVerificationPending] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkVerificationStatus = async () => {
        try {
          const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
          const userJson = await AsyncStorage.getItem(AUTH_USER_KEY);
          const user = JSON.parse(userJson ?? '{}');
          const providerId = user?.id;
          const headers: Record<string, string> = {
            'Content-Type': 'application/json',
          };
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }

          const res = await fetch(
            `https://jolloyard-be.myfileshosting.com/api/v1/auth/${providerId}/verification-status`,
            {
              method: 'POST',
              headers,
            },
          );

          const data = await res.json().catch(() => ({}));
          const isVerified = data?.verificationStatus == '1';

          if (!res.ok || !isVerified) {
            setVerificationPending(true);
          } else {
            setVerificationPending(false);
          }
        } catch (err) {
          setVerificationPending(true);
          const message =
            err instanceof Error ? err.message : 'Unable to check verification status.';
          Alert.alert('Verification', message);
        } finally {
          setCheckingVerification(false);
        }
      };

      checkVerificationStatus();
    }, []),
  );

  const renderScene = SceneMap({
    new: NewRequestsScene,
    completed: CompletedScene,
    cancelled: CancelledScene,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
      activeColor={COLORS.PRIMARY}
      inactiveColor={colors.textSecondary}
      pressColor="transparent"
      renderLabel={({ route, focused }: { route: { title: string }; focused: boolean }) => (
        <Text
          style={[
            styles.tabText,
            focused && styles.tabTextActive,
          ]}
        >
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CommonAppHeader />
      <View style={styles.header}>
        <Text style={styles.title}>Requests History</Text>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={renderTabBar}
      />

      {/* Blocking overlay when verification is pending */}
      {verificationPending && (
        <View style={styles.blockOverlay}>
          <SafeAreaView style={styles.blockModalContainer}>
            <View style={styles.blockModalContent}>
              <Icon
                name="shield-checkmark-outline"
                size={scale(56)}
                color={colors.primary}
              />
              <Text style={styles.blockModalTitle}>Verification in progress</Text>
              <Text style={styles.blockModalMessage}>
                Your account verification is still pending. Please wait while we complete the
                process. You cannot use any feature in the app before verification is completed.
              </Text>
              {checkingVerification && (
                <ActivityIndicator
                  size="small"
                  color={colors.primary}
                  style={styles.blockModalLoader}
                />
              )}
            </View>
          </SafeAreaView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: padding.xl,
    paddingTop: padding.lg,
    paddingBottom: padding.md,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: '700',
    color: COLORS.PRIMARY,
    marginBottom: padding.lg,
  },
  tabBar: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabLabel: {
    fontSize: fontSize(14),
    fontWeight: '500',
  },
  tabText: {
    fontSize: fontSize(14),
    fontWeight: '500',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
  tabIndicator: {
    backgroundColor: COLORS.PRIMARY,
    height: 2,
  },
  blockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 10,
  },
  blockModalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: padding.xl,
  },
  blockModalContent: {
    alignItems: 'center',
  },
  blockModalTitle: {
    marginTop: padding.lg,
    fontSize: fontSize(20),
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  blockModalMessage: {
    marginTop: padding.md,
    fontSize: fontSize(15),
    color: colors.textSecondary,
    textAlign: 'center',
  },
  blockModalLoader: {
    marginTop: padding.lg,
  },
  scrollContent: {
    padding: padding.xl,
    paddingBottom: margin.xxxl,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: margin.xxxl,
  },
  emptyEmoji: {
    fontSize: fontSize(64),
    marginBottom: margin.lg,
  },
  emptyText: {
    fontSize: fontSize(20),
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: margin.sm,
  },
  emptySubtext: {
    fontSize: fontSize(14),
    color: colors.textSecondary,
    textAlign: 'center',
  },
  requestsList: {
    gap: margin.lg,
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: padding.lg,
    marginBottom: margin.md,
    borderWidth: 1,
    borderColor: '#E8F5E9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: margin.lg,
  },
  avatarContainer: {
    width: scale(50),
    height: scale(50),
    borderRadius: borderRadius.round,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: margin.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    fontSize: fontSize(24),
  },
  name: {
    flex: 1,
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.text,
  },
  price: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: colors.text,
  },
  detailsSection: {
    marginBottom: margin.md,
    gap: margin.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: margin.sm,
  },
  detailText: {
    flex: 1,
    fontSize: fontSize(13),
    color: colors.text,
    lineHeight: fontSize(18),
  },
  detailLabel: {
    color: colors.textSecondary,
    fontWeight: '400',
  },
  detailValue: {
    color: colors.text,
    fontWeight: '500',
  },
  cancelledStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: margin.xs,
  },
  cancelledText: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: '#FF4444',
  },
  viewDetailsButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: borderRadius.md,
    paddingVertical: padding.md,
    paddingHorizontal: padding.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: margin.md,
  },
  viewDetailsButtonText: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: colors.white,
  },
});