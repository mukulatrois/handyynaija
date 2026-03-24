import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigate } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin, borderRadius } from '../../utils/responsive';
import { Button } from '../../components';
import { COLORS } from '../../utils/constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SLIDES: Array<{
  id: string;
  title: string;
  subtitle: string;
  titleAlign: 'left' | 'center';
  subtitleAlign: 'left' | 'center';
  image: ImageSourcePropType;
}> = [
  {
    id: '1',
    title: 'Offer your at-home services',
    subtitle:
      "Let us know where you can travel to, when you're available, and what services you want to offer.",
    titleAlign: 'left',
    subtitleAlign: 'left',
    image: require('../../Images/c2.png'),
  },
  {
    id: '2',
    title: 'Perform the services',
    subtitle: 'Complete the services for which you have been booked.',
    titleAlign: 'center',
    subtitleAlign: 'center',
    image: require('../../Images/c3.png'),
  },
  {
    id: '3',
    title: 'Get Customers',
    subtitle:
      'Service requests for customers or actively apply for job leads.',
    titleAlign: 'center',
    subtitleAlign: 'center',
    image: require('../../Images/c4.png'),
  },
  {
    id: '4',
    title: 'Earn money',
    subtitle:
      'Receive the payment for the services you have provided on your account.',
    titleAlign: 'center',
    subtitleAlign: 'center',
    image: require('../../Images/c5.png'),
  },
];

export default function OfferServicesIntroScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      const nextIndex = activeIndex + 1;
      flatListRef.current?.scrollToOffset({
        offset: nextIndex * SCREEN_WIDTH,
        animated: true,
      });
      setActiveIndex(nextIndex);
    } else {
      navigate('ProviderSelectCountry');
    }
  };

  const renderSlide = ({ item }: { item: (typeof SLIDES)[0] }) => (
    <View style={styles.slide}>
      <View style={styles.illustrationContainer}>
        <Image
          source={item.image}
          style={styles.slideImage}
          resizeMode="contain"
        />
      </View>
      <Text
        style={[
          styles.title,
          item.titleAlign === 'center' && styles.titleCenter,
        ]}
      >
        {item.title}
      </Text>
      <Text
        style={[
          styles.subtitle,
          item.subtitleAlign === 'center' && styles.subtitleCenter,
        ]}
      >
        {item.subtitle}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header: Exit on right */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('ProviderSelectCountry')} activeOpacity={0.7}>
          <Text style={styles.exitText}>Exit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sliderContainer}>
        <FlatList
          ref={flatListRef}
          data={SLIDES}
          renderItem={renderSlide}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          bounces={false}
          decelerationRate="fast"
        />
      </View>

      <View style={styles.footer}>
        {/* Progress dots */}
        <View style={styles.dotsRow}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === activeIndex && styles.dotActive]}
            />
          ))}
        </View>

        <Button
          title="Next"
          onPress={handleNext}
          variant="primary"
          style={styles.ctaButton}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: padding.xl,
    paddingVertical: padding.lg,
  },
  headerSpacer: {
    width: scale(50),
  },
  headerTitle: {
    fontSize: fontSize(18),
    fontWeight: '600',
    color: '#000',
  },
  exitText: {
    fontSize: fontSize(16),
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
  sliderContainer: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    paddingHorizontal: padding.xl,
    paddingTop: margin.xl,
    flex: 1,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: margin.xxl,
  },
  slideImage: {
    width: scale(300),
    height: scale(300),
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    marginBottom: margin.md,
  },
  titleCenter: {
    textAlign: 'center',
    paddingHorizontal: padding.lg,
  },
  subtitle: {
    fontSize: fontSize(16),
    color: '#000',
    lineHeight: fontSize(22),
    textAlign: 'left',
    marginBottom: margin.xxl,
  },
  subtitleCenter: {
    textAlign: 'center',
    paddingHorizontal: padding.lg,
  },
  footer: {
    paddingHorizontal: padding.xl,
    paddingBottom: margin.xxxl,
    paddingTop: margin.lg,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: margin.xl,
    gap: scale(8),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#E0E0E0',
  },
  dotActive: {
    backgroundColor: COLORS.PRIMARY,
  },
  ctaButton: {
    marginTop: margin.sm,
  },
});
