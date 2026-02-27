import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { goBack, navigate } from '../../../navigation/navigationService';
import { scale, fontSize, padding, margin } from '../../../utils/responsive';

interface ServiceItem {
  id: string;
  title: string;
  image: any;
}

const ALL_SERVICES: ServiceItem[] = [
  { id: '1', title: 'Cleaning', image: require('../../../Images/serachImg/Cleaning.png') },
  { id: '2', title: 'Ironing', image: require('../../../Images/serachImg/ironing.png') },
  { id: '3', title: 'Handyman', image: require('../../../Images/serachImg/Handyman.png') },
  { id: '4', title: 'Painting', image: require('../../../Images/serachImg/Painting.png') },
  { id: '5', title: 'Interior Design', image: require('../../../Images/serachImg/interior.png') },
  { id: '6', title: 'Pest Control', image: require('../../../Images/serachImg/PestControl.png') },
  { id: '7', title: 'Kitchen Installation', image: require('../../../Images/serachImg/Kitchen.png') },
  { id: '8', title: 'Salon at home', image: require('../../../Images/serachImg/Salon.png') },
  { id: '9', title: 'Manicure & Pedicure', image: require('../../../Images/serachImg/Manicure.png') },
  { id: '10', title: 'Haircut & Styling', image: require('../../../Images/serachImg/Haircut.png') },
  { id: '11', title: 'Photo/Video grapher', image: require('../../../Images/serachImg/Photo.png') },
  { id: '12', title: 'Birthday/ Event Planner', image: require('../../../Images/serachImg/Birthday.png') },
  { id: '13', title: 'DJ & Sounds Setup', image: require('../../../Images/serachImg/Sounds.png') },
  { id: '14', title: 'MC', image: require('../../../Images/serachImg/MC.png') },
  { id: '15', title: 'Comedian', image: require('../../../Images/serachImg/Comedian.png') },
  { id: '16', title: 'Electrician', image: require('../../../Images/serachImg/Electrician.png') },
  { id: '17', title: 'Plumber', image: require('../../../Images/serachImg/Plumber.png') },
  { id: '18', title: 'Appliances', image: require('../../../Images/serachImg/Appliances.png') },
  { id: '19', title: 'AC Servicing', image: require('../../../Images/serachImg/AC.png') },
  { id: '20', title: 'Car Wash', image: require('../../../Images/serachImg/Car.png') },
  { id: '21', title: 'Bike Services', image: require('../../../Images/serachImg/Bike.png') },
  { id: '22', title: 'Car Repair', image: require('../../../Images/serachImg/CarRepair.png') },
  { id: '23', title: 'Battery Jumpstart', image: require('../../../Images/serachImg/Battery.png') },
  { id: '24', title: 'House Shifting', image: require('../../../Images/serachImg/houseShifting.png') },
  { id: '25', title: 'Pickup and Delivery', image: require('../../../Images/serachImg/Delivery.png') },
  { id: '26', title: 'Computer Repair', image: require('../../../Images/serachImg/Computer.png') },
  { id: '27', title: 'Mobile Repair', image: require('../../../Images/serachImg/Mobile.png') },
  { id: '28', title: 'Software installation', image: require('../../../Images/serachImg/Software.png') },
  { id: '29', title: 'Internet Setup', image: require('../../../Images/serachImg/Internet.png') },
];

export default function ServiceSearchScreen() {
  const [query, setQuery] = useState('');

  const filteredServices = useMemo(() => {
    if (!query.trim()) return ALL_SERVICES;
    const q = query.trim().toLowerCase();
    return ALL_SERVICES.filter((s) => s.title.toLowerCase().includes(q));
  }, [query]);

  const handleServicePress = (item: ServiceItem) => {
    navigate('SelectDateTime', { serviceTitle: item.title });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Search bar + close */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={scale(20)}
            color="#777"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Find the service you need"
            placeholderTextColor="#777"
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
        </View>

        <TouchableOpacity
          style={styles.closeBtn}
          onPress={goBack}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={scale(20)} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Services list with images */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionTitle}>Most popular in your area</Text>

        {filteredServices.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.serviceRow}
            onPress={() => handleServicePress(item)}
            activeOpacity={0.7}
          >
            <Image source={item.image} style={styles.serviceIcon} resizeMode="contain" />
            <Text style={styles.serviceText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.lg,
    paddingTop: padding.lg,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 14,
    paddingHorizontal: padding.md,
    paddingVertical: scale(8),
  },
  searchIcon: {
    marginRight: margin.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize(15),
    color: '#000',
    padding: 0,
  },
  closeBtn: {
    marginLeft: margin.md,
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: padding.lg,
    paddingTop: margin.lg,
    paddingBottom: margin.xxl,
  },
  sectionTitle: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: '#000',
    marginBottom: margin.lg,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(14),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  serviceIcon: {
    width: scale(44),
    height: scale(44),
    marginRight: margin.lg,
  },
  serviceText: {
    flex: 1,
    fontSize: fontSize(15),
    color: '#000',
  },
});

