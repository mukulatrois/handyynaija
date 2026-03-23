import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ViewStyle,
  ImageStyle,
  GestureResponderEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { wp, hp, scale, fontSize, padding, margin, borderRadius } from '../../../utils/responsive';
import Button from '../../../components/Button';
import { navigate } from '../../../navigation/navigationService';
import CustomIcon, { IconNames } from '../../../components/Icon';
import ServiceScreenHeader from './ServiceScreenHeader';

const CIRCLE = wp(28);

interface CircleProps {
  label: string;
  image: ImageSourcePropType;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  onPress?: (event: GestureResponderEvent) => void;
}

const Circle = ({ label, image, style, imageStyle, onPress }: CircleProps) => (
  <TouchableOpacity style={[styles.circle, style]} onPress={onPress}>
    <Image
      source={image}
      style={[styles.iconImage, imageStyle]}
      resizeMode="contain"
    />
    <Text style={styles.text}>{label}</Text>
  </TouchableOpacity>
);

export default function HandyNaijaScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ServiceScreenHeader
        title="Jolloyard"
        titleColor="#000"
        rightElement={
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.headerBtn}>
              <CustomIcon name={IconNames.search} size={fontSize(18)} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn}>
              <CustomIcon name={IconNames.notifications} size={fontSize(18)} color="#000" />
            </TouchableOpacity>
          </View>
        }
      />
        <View style={styles.leftBar} />
        <View style={styles.rightBar} />
        <View style={styles.diagonal} />
      {/* LEFT COLUMN */}
      <Circle
        image={require('../../../Images/serachImg/Home.png')}
        imageStyle={{ width: CIRCLE * 0.65, height: CIRCLE * 0.45 }}
        label="Home"
        style={{ top: '22%', left: '6%' }}
        onPress={() => navigate('Home' as any)}
      />

      <Circle
        image={require('../../../Images/serachImg/Beauty.png')}
        imageStyle={{}}
        label="Beauty"
        style={{ top: '43%', left: '6%' }}
        onPress={() => navigate('Beauty' as any)}
      />

      <Circle
        image={require('../../../Images/serachImg/media.png')}
        imageStyle={{ width: CIRCLE * 0.65, height: CIRCLE * 0.45 }}
        label="Media & Events"
        style={{ top: '64%', left: '6%' }}
        onPress={() => navigate('MediaEvent' as any)}
      />

      {/* RIGHT COLUMN */}
      <Circle
        image={require('../../../Images/serachImg/Tech.png')}
        imageStyle={{}}
        label="Tech & IT Support"
        style={{ top: '22%', right: '6%' }}
        onPress={() => navigate('TechIT' as any)}
      />

      <Circle
        image={require('../../../Images/serachImg/Automobile.png')}
        imageStyle={{ width: CIRCLE * 0.65, height: CIRCLE * 0.45 }}
        label="Automobile"
        style={{ top: '43%', right: '6%' }}
        onPress={() => navigate('Automobile' as any)}
      />

      <Circle
        image={require('../../../Images/serachImg/Others.png')}
        imageStyle={{ width: CIRCLE * 0.65, height: CIRCLE * 0.45 }}
        label="Others"
        style={{ top: '64%', right: '6%' }}
        onPress={() => navigate('Others' as any)}
      />

      {/* CENTER */}
      <Circle
        image={require('../../../Images/serachImg/repair.png')}
        imageStyle={{ width: CIRCLE * 0.65, height: CIRCLE * 0.30 }}
        label="Repair & Maintenance"
        style={{ top: '44%', alignSelf: 'center' }}
        onPress={() => navigate('RepairMaintenance' as any)}
      />

      {/* ADD ADDRESS BUTTON */}
      <View style={styles.addBtnWrapper}>
        <Button
          title="Add addressioio"
          onPress={() => { }}
          variant="primary"
          style={styles.addBtn}
          textStyle={styles.addBtnText}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3FA565',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: padding.xl,
    marginTop: margin.md,
  },

  title: {
    fontSize: fontSize(28),
    color: '#fff',
    fontWeight: '600',
  },

  headerBtn: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(23),
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: margin.md,
  },


  /* N SHAPE */
  leftBar: {
    position: 'absolute',
    left: '15%',
    top: '28%',
    width: scale(45),
    height: '45%',
    backgroundColor: '#D9D9D9',
    borderRadius: borderRadius.xl,
  },

  rightBar: {
    position: 'absolute',
    right: '15%',
    top: '28%',
    width: scale(45),
    height: '45%',
    backgroundColor: '#D9D9D9',
    borderRadius: borderRadius.xl,
  },

  diagonal: {
    position: 'absolute',
    left: '45%',
    top: '25%',
    width: scale(45),
    height: '52%',
    backgroundColor: '#D9D9D9',
    borderRadius: borderRadius.xl,
    transform: [{ rotate: '150deg' }],
  },

  circle: {
    position: 'absolute',
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: padding.md,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: scale(8),
    elevation: 8,
  },

  iconImage: {
    width: CIRCLE * 0.38,
    height: CIRCLE * 0.38,
    marginBottom: margin.sm,
  },

  text: {
    textAlign: 'center',
    fontSize: fontSize(14),
    fontWeight: '600',
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
    fontSize: fontSize(18),
    fontWeight: '500',
  },
});
