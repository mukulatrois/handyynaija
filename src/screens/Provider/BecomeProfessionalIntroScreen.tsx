import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { goBack, navigate } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin, borderRadius } from '../../utils/responsive';
import { Button } from '../../components';
import CustomIcon, { IconNames } from '../../components/Icon';

export default function BecomeProfessionalIntroScreen() {
  const handleBecomeProfessional = () => {
    navigate('OfferServicesIntro');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header: Green back arrow + Profile on left, title centered */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goBack}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <CustomIcon name={IconNames.arrowBack} size={scale(24)} color="#3FA565" />
          <Text style={styles.profileLabel}>Profile</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Become at professional</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Heading */}
        <Text style={styles.title}>Want to offer your services on HandyNaija?</Text>
        <Text style={styles.subtitle}>
          Create your professional profile and start earning money
        </Text>

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require('../../Images/c1.png')}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

        <Button
          title="Become a professional"
          onPress={handleBecomeProfessional}
          variant="primary"
          style={styles.ctaButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: padding.xl,
    paddingVertical: padding.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileLabel: {
    fontSize: fontSize(16),
    color: '#3FA565',
    fontWeight: '600',
    marginLeft: scale(4),
  },
  headerTitle: {
    fontSize: fontSize(18),
    fontWeight: '600',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: scale(80),
  },
  scrollContent: {
    flexGrow: 1,
    padding: padding.xl,
    paddingBottom: margin.xxxl,
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: margin.md,
    paddingHorizontal: padding.lg,
  },
  subtitle: {
    fontSize: fontSize(16),
    color: '#000',
    lineHeight: fontSize(22),
    textAlign: 'center',
    marginBottom: margin.xxl,
    paddingHorizontal: padding.lg,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: margin.xxl,
  },
  illustrationImage: {
    width: scale(200),
    height: scale(200),
  },
  ctaButton: {
    marginTop: margin.lg,
  },
});
