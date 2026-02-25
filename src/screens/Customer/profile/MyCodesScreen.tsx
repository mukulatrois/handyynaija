import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomIcon from '../../../components/Icon';
import { goBack, navigate } from '../../../navigation/navigationService';
import { scale, fontSize, padding } from '../../../utils/responsive';

export default function MyCodesScreen() {
  const [promoCode, setPromoCode] = useState('');
  const [addedCodes, setAddedCodes] = useState<string[]>([]);

  const canAdd = promoCode.trim().length > 0;

  const handleAddCode = () => {
    if (!canAdd) return;
    setAddedCodes((prev) => [...prev, promoCode.trim()]);
    setPromoCode('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.headerLeft}>
          <CustomIcon name="arrow-back" size={scale(24)} color="#3FA565" />
          <Text style={styles.headerTitle}>My codes</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Promo Code Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter promo code"
          placeholderTextColor="#999"
          value={promoCode}
          onChangeText={setPromoCode}
          autoCapitalize="characters"
        />

        {/* Add Button */}
        <TouchableOpacity
          style={[styles.addButton, canAdd && styles.addButtonActive]}
          onPress={handleAddCode}
          disabled={!canAdd}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.addButtonText,
              canAdd && styles.addButtonTextActive,
            ]}
          >
            Add
          </Text>
        </TouchableOpacity>

        {/* Referral Offer Box */}
        <TouchableOpacity
          style={styles.offerBox}
          onPress={() => navigate('ShareAndEarn')}
          activeOpacity={0.8}
        >
          <CustomIcon
            name="gift"
            size={scale(32)}
            color="#E53935"
          />
          <View style={styles.offerText}>
            <Text style={styles.offerTitle}>Do you want a ₦10 discount?</Text>
            <Text style={styles.offerDesc}>
              Share the app with your friends and earn ₦10 when they make their
              first booking!
            </Text>
          </View>
        </TouchableOpacity>

        {/* Empty State or Added Codes List */}
        <View style={styles.codesSection}>
          {addedCodes.length > 0 ? (
            addedCodes.map((code, index) => (
              <View key={index} style={styles.codeItem}>
                <CustomIcon
                  name="pricetag"
                  size={scale(20)}
                  color="#3FA565"
                />
                <Text style={styles.codeItemText}>{code}</Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.tagsIcon}>
                <CustomIcon
                  name="pricetag-outline"
                  size={scale(56)}
                  color="#D0D0D0"
                />
                <View style={styles.tagOverlay}>
                  <CustomIcon
                    name="pricetag-outline"
                    size={scale(48)}
                    color="#999"
                  />
                </View>
              </View>
              <Text style={styles.emptyStateText}>
                When you add a promotional code, it will appear here
              </Text>
            </View>
          )}
        </View>
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
    fontWeight: '600',
    color: '#000',
  },
  scrollContent: {
    padding: padding.lg,
  },
  input: {
    backgroundColor: '#E8E8E8',
    borderRadius: scale(12),
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    fontSize: fontSize(16),
    color: '#000',
    marginBottom: scale(12),
  },
  addButton: {
    backgroundColor: '#E8E8E8',
    borderRadius: scale(12),
    paddingVertical: scale(16),
    alignItems: 'center',
    marginBottom: scale(24),
  },
  addButtonActive: {
    backgroundColor: '#3FA565',
  },
  addButtonText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: '#999',
  },
  addButtonTextActive: {
    color: '#fff',
  },
  offerBox: {
    flexDirection: 'row',
    backgroundColor: '#E8F5EC',
    borderRadius: scale(12),
    padding: scale(16),
    alignItems: 'center',
    gap: scale(16),
    marginBottom: scale(32),
  },
  offerText: {
    flex: 1,
  },
  offerTitle: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: '#000',
    marginBottom: scale(4),
  },
  offerDesc: {
    fontSize: fontSize(14),
    color: '#555',
    lineHeight: scale(20),
  },
  codesSection: {
    alignItems: 'center',
    paddingVertical: scale(40),
  },
  emptyState: {
    alignItems: 'center',
  },
  tagsIcon: {
    position: 'relative',
    marginBottom: scale(16),
  },
  tagOverlay: {
    position: 'absolute',
    top: scale(8),
    left: scale(12),
  },
  emptyStateText: {
    fontSize: fontSize(15),
    color: '#777',
    textAlign: 'center',
    lineHeight: scale(22),
  },
  codeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: scale(16),
    borderRadius: scale(12),
    marginBottom: scale(8),
    width: '100%',
    gap: scale(12),
  },
  codeItemText: {
    fontSize: fontSize(16),
    fontWeight: '500',
    color: '#000',
  },
});
