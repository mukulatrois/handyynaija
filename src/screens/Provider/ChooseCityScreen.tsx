import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { goBack, navigate } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin } from '../../utils/responsive';
import CustomIcon, { IconNames } from '../../components/Icon';

const NIGERIAN_CITIES = [
  'Ilorin',
  'Abuja',
  'Ogbomosho',
  'Ikorodu',
  'Maiduguri',
  'Bauchi',
  'Akure',
  'Abeokuta',
  'Sokoto',
  'Owerri',
  'Calabar',
];

export default function ChooseCityScreen() {
  const handleSelectCity = () => {
    navigate('ProviderProfileInfo');
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={handleSelectCity}
      activeOpacity={0.7}
    >
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with back arrow and progress bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton} activeOpacity={0.7}>
          <CustomIcon name={IconNames.arrowBack} size={scale(24)} color="#3FA565" />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '60%' }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Choose city</Text>
        <Text style={styles.subtitle}>
          In which city do you want to offer your services?
        </Text>

        <FlatList
          data={NIGERIAN_CITIES}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={styles.list}
        />

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Haven't we reached your area yet?</Text>
          <Text style={styles.footerText}>
            <Text
              style={styles.footerLink}
              onPress={() => {}}
              suppressHighlighting
            >
              Request an opening in your area
            </Text>
            {' '}and we will do our best to reach you as soon as possible.
          </Text>
        </View>
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
    marginBottom: margin.md,
  },
  subtitle: {
    fontSize: fontSize(16),
    color: '#555',
    marginBottom: margin.xl,
  },
  list: {
    flex: 1,
  },
  item: {
    paddingVertical: padding.lg,
    paddingHorizontal: padding.md,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemText: {
    fontSize: fontSize(16),
    color: '#000',
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
    color: '#3FA565',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});
