import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { goBack, navigate } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin } from '../../utils/responsive';
import CustomIcon, { IconNames } from '../../components/Icon';

const AREAS = [
  'Ajeromi-Ifelodun',
  'Alimosho',
  'Kosofe',
  'Mushin',
  'Oshodi-Isolo',
  'Ojo',
  'Ikorodu',
  'Surulere',
];

export default function WorkAreasScreen() {
  const [mode, setMode] = useState<'map' | 'list'>('map');
  const [selected, setSelected] = useState<string[]>([]);

  const toggleArea = (area: string) => {
    if (selected.includes(area)) {
      setSelected(selected.filter((a) => a !== area));
    } else {
      setSelected([...selected, area]);
    }
  };

  const handleContinue = () => {
    if (selected.length > 0 || mode === 'map') {
      navigate('ProviderWorkSchedule');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with back arrow and progress bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton} activeOpacity={0.7}>
          <CustomIcon name={IconNames.arrowBack} size={scale(24)} color="#3FA565" />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '80%' }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Work areas</Text>
        <Text style={styles.subtitle}>
          Select the areas you can travel to in order to offer your services.
          Remember that you cannot charge an extra fee for travel
        </Text>

        {/* Map/List Toggle */}
        <View style={styles.toggle}>
          <TouchableOpacity
            style={[styles.toggleBtn, mode === 'map' && styles.activeBtn]}
            onPress={() => setMode('map')}
          >
            <Text style={[styles.toggleText, mode === 'map' && styles.activeText]}>
              Map
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleBtn, mode === 'list' && styles.activeBtn]}
            onPress={() => setMode('list')}
          >
            <Text style={[styles.toggleText, mode === 'list' && styles.activeText]}>
              List
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {mode === 'map' ? (
          <MapView
            provider="google"
            style={styles.map}
            initialRegion={{
              latitude: 13.0059,
              longitude: 5.2476,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker coordinate={{ latitude: 13.0059, longitude: 5.2476 }} />
            <Marker coordinate={{ latitude: 13.01, longitude: 5.25 }} />
            <Marker coordinate={{ latitude: 13.0, longitude: 5.24 }} />
          </MapView>
        ) : (
          <FlatList
            data={AREAS}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.row}
                onPress={() => toggleArea(item)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    selected.includes(item) && styles.checked,
                  ]}
                />
                <Text style={styles.areaText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        {/* Continue Button */}
        <TouchableOpacity
          disabled={mode === 'list' && selected.length === 0}
          style={[
            styles.continueBtn,
            mode === 'list' && selected.length === 0 && styles.disabledBtn,
          ]}
          onPress={handleContinue}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.continueText,
              mode === 'list' && selected.length === 0 && styles.disabledText,
            ]}
          >
            Continue
          </Text>
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
    backgroundColor: '#3FA565',
    borderRadius: scale(10),
  },
  content: {
    flex: 1,
    paddingHorizontal: padding.xl,
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: 'bold',
    color: '#3FA565',
    marginBottom: margin.sm,
  },
  subtitle: {
    fontSize: fontSize(14),
    color: '#444',
    marginBottom: margin.lg,
    lineHeight: fontSize(20),
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    borderRadius: scale(25),
    padding: scale(4),
    marginBottom: margin.lg,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: padding.md,
    borderRadius: scale(20),
    alignItems: 'center',
  },
  activeBtn: {
    backgroundColor: '#3FA565',
  },
  toggleText: {
    fontSize: fontSize(14),
    color: '#555',
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
  map: {
    flex: 1,
    borderRadius: scale(12),
    marginBottom: margin.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: padding.lg,
    paddingHorizontal: padding.md,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  checkbox: {
    width: scale(22),
    height: scale(22),
    borderRadius: scale(6),
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: padding.md,
  },
  checked: {
    backgroundColor: '#3FA565',
    borderColor: '#3FA565',
  },
  areaText: {
    fontSize: fontSize(16),
    color: '#333',
  },
  continueBtn: {
    backgroundColor: '#3FA565',
    paddingVertical: padding.lg,
    borderRadius: scale(10),
    alignItems: 'center',
    marginBottom: margin.xl,
  },
  disabledBtn: {
    backgroundColor: '#E0E0E0',
  },
  continueText: {
    color: '#fff',
    fontSize: fontSize(16),
    fontWeight: '600',
  },
  disabledText: {
    color: '#555',
  },
});
