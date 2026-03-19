import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  scale,
  fontSize,
  padding,
  margin,
  borderRadius,
} from '../../utils/responsive';
import { colors } from '../../theme/colors';
import { goBack, navigate } from '../../navigation/navigationService';
import { Button } from '../../components';

const PRIMARY_GREEN = '#3FA565';

const goodGalleryItems = [
  { id: '1', text: 'Photos of previous work', good: true },
  { id: '2', text: 'Services you provide', good: true },
  { id: '3', text: 'Good resolution', good: true },
  { id: '4', text: 'Contact Details', good: false },
];

export default function ListingGalleryScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '48%' }]} />
        </View>

        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.headerButton}>
            <Icon name="chevron-back" size={scale(24)} color={PRIMARY_GREEN} />
          </TouchableOpacity>
          <TouchableOpacity onPress={goBack} style={styles.saveExitButton} activeOpacity={0.7}>
            <Text style={styles.saveExitText}>Save and exit</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Gallery</Text>
          <Text style={styles.helperText}>Add service related photos as portfolio to do your listing</Text>

          <View style={styles.galleryRow}>
            <View style={styles.photoCard}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/200?img=12' }}
                style={styles.photoImage}
                resizeMode="cover"
              />
            </View>

            <TouchableOpacity style={styles.addMoreCard} activeOpacity={0.8}>
              <Icon name="add" size={scale(22)} color={colors.textSecondary} />
              <Text style={styles.addMoreText}>Add more</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.guideCard}>
            <Text style={styles.guideTitle}>What's makes a good gallery?</Text>
            {goodGalleryItems.map((item) => (
              <View key={item.id} style={styles.guideRow}>
                <Icon
                  name={item.good ? 'checkmark' : 'close'}
                  size={scale(16)}
                  color={item.good ? PRIMARY_GREEN : colors.textSecondary}
                />
                <Text style={styles.guideText}>{item.text}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.bottomButtonWrap}>
          <Button title="Continue" onPress={() => navigate('ListingAboutMe')} variant="primary" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  keyboardView: {
    flex: 1,
  },
  progressBar: {
    height: scale(4),
    backgroundColor: colors.border,
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: PRIMARY_GREEN,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerButton: {
    minWidth: scale(40),
  },
  saveExitButton: {
    padding: padding.xs,
  },
  saveExitText: {
    fontSize: fontSize(15),
    fontWeight: '500',
    color: colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: padding.xl,
    paddingTop: margin.lg,
    paddingBottom: margin.xxxl,
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: '700',
    color: PRIMARY_GREEN,
    marginBottom: padding.xs,
  },
  helperText: {
    fontSize: fontSize(12),
    color: colors.textSecondary,
    marginBottom: margin.lg,
  },
  galleryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.md,
    marginBottom: margin.xl,
  },
  photoCard: {
    width: scale(92),
    height: scale(92),
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  addMoreCard: {
    width: scale(92),
    height: scale(92),
    borderRadius: borderRadius.lg,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    gap: padding.xs,
  },
  addMoreText: {
    fontSize: fontSize(13),
    color: colors.text,
  },
  guideCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    padding: padding.lg,
  },
  guideTitle: {
    fontSize: fontSize(16),
    color: colors.text,
    fontWeight: '500',
    marginBottom: padding.md,
  },
  guideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.sm,
    marginBottom: padding.xs,
  },
  guideText: {
    fontSize: fontSize(13),
    color: colors.textSecondary,
  },
  bottomButtonWrap: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: padding.xl,
    paddingVertical: padding.lg,
    backgroundColor: colors.white,
  },
});
