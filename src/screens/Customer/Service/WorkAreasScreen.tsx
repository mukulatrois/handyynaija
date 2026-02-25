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
import { goBack } from '../../../navigation/navigationService';
import ServiceScreenHeader from './ServiceScreenHeader';

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
      setSelected(selected.filter(a => a !== area));
    } else {
      setSelected([...selected, area]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ServiceScreenHeader title="Work areas" showBack onBackPress={goBack} />

      {/* Progress bar */}
      <View style={styles.progressBg}>
        <View style={styles.progressFill} />
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Select the areas you can travel to in order to offer your services.
        Remember that you cannot charge an extra fee for travel
      </Text>

      {/* Toggle */}
      <View style={styles.toggle}>
        <TouchableOpacity
          style={[styles.toggleBtn, mode === 'map' && styles.activeBtn]}
          onPress={() => setMode('map')}>
          <Text style={[styles.toggleText, mode === 'map' && styles.activeText]}>
            Map
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleBtn, mode === 'list' && styles.activeBtn]}
          onPress={() => setMode('list')}>
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
            latitude: 6.5244,
            longitude: 3.3792,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}>
          <Marker coordinate={{ latitude: 6.52, longitude: 3.37 }} />
          <Marker coordinate={{ latitude: 6.53, longitude: 3.38 }} />
          <Marker coordinate={{ latitude: 6.525, longitude: 3.39 }} />
        </MapView>
      ) : (
        <FlatList
          data={AREAS}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() => toggleArea(item)}>
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
        disabled={selected.length === 0}
        style={[
          styles.continueBtn,
          selected.length === 0 && styles.disabledBtn,
        ]}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  progressBg: {
    height: 6,
    backgroundColor: '#ddd',
    margin: 16,
    borderRadius: 10,
  },

  progressFill: {
    width: '35%',
    height: '100%',
    backgroundColor: '#2e9e63',
    borderRadius: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#2e9e63',
    marginHorizontal: 16,
  },

  subtitle: {
    fontSize: 14,
    color: '#444',
    marginHorizontal: 16,
    marginBottom: 12,
  },

  toggle: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    margin: 16,
    borderRadius: 25,
    padding: 4,
  },

  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },

  activeBtn: {
    backgroundColor: '#2e9e63',
  },

  toggleText: {
    fontSize: 14,
    color: '#555',
  },

  activeText: {
    color: '#fff',
    fontWeight: '600',
  },

  map: {
    flex: 1,
    marginHorizontal: 16,
    borderRadius: 12,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 12,
  },

  checked: {
    backgroundColor: '#2e9e63',
    borderColor: '#2e9e63',
  },

  areaText: {
    fontSize: 16,
    color: '#333',
  },

  continueBtn: {
    backgroundColor: '#2e9e63',
    margin: 16,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  disabledBtn: {
    backgroundColor: '#ccc',
  },

  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
