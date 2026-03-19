
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, Alert as RNAlert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { navigate } from '../../navigation/navigationService';
import { fontSize, padding, margin, borderRadius, scale } from '../../utils/responsive';
import { colors } from '../../theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

interface ChatMessage {
  id: string;
  name: string;
  service: string;
  lastMessage: string;
  time: string;
  avatar: string;
}

interface AlertItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  date: string;
}

const AUTH_TOKEN_KEY = 'auth_accessToken';
const AUTH_USER_KEY = 'auth_user';

// Mock data
const mockChats: ChatMessage[] = [
  {
    id: '1',
    name: 'YERXON',
    service: 'Cleaning',
    lastMessage: 'Cleaning de ester misomo precio se podtlak...',
    time: 'Thursday',
    avatar: '👤',
  },
  {
    id: '2',
    name: 'YERXON',
    service: 'Handyman',
    lastMessage: 'Need a service',
    time: '15/6/25',
    avatar: '👤',
  },
  {
    id: '3',
    name: 'YERXON',
    service: 'Cleaning',
    lastMessage: 'Cleaning de ester misomo precio se podtlak...',
    time: '14/5/25',
    avatar: '👤',
  },
  {
    id: '4',
    name: 'YERXON',
    service: 'Handyman',
    lastMessage: 'Cleaning de ester misomo precio se podtlak...',
    time: '25/4/24',
    avatar: '👤',
  },
  {
    id: '5',
    name: 'YERXON',
    service: 'Cleaning',
    lastMessage: 'Cleaning de ester misomo precio se podtlak...',
    time: '20/3/24',
    avatar: '👤',
  },
  {
    id: '6',
    name: 'YERXON',
    service: 'Handyman',
    lastMessage: 'Cleaning de ester misomo precio se podtlak...',
    time: '15/2/24',
    avatar: '👤',
  },
];

const mockAlerts: AlertItem[] = [
  {
    id: '1',
    iconName: 'people',
    title: 'YERXON has left you a review',
    description: 'Check it out on your profile.',
    date: 'Thursday',
  },
  {
    id: '2',
    iconName: 'people',
    title: 'Rate your service with YEROXON',
    description: 'Let us know how your Cleaning service...',
    date: 'Wednesday',
  },
  {
    id: '3',
    iconName: 'calendar',
    title: 'Your service is about to begin',
    description: 'Just a reminder: in 2 hours...',
    date: 'Tuesday',
  },
  {
    id: '4',
    iconName: 'calendar',
    title: 'Booking request confirmed',
    description: 'Congratulations! YEROXON has confirmed...',
    date: 'Monday',
  },
];

// Chat Scene Component
const ChatScene = () => {
  const handleChatPress = (chatId: string) => {
    navigate('ChatConversation' as any, { chatId });
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.chatList}>
        {mockChats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            style={styles.chatCard}
            onPress={() => handleChatPress(chat.id)}
          >
            <View style={styles.chatLeft}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>{chat.avatar}</Text>
              </View>
              <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{chat.name}</Text>
                <Text style={styles.chatService}>{chat.service}</Text>
                <Text style={styles.chatMessage} numberOfLines={1}>
                  {chat.lastMessage}
                </Text>
              </View>
            </View>
            <View style={styles.chatRight}>
              <Text style={styles.chatTime}>{chat.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// Alerts Scene Component
const AlertsScene = () => {
  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.alertsList}>
        {mockAlerts.map((alert) => (
          <TouchableOpacity key={alert.id} style={styles.alertCard}>
            <View style={styles.alertLeft}>
              <View style={styles.alertIconContainer}>
                <Icon 
                  name={`${alert.iconName}-outline`} 
                  size={scale(24)} 
                  color="#3FA565" 
                />
                <View style={styles.checkmarkContainer}>
                  <Icon 
                    name="checkmark" 
                    size={scale(12)} 
                    color="#FFFFFF" 
                  />
                </View>
              </View>
              <View style={styles.alertInfo}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertDescription}>{alert.description}</Text>
              </View>
            </View>
            <View style={styles.alertRight}>
              <Text style={styles.alertDate}>{alert.date}</Text>
              <Icon name="chevron-forward" size={scale(20)} color="#999" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default function PInbox() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'chat', title: 'Chat' },
    { key: 'alerts', title: 'Alerts' },
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
          RNAlert.alert('Verification', message);
        } finally {
          setCheckingVerification(false);
        }
      };

      checkVerificationStatus();
    }, []),
  );

  const renderScene = SceneMap({
    chat: ChatScene,
    alerts: AlertsScene,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
      activeColor="#3FA565"
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

  const handleSupportPress = () => {
    // Navigate to support chat or handle support action
    console.log('Support button pressed');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inbox</Text>
      </View>

      {/* TabView */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={renderTabBar}
      />

      {/* Floating Action Button - Support */}
      <TouchableOpacity style={styles.fab} onPress={handleSupportPress}>
        <Icon name="headset-outline" size={scale(18)} color="#FFFFFF" />
        <Text style={styles.fabText}>Support</Text>
      </TouchableOpacity>

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
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: padding.xl,
    paddingVertical: padding.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: fontSize(28),
    fontWeight: 'bold',
    color: '#3FA565',
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
    fontSize: fontSize(16),
    fontWeight: '500',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: '#3FA565',
    fontWeight: '600',
  },
  tabIndicator: {
    backgroundColor: '#3FA565',
    height: 2,
  },
  scrollContent: {
    paddingBottom: margin.xxxl + scale(80), // Extra padding for FAB
  },
  chatList: {
    padding: padding.xl,
  },
  chatCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: padding.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  chatLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  avatarContainer: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: margin.md,
  },
  avatar: {
    fontSize: fontSize(24),
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: fontSize(16),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: scale(2),
  },
  chatService: {
    fontSize: fontSize(14),
    color: '#666',
    marginBottom: scale(4),
  },
  chatMessage: {
    fontSize: fontSize(14),
    color: '#999',
  },
  chatRight: {
    alignItems: 'flex-end',
  },
  chatTime: {
    fontSize: fontSize(12),
    color: '#999',
  },
  alertsList: {
    padding: padding.xl,
  },
  alertCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: padding.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  alertLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  alertIconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: margin.md,
    position: 'relative',
  },
  checkmarkContainer: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: scale(16),
    height: scale(16),
    borderRadius: scale(8),
    backgroundColor: '#3FA565',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  alertInfo: {
    flex: 1,
  },
  alertTitle: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: '#000',
    marginBottom: scale(4),
  },
  alertDescription: {
    fontSize: fontSize(14),
    color: '#666',
  },
  alertRight: {
    alignItems: 'flex-end',
  },
  alertDate: {
    fontSize: fontSize(12),
    color: '#999',
    marginBottom: scale(4),
  },
  fab: {
    position: 'absolute',
    bottom: scale(90), // Above bottom navigation
    right: padding.xl,
    backgroundColor: '#3FA565',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
    borderRadius: borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: fontSize(14),
    fontWeight: '600',
    marginLeft: margin.sm,
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
});
