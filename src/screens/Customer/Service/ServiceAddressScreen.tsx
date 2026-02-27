import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { goBack, navigate } from '../../../navigation/navigationService';
import { RootStackParamList } from '../../../navigation/navigationService';
import { scale, fontSize, padding, margin } from '../../../utils/responsive';

const DEFAULT_REGION = {
  latitude: 9.0765,
  longitude: 7.3986,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

const DEFAULT_LOCATION = { latitude: 9.0765, longitude: 7.3986 };

type ServiceAddressRouteProp = RouteProp<RootStackParamList, 'ServiceAddress'>;

export default function ServiceAddressScreen() {
  const route = useRoute<ServiceAddressRouteProp>();
  const passedAddress = route.params?.address ?? '';

  const [areaAddress, setAreaAddress] = useState(
    passedAddress || 'Ungwan Kifi, Nigeria'
  );

  const handleConfirmAddress = () => {
    navigate('FindProfessionals' as never);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Service address</Text>
        <TouchableOpacity style={styles.closeBtn} onPress={goBack} activeOpacity={0.7}>
          <Ionicons name="close" size={scale(24)} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Address field */}
      <View style={styles.addressField}>
        <Ionicons name="location" size={scale(22)} color="#3FA565" style={styles.addressIcon} />
        <View style={styles.addressTextWrap}>
          <Text style={styles.addressLabel}>Street name and number</Text>
          <TextInput
            style={styles.addressInput}
            value={areaAddress}
            onChangeText={setAreaAddress}
            placeholder="Area, city, country"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Map */}
      <View style={styles.mapWrap}>
        <MapView
          style={styles.map}
          initialRegion={DEFAULT_REGION}
          showsUserLocation
          showsMyLocationButton={false}
        >
          <Marker
            coordinate={DEFAULT_LOCATION}
            pinColor="#3FA565"
            title="Service location"
          />
        </MapView>
        {/* Location button */}
        <TouchableOpacity style={styles.locationBtn} activeOpacity={0.7}>
          <Ionicons name="locate" size={scale(22)} color="#333" />
        </TouchableOpacity>
        {/* Zoom controls */}
        <View style={styles.zoomWrap}>
          <TouchableOpacity style={[styles.zoomBtn, styles.zoomBtnBorder]} activeOpacity={0.7}>
            <Ionicons name="add" size={scale(20)} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomBtn} activeOpacity={0.7}>
            <Ionicons name="remove" size={scale(20)} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={handleConfirmAddress}
          activeOpacity={0.7}
        >
          <Text style={styles.confirmBtnText}>Confirm address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: fontSize(20),
    fontWeight: '700',
    color: '#000',
  },
  closeBtn: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginHorizontal: padding.lg,
    marginTop: margin.lg,
    paddingVertical: padding.md,
    paddingHorizontal: padding.md,
    borderRadius: 12,
  },
  addressIcon: { marginRight: padding.md },
  addressTextWrap: { flex: 1 },
  addressLabel: {
    fontSize: fontSize(12),
    color: '#666',
    marginBottom: 2,
  },
  addressInput: {
    fontSize: fontSize(15),
    color: '#000',
    padding: 0,
  },
  mapWrap: {
    flex: 1,
    marginHorizontal: padding.lg,
    marginTop: margin.lg,
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 280,
  },
  map: { flex: 1, width: '100%', height: '100%' },
  locationBtn: {
    position: 'absolute',
    right: margin.md,
    top: margin.md,
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  zoomWrap: {
    position: 'absolute',
    right: margin.md,
    bottom: margin.md,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  zoomBtn: {
    width: scale(40),
    height: scale(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomBtnBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  footer: {
    paddingHorizontal: padding.lg,
    paddingVertical: margin.lg,
    paddingBottom: margin.xl,
  },
  confirmBtn: {
    backgroundColor: '#3FA565',
    borderRadius: 12,
    paddingVertical: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: '#fff',
  },
});
