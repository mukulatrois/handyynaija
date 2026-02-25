import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
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

type Props = {
  route: { params?: { serviceName?: string } };
};

export default function ListingPriceScreen({ route }: Props) {
  const serviceName = route.params?.serviceName ?? 'handyman';
  const [price, setPrice] = useState('');

  const handleSave = () => {
    navigate('ListingPhone');
  };

  const handleSaveAndExit = () => {
    handleSave();
    goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '35%' }]} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.headerButton}>
            <Icon name="chevron-back" size={scale(24)} color={PRIMARY_GREEN} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSaveAndExit}
            style={styles.saveExitButton}
            activeOpacity={0.7}
          >
            <Text style={styles.saveExitText}>Save and exit</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Price of your service</Text>
          <Text style={styles.subtitle}>
            This is the price of your {serviceName.toLowerCase()} service.
          </Text>

          {/* Price Input */}
          <Text style={styles.label}>Price:</Text>
          <View style={styles.priceInputRow}>
            <TextInput
              style={styles.priceInput}
              placeholder="Enter Price"
              placeholderTextColor={colors.textMuted}
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
            />
            <Text style={styles.currency}>₦</Text>
          </View>

          {/* Recommendation Section */}
          <Text style={styles.sectionTitle}>
            How much will I make for my services?
          </Text>
          <Text style={styles.recommendation}>
            We recommend that you start with a lower price to get your first
            reviews. You can edit this price anytime.
          </Text>

          <Button
            title="Save"
            onPress={handleSave}
            variant="primary"
            style={styles.saveButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    fontSize: fontSize(16),
    fontWeight: '600',
    color: PRIMARY_GREEN,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: padding.xl,
    paddingTop: margin.xl,
    paddingBottom: margin.xxxl,
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: '700',
    color: colors.text,
    marginBottom: padding.sm,
  },
  subtitle: {
    fontSize: fontSize(14),
    color: colors.textSecondary,
    marginBottom: margin.xl,
  },
  label: {
    fontSize: fontSize(16),
    fontWeight: '500',
    color: colors.text,
    marginBottom: padding.sm,
  },
  priceInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    marginBottom: margin.xxl,
  },
  priceInput: {
    flex: 1,
    fontSize: fontSize(16),
    color: colors.text,
    paddingVertical: padding.lg,
    paddingHorizontal: padding.lg,
  },
  currency: {
    fontSize: fontSize(16),
    color: colors.textMuted,
    paddingHorizontal: padding.lg,
  },
  sectionTitle: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.text,
    marginBottom: padding.md,
  },
  recommendation: {
    fontSize: fontSize(14),
    color: colors.textSecondary,
    lineHeight: fontSize(22),
    marginBottom: margin.xxl,
  },
  saveButton: {
    marginTop: margin.md,
  },
});
