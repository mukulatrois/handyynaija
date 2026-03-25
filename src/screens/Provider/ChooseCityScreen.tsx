import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { goBack, navigate } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin } from '../../utils/responsive';
import CustomIcon, { IconNames } from '../../components/Icon';
import Button from '../../components/Button';
import { COLORS } from '../../utils/constants';


export default function ChooseCityScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    getCities();
  }, []);

  const getCities = async () => {
    try {
      const res = await fetch(
        'https://countriesnow.space/api/v0.1/countries/cities',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ country: 'Nigeria' }),
        }
      );

      const data = await res.json();
      const cityList = Array.isArray(data?.data) ? data.data : [];
      setCities(cityList);
    } catch (error) {
      setCities([]);
    }
  };

  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
  };

  const handleContinue = () => {
    if (!selectedCity) return;
    navigate('ProviderUploadPhoto');
  };

  const filteredCities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return cities;
    return cities.filter((city) => city.toLowerCase().includes(query));
  }, [searchQuery, cities]);

  const renderItem = ({ item }: { item: string }) => {
    const isSelected = selectedCity === item;

    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.itemSelected]}
        onPress={() => handleSelectCity(item)}
        activeOpacity={0.7}
      >
        <Text style={[styles.itemText, isSelected && styles.itemTextSelected]}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with back arrow and progress bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton} activeOpacity={0.7}>
          <CustomIcon name={IconNames.arrowBack} size={scale(24)} color={COLORS.PRIMARY} />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '30%' }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Choose city</Text>
        <Text style={styles.subtitle}>
          In which city do you want to offer your services?
        </Text>

        <View style={styles.searchContainer}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search city"
            placeholderTextColor="#9AA0A6"
            style={styles.searchInput}
            autoCapitalize="words"
            autoCorrect={false}
            clearButtonMode="while-editing"
          />
          {searchQuery.trim().length > 0 ? (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              activeOpacity={0.7}
              style={styles.clearButton}
            >
              <CustomIcon name={IconNames.close} size={scale(16)} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>

        {selectedCity ? (
          <View style={styles.selectedCitySticky}>
            <View style={styles.selectedCityTextWrap}>
              <Text style={styles.selectedCityLabel}>Selected city</Text>
              <Text style={styles.selectedCityValue}>{selectedCity}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setSelectedCity(null)}
              activeOpacity={0.7}
              style={styles.selectedCityClear}
              accessibilityRole="button"
              accessibilityLabel="Clear selected city"
            >
              <CustomIcon name={IconNames.close} size={scale(16)} color="#666" />
            </TouchableOpacity>
          </View>
        ) : null}

        <FlatList
          data={filteredCities || []}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <Text style={styles.emptyText}>No city found for "{searchQuery.trim()}"</Text>
          }
        />

        

      
          {selectedCity ? (
          <View style={styles.continueWrapper}>
            <Button title="Continue" onPress={handleContinue} />
          </View>
        ) : null}
  
        
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
    marginBottom: margin.md,
  },
  subtitle: {
    fontSize: fontSize(16),
    color: '#555',
    marginBottom: margin.xl,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: margin.md,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: scale(10),
    paddingHorizontal: padding.md,
    paddingVertical: padding.md,
    paddingRight: scale(40),
    fontSize: fontSize(15),
    color: '#000',
    backgroundColor: '#fff',
  },
  clearButton: {
    position: 'absolute',
    right: padding.md,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  emptyText: {
    fontSize: fontSize(14),
    color: '#666',
    paddingVertical: padding.lg,
  },
  continueWrapper: {
    paddingTop: padding.md,
    paddingVertical: margin.xl,
  },
  selectedCitySticky: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: scale(10),
    paddingHorizontal: padding.md,
    paddingVertical: padding.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: margin.md,
  },
  selectedCityTextWrap: {
    flex: 1,
    paddingRight: padding.md,
  },
  selectedCityLabel: {
    fontSize: fontSize(12),
    color: '#555',
    fontWeight: '600',
    marginBottom: 2,
  },
  selectedCityValue: {
    fontSize: fontSize(16),
    color: '#000',
    fontWeight: '700',
  },
  selectedCityClear: {
    padding: padding.xs,
  },
  item: {
    paddingVertical: padding.lg,
    paddingHorizontal: padding.md,
    borderBottomWidth: 1,
    borderColor: '#eee',
    borderRadius: scale(10),
  },
  itemSelected: {
    backgroundColor: '#FC591126',
    borderColor: COLORS.PRIMARY,
    borderWidth: 1,
  },
  itemText: {
    fontSize: fontSize(16),
    color: '#000',
  },
  itemTextSelected: {
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
  footer: {
    paddingVertical: margin.xl,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerTitle: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: '#000',
    marginBottom: margin.sm,
  },
  footerText: {
    fontSize: fontSize(14),
    color: '#555',
    lineHeight: fontSize(20),
    marginBottom: margin.sm,
  },
  footerLink: {
    fontSize: fontSize(14),
    color: COLORS.PRIMARY,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});
