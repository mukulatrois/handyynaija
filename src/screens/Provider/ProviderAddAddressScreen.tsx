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

import { goBack, navigate } from '../../navigation/navigationService';
import { Button } from '../../components';
import CustomIcon, { IconNames } from '../../components/Icon';
import { scale, fontSize, padding, margin } from '../../utils/responsive';

// Replace this with your real Google Places API key.
// Note: AndroidManifest already has a dummy geo API key.
const GOOGLE_PLACES_API_KEY = 'AIzaSyCLR79mNHhWeVK35PL8qvFR5451f9SmGPc';

export default function ProviderAddAddressScreen() {
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
            <CustomIcon name={IconNames.arrowBack} size={scale(24)} color="#3FA565" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Add address</Text>

          <View style={styles.headerRightSpacer} />
        </View>

        <View style={styles.content}>
          <Text style={styles.subtitle}>
            Start typing your address and pick one from the suggestions.
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

          {!!selectedAddress.trim() && (
            <View style={styles.selectedBox}>
              <Text style={styles.selectedLabel}>Selected address</Text>
              <Text style={styles.selectedValue} numberOfLines={3}>
                {selectedAddress}
              </Text>
            </View>
          )}
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
    gap: padding.md,
  },
  backButton: {
    padding: padding.xs,
  },
  headerTitle: {
    flex: 1,
    fontSize: fontSize(18),
    fontWeight: '700',
    color: '#000',
  },
  headerRightSpacer: {
    width: scale(24),
    height: scale(24),
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
  continueButton: {},
});

