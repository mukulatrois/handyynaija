import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { goBack, navigate } from '../../navigation/navigationService';
import { Button } from '../../components';
import { scale, fontSize, padding, margin, borderRadius } from '../../utils/responsive';
import { setProviderPhotoSelected } from '../../providerRegister/providerRegisterStore';

const PRIMARY_GREEN = '#3FA565';

export default function ProviderUploadPhotoScreen() {
  const [hasPhoto, setHasPhoto] = useState(false);

  const handleSelectPhoto = () => {
    // Dummy: mark photo as selected and show placeholder avatar.
    setHasPhoto(true);
    setProviderPhotoSelected(true);
  };

  const handleContinue = () => {
    if (!hasPhoto) return;
    navigate('ProviderVerifyPhoto');
    
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>

      {/* Header with back only */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goBack}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={scale(22)} color={PRIMARY_GREEN} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title & description */}
        <Text style={styles.title}>Profile Picture</Text>
        <Text style={styles.subtitle}>
          This will be the picture that clients will see of you. Try to make it as trustworthy as
          possible.
        </Text>

        {/* Profile circle */}
        <TouchableOpacity
          style={[styles.photoCircle, hasPhoto && styles.photoCircleSelected]}
          onPress={handleSelectPhoto}
          activeOpacity={0.8}
        >
          {hasPhoto ? (
            <>
              <Image
                source={require('../../Images/logo.png')}
                style={styles.photoImage}
                resizeMode="cover"
              />
            </>
          ) : (
            <Ionicons name="add" size={scale(28)} color={PRIMARY_GREEN} />
          )}
        </TouchableOpacity>

        {/* Guidance card */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>What makes a good profile picture?</Text>

          <View style={styles.examplesRow}>
            <View style={styles.exampleItem}>
              <View style={styles.exampleAvatarGood}>
                <Ionicons name="person-outline" size={scale(32)} color="#fff" />
              </View>
              <Ionicons
                name="checkmark-circle"
                size={scale(20)}
                color={PRIMARY_GREEN}
                style={styles.exampleBadge}
              />
            </View>

            <View style={styles.exampleItem}>
              <View style={styles.exampleAvatarBad}>
                <Ionicons name="person-outline" size={scale(32)} color="#fff" />
              </View>
              <Ionicons
                name="close-circle"
                size={scale(20)}
                color="#EF4444"
                style={styles.exampleBadge}
              />
            </View>
          </View>

          <View style={styles.tipRow}>
            <Ionicons name="checkmark-circle" size={scale(18)} color={PRIMARY_GREEN} />
            <Text style={styles.tipText}>Good lighting</Text>
          </View>
          <View style={styles.tipRow}>
            <Ionicons name="checkmark-circle" size={scale(18)} color={PRIMARY_GREEN} />
            <Text style={styles.tipText}>Good resolution</Text>
          </View>
          <View style={styles.tipRow}>
            <Ionicons name="checkmark-circle" size={scale(18)} color={PRIMARY_GREEN} />
            <Text style={styles.tipText}>Visible face</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom continue button */}
      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          style={styles.continueButton}
          disabled={!hasPhoto}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: padding.xl,
    paddingVertical: padding.md,
  },
  backButton: {
    width: scale(40),
    alignItems: 'flex-start',
  },
  title: {
    fontSize: fontSize(22),
    fontWeight: '700',
    color: '#000',
    marginBottom: margin.xs,
    paddingHorizontal: padding.xl,
  },
  subtitle: {
    fontSize: fontSize(14),
    color: '#555',
    lineHeight: fontSize(20),
    marginBottom: margin.xl,
    paddingHorizontal: padding.xl,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: margin.lg,
    paddingBottom: margin.xxxl,
  },
  photoCircle: {
    width: scale(160),
    height: scale(160),
    borderRadius: scale(80),
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D4D4D4',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: margin.xl,
  },
  photoCircleSelected: {
    backgroundColor: '#E5F5EC',
    borderColor: PRIMARY_GREEN,
  },
  photoImage: {
    width: '80%',
    height: '80%',
    borderRadius: borderRadius.round,
  },
  tipsCard: {
    marginHorizontal: padding.xl,
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xl,
    padding: padding.lg,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  tipsTitle: {
    fontSize: fontSize(15),
    fontWeight: '600',
    color: '#000',
    marginBottom: margin.md,
  },
  examplesRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: margin.md,
  },
  exampleItem: {
    alignItems: 'center',
  },
  exampleAvatarGood: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    backgroundColor: PRIMARY_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exampleAvatarBad: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    backgroundColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exampleBadge: {
    marginTop: margin.xs,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: margin.sm,
    gap: padding.sm,
  },
  tipText: {
    fontSize: fontSize(14),
    color: '#111827',
  },
  footer: {
    paddingHorizontal: padding.xl,
    paddingBottom: margin.xl,
    paddingTop: padding.sm,
  },
  continueButton: {
  },
});

