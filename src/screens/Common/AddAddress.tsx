import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomIcon from '../../components/Icon';
import { SearchInput } from '../../components';
import { goBack } from '../../navigation/navigationService';

const AddAddressScreen = () => {
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
      <SearchInput placeholder="Street name and number..." style={styles.searchInput} />

      {/* CURRENT LOCATION BUTTON */}
      <TouchableOpacity style={styles.locationBtn} activeOpacity={0.7}>
        <CustomIcon name="locate-outline" size={22} color="#333" />
        <Text style={styles.locationText}>Use Current Location</Text>
      </TouchableOpacity>
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
});
