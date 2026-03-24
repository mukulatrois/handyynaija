import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { RouteProp, useRoute } from '@react-navigation/native';

import { goBack, navigate } from '../../navigation/navigationService';
import { RootStackParamList } from '../../navigation/navigationService';
import { Button } from '../../components';
import CustomIcon, { IconNames } from '../../components/Icon';
import { scale, fontSize, padding, margin } from '../../utils/responsive';
import { COLORS } from '../../utils/constants';

// Replace this with your real Google Places API key.
// Note: AndroidManifest already has a dummy geo API key.
const GOOGLE_PLACES_API_KEY = 'AIzaSyCLR79mNHhWeVK35PL8qvFR5451f9SmGPc';

export default function ProviderAddAddressScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'ProviderAddAddress'>>();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedCoordinates, setSelectedCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const query = useMemo(
    () => ({
      key: GOOGLE_PLACES_API_KEY,
      language: 'en',
      components: 'country:ng',
    }),
    [],
  );

  const handleContinue = () => {
    // Requirement: this screen has only one address input, so we just save/display it
    // and continue to WorkAreas.
    if (!selectedAddress.trim()) return;
    navigate('WorkAreas', {
      address: selectedAddress,
      coordinates: selectedCoordinates ?? undefined,
      photoUri: route.params?.photoUri,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={goBack}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <CustomIcon name={IconNames.arrowBack} size={scale(24)} color={COLORS.PRIMARY} />
          </TouchableOpacity>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '60%' }]} />
          </View>
        </View>

        <View style={styles.content}>
        <Text style={styles.title}>Add Address</Text>
          <Text style={styles.subtitle}>
            Start typing your address and pick one from the suggestions.
          </Text>
          <Text style={styles.disclaimer}>
            Disclaimer: You can only search for addresses within Nigeria.
          </Text>

          <GooglePlacesAutocomplete
            placeholder="Search address"
            query={query}
            fetchDetails={true}
            onPress={(data, details = null) => {
              const next =
                details?.formatted_address ?? data.description ?? '';
              setSelectedAddress(next);

              const lat = details?.geometry?.location?.lat;
              const lng = details?.geometry?.location?.lng;
              if (typeof lat === 'number' && typeof lng === 'number') {
                setSelectedCoordinates({ latitude: lat, longitude: lng });
              } else {
                setSelectedCoordinates(null);
              }
            }}
            debounce={200}
            enablePoweredByContainer={false}
            minLength={2}
            styles={{
              textInputContainer: styles.textInputContainer as any,
              textInput: styles.textInput,
              predefinedPlacesDescription: styles.predefinedPlacesDescription,
              listView: styles.listView,
            }}
            keyboardShouldPersistTaps="handled"
          />

          {/* {!!selectedAddress.trim() && (
            <View style={styles.selectedBox}>
              <Text style={styles.selectedLabel}>Selected address</Text>
              <Text style={styles.selectedValue} numberOfLines={3}>
                {selectedAddress}
              </Text>
            </View>
          )} */}
        </View>

        <View style={styles.footer}>
          <Button
            title="Continue"
            variant="primary"
            onPress={handleContinue}
            disabled={!selectedAddress.trim() || !selectedCoordinates}
            style={styles.continueButton}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoiding: {
    flex: 1,
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
  subtitle: {
    fontSize: fontSize(14),
    color: '#555',
    marginBottom: margin.lg,
    lineHeight: fontSize(20),
  },
  disclaimer: {
    fontSize: fontSize(12),
    color: '#8A6D3B',
    backgroundColor: '#FFF8E1',
    borderWidth: 1,
    borderColor: '#F0E0A0',
    borderRadius: scale(8),
    paddingVertical: padding.sm,
    paddingHorizontal: padding.md,
    marginBottom: margin.md,
  },
  title: {
    fontSize: fontSize(22),
    fontWeight: '700',
    color: '#000',
    marginBottom: margin.xs,
  },
  textInputContainer: {
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  textInput: {
    height: 52,
    color: '#000',
    fontSize: 16,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
  listView: {
    marginTop: 0,
  },
  selectedBox: {
    marginTop: margin.lg,
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    padding: padding.lg,
    backgroundColor: '#F9FAFB',
  },
  selectedLabel: {
    fontSize: fontSize(12),
    fontWeight: '600',
    color: '#555',
    marginBottom: margin.sm,
  },
  selectedValue: {
    fontSize: fontSize(14),
    color: '#000',
  },
  footer: {
    paddingHorizontal: padding.xl,
    paddingBottom: margin.xl,
  },
  continueButton: {
    backgroundColor: COLORS.PRIMARY,
  },
});

