import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, BackHandler, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { goBack, navigate } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin, borderRadius } from '../../utils/responsive';
import { Button } from '../../components';
import CustomIcon, { IconNames } from '../../components/Icon';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../../utils/constants';

export default function BecomeProfessionalIntroScreen() {


  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Do you want to exit the app?',
          [
            { text: 'No', onPress: () => {}, style: 'cancel' },
            { text: 'Yes', onPress: () => BackHandler.exitApp() },
          ]
        );
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        subscription.remove();
      };
    }, [])
  );

  const handleBecomeProfessional = () => {
    navigate('OfferServicesIntro');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header: Green back arrow + Profile on left, title centered */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Become a professional</Text>

      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Heading */}
        <Text style={styles.title}>Want to offer your services on Jolloyard?</Text>
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
    color: COLORS.PRIMARY,
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
    width: scale(350),
    height: scale(350),
  },
  ctaButton: {
    marginTop: margin.lg,
  },
});
