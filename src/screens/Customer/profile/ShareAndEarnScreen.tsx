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

const socialIcons = [
  { name: 'logo-whatsapp', color: '#25D366', id: 'whatsapp' },
  { name: 'logo-facebook', color: '#1877F2', id: 'facebook' },
  { name: 'logo-instagram', color: '#E4405F', id: 'instagram' },
  { name: 'ellipsis-horizontal', color: '#999', id: 'more' },
];

export default function ShareAndEarnScreen() {
  const [referralCode, setReferralCode] = useState('');

  const handleDiscoverCode = () => {
    setReferralCode('HANDY10');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.headerLeft}>
          <CustomIcon name="arrow-back" size={scale(24)} color="#3FA565" />
          <Text style={styles.headerTitle}>Share and earn money</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Illustration Section */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBg}>
            {/* Person icons with plus - top left */}
            <View style={[styles.personIcon, styles.personTopLeft]}>
              <CustomIcon name="person-outline" size={scale(36)} color="#3FA565" />
              <View style={styles.plusBadge}>
                <Text style={styles.plusText}>+</Text>
              </View>
            </View>
            {/* Person icon - bottom left */}
            <View style={[styles.personIcon, styles.personBottomLeft]}>
              <CustomIcon name="person-outline" size={scale(32)} color="#3FA565" />
              <View style={styles.plusBadge}>
                <Text style={styles.plusText}>+</Text>
              </View>
            </View>
            {/* Person icon - right */}
            <View style={[styles.personIcon, styles.personRight]}>
              <CustomIcon name="person-outline" size={scale(34)} color="#3FA565" />
              <View style={styles.plusBadge}>
                <Text style={styles.plusText}>+</Text>
              </View>
            </View>
            {/* Sparkles */}
            <Text style={[styles.sparkle, styles.sparkle1]}>✨</Text>
            <Text style={[styles.sparkle, styles.sparkle2]}>✨</Text>
            <Text style={[styles.sparkle, styles.sparkle3]}>✨</Text>
            {/* Center - Gift box with money */}
            <View style={styles.giftSection}>
              <View style={styles.giftBox}>
                <Text style={styles.giftEmoji}>🎁</Text>
                <View style={styles.moneyStack}>
                  <Text style={styles.nairaSymbol}>₦</Text>
                  <Text style={styles.nairaSymbol}>₦</Text>
                  <Text style={styles.nairaSymbol}>₦</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Headline */}
        <Text style={styles.headline}>
          Receive ₦10 and give others ₦10
        </Text>

        {/* Bullet Points */}
        <View style={styles.bulletRow}>
          <Text style={styles.bulletEmoji}>🤑</Text>
          <Text style={styles.bulletText}>
            Earn ₦10 discount for each friend you bring to Handynaija
          </Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletEmoji}>🎁</Text>
          <Text style={styles.bulletText}>
            By registering with your code, your friends will receive an
            additional ₦10 as a gift
          </Text>
        </View>

        {/* Discover Code Button */}
        <TouchableOpacity
          style={styles.discoverButton}
          onPress={handleDiscoverCode}
          activeOpacity={0.7}
        >
          <Text style={styles.discoverButtonText}>Discover code</Text>
        </TouchableOpacity>

        {/* Share Section */}
        <Text style={styles.shareLabel}>Share code:</Text>
        {referralCode ? (
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>{referralCode}</Text>
          </View>
        ) : null}
        <View style={styles.socialRow}>
          {socialIcons.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.socialButton, { backgroundColor: item.color }]}
              activeOpacity={0.7}
            >
              <CustomIcon
                name={item.name}
                size={scale(24)}
                color="#fff"
              />
            </TouchableOpacity>
          ))}
        </View>

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
    fontWeight: '600',
    color: '#000',
  },
  scrollContent: {
    paddingHorizontal: padding.lg,
    paddingTop: scale(24),
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: scale(28),
  },
  illustrationBg: {
    width: scale(280),
    height: scale(220),
    borderRadius: scale(24),
    backgroundColor: '#FFF9E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  personIcon: {
    position: 'absolute',
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E8F5EC',
  },
  personTopLeft: {
    top: scale(20),
    left: scale(24),
  },
  personBottomLeft: {
    bottom: scale(30),
    left: scale(40),
  },
  personRight: {
    top: scale(50),
    right: scale(30),
  },
  plusBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    backgroundColor: '#3FA565',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: {
    color: '#fff',
    fontSize: fontSize(12),
    fontWeight: '700',
  },
  sparkle: {
    position: 'absolute',
    fontSize: scale(20),
  },
  sparkle1: { top: scale(40), right: scale(80) },
  sparkle2: { bottom: scale(60), left: scale(60) },
  sparkle3: { top: scale(100), left: scale(50) },
  giftSection: {
    alignItems: 'center',
  },
  giftBox: {
    alignItems: 'center',
  },
  giftEmoji: {
    fontSize: scale(56),
    marginBottom: scale(-8),
  },
  moneyStack: {
    flexDirection: 'row',
    gap: scale(4),
  },
  nairaSymbol: {
    fontSize: scale(24),
    fontWeight: '700',
    color: '#2E7D32',
  },
  headline: {
    fontSize: fontSize(22),
    fontWeight: '700',
    color: '#3FA565',
    textAlign: 'center',
    marginBottom: scale(20),
    lineHeight: scale(28),
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: scale(14),
    gap: scale(10),
  },
  bulletEmoji: {
    fontSize: scale(20),
  },
  bulletText: {
    flex: 1,
    fontSize: fontSize(15),
    color: '#333',
    lineHeight: scale(22),
  },
  discoverButton: {
    backgroundColor: '#E8E8E8',
    borderRadius: scale(12),
    paddingVertical: scale(16),
    alignItems: 'center',
    marginTop: scale(8),
    marginBottom: scale(28),
  },
  discoverButtonText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: '#000',
  },
  shareLabel: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: '#000',
    marginBottom: scale(12),
  },
  codeBox: {
    backgroundColor: '#F5F5F5',
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
    marginBottom: scale(12),
  },
  codeText: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: '#3FA565',
    letterSpacing: 2,
  },
  socialRow: {
    flexDirection: 'row',
    gap: scale(16),
  },
  socialButton: {
    width: scale(52),
    height: scale(52),
    borderRadius: scale(26),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
