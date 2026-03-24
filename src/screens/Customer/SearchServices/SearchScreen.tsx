import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
  ImageBackground,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { wp, hp, scale, fontSize, padding, margin, borderRadius } from '../../../utils/responsive';
import Button from '../../../components/Button';
import { navigate } from '../../../navigation/navigationService';
import CustomIcon, { IconNames } from '../../../components/Icon';
import { height, width } from '../../../components/common';
import { COLORS } from '../../../utils/constants';

const CARD_WIDTH = wp(28);

interface CategoryCardProps {
  label: string;
  image: number;
  imageStyle?: any;
  onPress: () => void;
}

const CategoryCard = ({ label, image, imageStyle, onPress }: CategoryCardProps) => {
  const finalImageStyle = imageStyle ? [styles.cardImage, imageStyle] : styles.cardImage;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.cardIconWrap}>
        <Image
          source={image}
          style={finalImageStyle}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.cardText}>{label}</Text>
    </TouchableOpacity>
  );
};

const categories = [
  {
    label: 'Home',
    image: require('../../../Images/serachImg/Home.png'),
    onPress: () => navigate('Home' as any),
    imageStyle: { width: width / 3.5, height: width / 3.5 },
  },
  {
    label: 'Tech & IT',
    image: require('../../../Images/serachImg/Tech.png'),
    onPress: () => navigate('TechIT' as any),
    imageStyle: { width: width / 5, height: width / 5 },
  },
  {
    label: 'Beauty',
    image: require('../../../Images/serachImg/Beauty.png'),
    onPress: () => navigate('Beauty' as any),
    imageStyle: { width: width / 3.5, height: width / 3.5 },
  },
  {
    label: 'Repair &\nMaintainance',
    image: require('../../../Images/serachImg/repair.png'),
    onPress: () => navigate('RepairMaintenance' as any),
    imageStyle: { width: width / 5.5, height: width / 5.5 },
  },
  {
    label: 'Automobile',
    image: require('../../../Images/serachImg/Automobile.png'),
    onPress: () => navigate('Automobile' as any),
    imageStyle: { width: width / 3.5, height: width / 3.5 },
  },
  {
    label: 'Media & Events',
    image: require('../../../Images/serachImg/media.png'),
    onPress: () => navigate('MediaEvent' as any),
    imageStyle: { width: width / 3.5, height: width / 3.5 },
  },
  {
    label: 'Kitchen',
    image: require('../../../Images/serachImg/Kitchen.png'),
    onPress: () => navigate('Home' as any),
    imageStyle: { width: width / 4.5, height: width / 4.5 },
  },
  {
    label: 'Furniture',
    image: require('../../../Images/serachImg/interior.png'),
    onPress: () => navigate('Home' as any),
    imageStyle: { width: width / 3.5, height: width / 3.5 },
  },
  {
    label: 'Others',
    image: require('../../../Images/serachImg/Others.png'),
    onPress: () => navigate('Others' as any),
    imageStyle: { width: width / 5.5, height: width / 5.5 },
  },
];

export default function HandyNaijaScreen() {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Do you want to exit the app?',
          [
            { text: 'No', onPress: () => { }, style: 'cancel' },
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

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <ImageBackground source={require("../../../Images/homebg.png")} style={{ flex: 1 }}>
        <View style={styles.header}>
          <Image source={require('../../../Images/logo2.png')} tintColor="white" style={{ width: width / 4, height: height / 30, marginBottom: 10 }} />

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => navigate('SearchService')}
            >
              <CustomIcon name={IconNames.search} size={fontSize(22)} color={"white"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate('Notification')}
              style={styles.headerBtn}>
              <CustomIcon name={IconNames.notifications} size={fontSize(22)} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>All Categories</Text>
          <Text style={styles.sectionSubtitle}>Need a helping hand today ?</Text>

          <View style={styles.grid}>
            {categories.map((item) => (
              <CategoryCard
                key={item.label}
                label={item.label}
                image={item.image}
                imageStyle={item.imageStyle}
                onPress={item.onPress}
              />
            ))}
          </View>
        </View>

        {/* ADD ADDRESS BUTTON */}
        <View style={styles.addBtnWrapper}>
          <Button
            title="＋ Add address"
            onPress={() => { }}
            variant="primary"
            style={styles.addBtn}
            textStyle={styles.addBtnText}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: padding.xl,
    marginTop: margin.sm,
  },

  headerBtn: {
    width: scale(42),
    height: scale(42),
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    paddingHorizontal: padding.xl,
    paddingTop: hp(0.8),
    paddingBottom: hp(12),
  },

  sectionTitle: {
    fontSize: fontSize(25),
    color: '#fff',
    fontWeight: '600',
    marginBottom: margin.xs,
    marginTop: margin.lg,
  },

  sectionSubtitle: {
    fontSize: fontSize(14),
    color: 'rgba(255,255,255,0.72)',
    fontWeight: '400',
    marginBottom: margin.lg,

  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: hp(1.3),
    marginTop: margin.lg,
  },

  card: {
    width: CARD_WIDTH,
    height: scale(115),
    borderRadius: borderRadius.lg,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(1),
    paddingHorizontal: padding.sm,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: scale(6),
    elevation: 5,
  },

  cardIconWrap: {
    width: '100%',
    height: scale(55),
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardImage: {
    width: CARD_WIDTH * 0.56,
    height: CARD_WIDTH * 0.42,
  },

  cardText: {
    textAlign: 'center',
    fontSize: fontSize(12),
    fontWeight: '600',
    color: '#1D1D1D',
    marginTop: margin.xs,
  },

  addBtnWrapper: {
    position: 'absolute',
    bottom: hp(4),
    left: padding.xl,
    right: padding.xl,
  },

  addBtn: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: borderRadius.lg,
    paddingVertical: padding.lg,
  },

  addBtnText: {
    color: '#fff',
    fontSize: fontSize(14),
    fontWeight: '500',
    textTransform: 'uppercase',
  },
});
