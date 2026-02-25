import React, { useState } from 'react';
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
import CustomIcon from '../../../components/Icon';
import { goBack, navigate } from '../../../navigation/navigationService';
import { scale, fontSize, padding } from '../../../utils/responsive';

const INITIAL_ADDRESSES = [
  { id: '1', address: 'UNRWA Kifi, 802149, Kaduna, Nigeria' },
  { id: '2', address: 'Ungwan Kifi, 802149, Kaduna, Nigeria' },
];

export default function MyAddressesScreen() {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);

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
          <CustomIcon name="arrow-back" size={scale(24)} color="#3FA565" />
          <Text style={styles.headerTitle}>My Addresses</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddAddress} activeOpacity={0.7}>
          <CustomIcon name="add" size={scale(28)} color="#3FA565" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {addresses.map((item) => (
          <View key={item.id} style={styles.addressCard}>
            <View style={styles.iconBox}>
              <CustomIcon
                name="location-outline"
                size={scale(24)}
                color="#3FA565"
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
  optionsButton: {
    padding: scale(4),
  },
});
