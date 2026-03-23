import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomIcon from '../../../components/Icon';
import { goBack } from '../../../navigation/navigationService';
import { scale, fontSize, padding } from '../../../utils/responsive';
import { COLORS } from '../../../utils/constants';

const LANGUAGES = [
  { id: 'en', name: 'English', flag: '🇬🇧' },
  { id: 'fr', name: 'French', flag: '🇫🇷' },
  { id: 'ha', name: 'Hausa', flag: '🇳🇬' },
  { id: 'yo', name: 'Yoruba', flag: '🇳🇬' },
  { id: 'ig', name: 'Igbo', flag: '🇳🇬' },
];

export default function ChooseLanguageScreen() {
  const [selectedId, setSelectedId] = useState('en');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.headerLeft}>
          <CustomIcon name="arrow-back" size={scale(24)} color={COLORS.PRIMARY} />
          <Text style={styles.headerTitle}>Choose Language</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {LANGUAGES.map((lang) => (
          <TouchableOpacity
            key={lang.id}
            style={styles.languageRow}
            onPress={() => setSelectedId(lang.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.flag}>{lang.flag}</Text>
            <Text style={styles.languageName}>{lang.name}</Text>
            <View
              style={[
                styles.checkCircle,
                selectedId === lang.id && styles.checkCircleSelected,
              ]}
            >
              {selectedId === lang.id && (
                <CustomIcon name="checkmark" size={scale(16)} color="#fff" />
              )}
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: scale(40) }} />
      </ScrollView>
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
    paddingHorizontal: padding.lg,
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  headerTitle: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: '#000',
  },
  scrollContent: {
    padding: padding.lg,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: scale(12),
    padding: padding.lg,
    marginBottom: scale(8),
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  flag: {
    fontSize: scale(28),
    marginRight: padding.md,
  },
  languageName: {
    flex: 1,
    fontSize: fontSize(16),
    color: '#000',
  },
  checkCircle: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    borderWidth: 2,
    borderColor: '#3FA565',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleSelected: {
    backgroundColor: '#3FA565',
  },
});
