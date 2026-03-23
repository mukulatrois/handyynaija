import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { RouteProp, useRoute } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { goBack, navigate } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin } from '../../utils/responsive';
import CustomIcon, { IconNames } from '../../components/Icon';
import { RootStackParamList } from '../../navigation/navigationService';
import { COLORS } from '../../utils/constants';

export default function WorkAreasScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'WorkAreas'>>();
  const coordinates = route.params?.coordinates;
  const [distanceKm, setDistanceKm] = useState<number>(10);

  const initialRegion = coordinates
    ? {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }
    : {
      latitude: 13.0059,
      longitude: 5.2476,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };

  const handleContinue = () => {
    navigate('ProviderWorkSchedule', {
      address: route.params?.address,
      coordinates: route.params?.coordinates,
      distanceKm,
      photoUri: route.params?.photoUri,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with back arrow and progress bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton} activeOpacity={0.7}>
          <CustomIcon name={IconNames.arrowBack} size={scale(24)} color={COLORS.PRIMARY} />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '74%' }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Work Areas</Text>
        <Text style={styles.subtitle}>
          Select the distance Value you can travel to in order to offer your services. Please
          remember that you cannot charge an extra fee for travel.
        </Text>

        {/* Map only */}
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
        >
          {coordinates ? (
            <Marker coordinate={coordinates} pinColor={COLORS.SECONDARY} />
          ) : (
            <Marker coordinate={{ latitude: 13.0059, longitude: 5.2476 }} pinColor={COLORS.SECONDARY} />
          )}
        </MapView>

        {/* Distance Slider */}
        <View style={styles.distanceSection}>
          <Text style={styles.distanceTitle}>
            Distance <Text style={styles.distanceValue}>{distanceKm} km</Text>
          </Text>

          <Slider
            minimumValue={1}
            maximumValue={50}
            step={1}
            value={distanceKm}
            minimumTrackTintColor={COLORS.PRIMARY}
            maximumTrackTintColor="#E5E5E5"
            thumbTintColor={COLORS.PRIMARY}
            onValueChange={(val: number) => setDistanceKm(Math.round(val))}
          />

        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={handleContinue}
          activeOpacity={0.7}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: padding.xl,
    paddingVertical: padding.lg,
    paddingBottom: padding.md,
    gap: padding.md,
  },
  backButton: {
    padding: padding.xs,
  },
  progressBar: {
    flex: 1,
    height: scale(6),
    backgroundColor: '#E0E0E0',
    borderRadius: scale(10),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: scale(10),
  },
  content: {
    flex: 1,
    paddingHorizontal: padding.xl,
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginBottom: margin.sm,
  },
  subtitle: {
    fontSize: fontSize(14),
    color: '#444',
    marginBottom: margin.lg,
    lineHeight: fontSize(20),
  },
  map: {
    height: scale(360),
    borderRadius: scale(12),
    marginBottom: margin.lg,
  },
  continueBtn: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: padding.lg,
    borderRadius: scale(10),
    alignItems: 'center',
    marginBottom: margin.xl,
    marginTop: margin.lg,
  },
  disabledBtn: {
    backgroundColor: '#E0E0E0',
  },
  continueText: {
    color: '#fff',
    fontSize: fontSize(16),
    fontWeight: '600',
  },
  distanceSection: {
    marginBottom: margin.lg,
  },
  distanceTitle: {
    fontSize: fontSize(14),
    color: '#444',
    marginBottom: margin.sm,
  },
  distanceValue: {
    fontWeight: '700',
    color: COLORS.PRIMARY,
  },
  distanceHint: {
    marginTop: margin.xs,
    fontSize: fontSize(12),
    color: '#777',
  },
});
