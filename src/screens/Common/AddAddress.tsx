import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import CustomIcon from '../../components/Icon';
import { SearchInput } from '../../components';
import { goBack, navigate } from '../../navigation/navigationService';
import { RootStackParamList } from '../../navigation/navigationService';

type AddAddressRouteProp = RouteProp<RootStackParamList, 'AddAddress'>;

const AddAddressScreen = () => {
  const route = useRoute<AddAddressRouteProp>();
  const fromBooking = route.params?.fromBooking ?? false;
  const [address, setAddress] = useState('');

  const handleUseCurrentLocation = () => {
    // TODO: get actual current location and format address
    const defaultAddress = 'Ungwan Kifi, Nigeria';
    if (fromBooking) {
      navigate('ServiceAddress', { address: defaultAddress });
    }
  };

  const handleNext = () => {
    const addressToPass = address.trim() || 'Street name and number';
    navigate('ServiceAddress', { address: addressToPass });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} activeOpacity={0.7}>
          <CustomIcon name="arrow-back-outline" size={26} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Addresses</Text>
      </View>

      {/* DESCRIPTION */}
      <Text style={styles.description}>
        Enter the address where the service will be performed to show your available professionals.
      </Text>

      {/* SEARCH INPUT */}
      <SearchInput
        placeholder="Street name and number..."
        style={styles.searchInput}
        value={address}
        onChangeText={setAddress}
      />

      {/* CURRENT LOCATION BUTTON */}
      <TouchableOpacity style={styles.locationBtn} onPress={handleUseCurrentLocation} activeOpacity={0.7}>
        <CustomIcon name="locate-outline" size={22} color="#333" />
        <Text style={styles.locationText}>Use Current Location</Text>
      </TouchableOpacity>

      {/* Next button - only when opened from booking flow (Select start time) */}
      {fromBooking && (
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.7}>
          <Text style={styles.nextBtnText}>Next</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 12,
    color: '#000',
  },

  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 30,
    lineHeight: 22,
  },

  searchInput: {
    marginBottom: 20,
  },

  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#333',
    borderRadius: 14,
    height: 60,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },

  locationText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },

  nextBtn: {
    marginTop: 24,
    backgroundColor: '#3FA565',
    borderRadius: 14,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
