import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActionSheetIOS,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomIcon from '../../../components/Icon';
import { goBack, navigate } from '../../../navigation/navigationService';
import { scale, fontSize, padding } from '../../../utils/responsive';
import { COLORS } from '../../../utils/constants';

type Address = {
  id: string;
  address: string;
};

const ADDRESSES_API_URL =
  'https://jolloyard-be.myfileshosting.com/api/v1/addresses?page=1&limit=2';
const AUTH_TOKEN_KEY = 'auth_accessToken';

export default function MyAddressesScreen() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isEmpty = !loading && addresses.length === 0;

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadAddresses = async () => {
        try {
          setLoading(true);
          const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
          if (!token || !isActive) {
            setLoading(false);
            return;
          }

          const res = await fetch(ADDRESSES_API_URL, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          if (!isActive) return;

          if (res.ok) {
            const data = await res.json();
            const raw =
              data?.data?.addresses ??
              data?.addresses ??
              data?.data ??
              data;

            if (Array.isArray(raw)) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const mapped: Address[] = raw.map((item: any, index: number) => {
                const id =
                  item.id ??
                  item._id ??
                  String(index);
                const addressText =
                  item.address ??
                  ([
                    item.street,
                    item.city,
                    item.state,
                    item.postalCode,
                    item.country,
                  ]
                    .filter(Boolean)
                    .join(', ') || 'Address');

                return {
                  id,
                  address: addressText,
                };
              });

              setAddresses(mapped);
            } else {
              setAddresses([]);
            }
          } else {
            setAddresses([]);
          }
        } catch {
          setAddresses([]);
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      loadAddresses();

      return () => {
        isActive = false;
      };
    }, []),
  );

  const handleAddAddress = () => {
    navigate('AddAddress');
  };

  const handleAddressOptions = (id: string) => {
    const options = ['Edit', 'Delete', 'Cancel'];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        { options, destructiveButtonIndex, cancelButtonIndex },
        (buttonIndex) => {
          if (buttonIndex === 0) navigate('AddAddress');
          if (buttonIndex === 1) {
            setAddresses((prev) => prev.filter((a) => a.id !== id));
          }
        }
      );
    } else {
      Alert.alert(
        'Address options',
        undefined,
        [
          { text: 'Edit', onPress: () => navigate('AddAddress') },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () =>
              setAddresses((prev) => prev.filter((a) => a.id !== id)),
          },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.headerLeft}>
          <CustomIcon name="arrow-back" size={scale(24)} color={COLORS.PRIMARY} />
          <Text style={styles.headerTitle}>My Addresses</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddAddress} activeOpacity={0.7}>
          <CustomIcon name="add" size={scale(28)} color={COLORS.PRIMARY} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isEmpty && styles.emptyStateContent,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {loading && (
          <Text style={styles.infoText}>Loading addresses...</Text>
        )}

        {isEmpty && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconWrapper}>
              <CustomIcon
                name="location-outline"
                size={scale(40)}
                color={COLORS.PRIMARY}
              />
            </View>
            <Text style={styles.emptyTitle}>No addresses found</Text>
            <Text style={styles.emptySubtitle}>
              Tap the + icon above to add your first address for faster bookings.
            </Text>
          </View>
        )}

        {!isEmpty &&
          addresses.map((item) => (
            <View key={item.id} style={styles.addressCard}>
              <View style={styles.iconBox}>
                <CustomIcon
                  name="location-outline"
                  size={scale(24)}
                  color={COLORS.PRIMARY}
                />
              </View>
              <Text style={styles.addressText}>{item.address}</Text>
              <TouchableOpacity
                onPress={() => handleAddressOptions(item.id)}
                style={styles.optionsButton}
                activeOpacity={0.7}
              >
                <CustomIcon
                  name="ellipsis-vertical"
                  size={scale(20)}
                  color="#000"
                />
              </TouchableOpacity>
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
    justifyContent: 'space-between',
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
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: scale(12),
    padding: padding.lg,
    marginBottom: scale(12),
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
  addressText: {
    flex: 1,
    fontSize: fontSize(15),
    color: '#000',
    lineHeight: scale(22),
  },
  infoText: {
    fontSize: fontSize(14),
    color: '#777',
    marginBottom: scale(12),
    textAlign: 'center',
  },
  emptyStateContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: padding.lg,
  },
  emptyState: {
    alignItems: 'center',
  },
  emptyIconWrapper: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    backgroundColor: '#E8F5EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(16),
  },
  emptyTitle: {
    fontSize: fontSize(18),
    fontWeight: '600',
    color: '#000',
    marginBottom: scale(6),
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: fontSize(14),
    color: '#777',
    textAlign: 'center',
    maxWidth: '80%',
  },
  optionsButton: {
    padding: scale(4),
  },
});
