import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  scale,
  fontSize,
  padding,
  margin,
  borderRadius,
  wp,
} from '../../utils/responsive';
import { colors } from '../../theme/colors';
import { goBack, navigate } from '../../navigation/navigationService';

const PRIMARY_GREEN = '#3FA565';

const mainCategories = [
  { id: 'home', title: 'Home', image: require('../../Images/serachImg/Home.png') },
  { id: 'tech', title: 'Tech & IT Support', image: require('../../Images/serachImg/Tech.png') },
  { id: 'beauty', title: 'Beauty', image: require('../../Images/serachImg/Beauty.png') },
  { id: 'repair', title: 'Repair & Maintenance', image: require('../../Images/serachImg/repair.png') },
  { id: 'auto', title: 'Automobile', image: require('../../Images/serachImg/Automobile.png') },
  { id: 'media', title: 'Media & Events', image: require('../../Images/serachImg/media.png') },
  { id: 'others', title: 'Others', image: require('../../Images/serachImg/Others.png') },
];

const homeSubCategories = [
  { id: 'cleaning', title: 'Cleaning', image: require('../../Images/serachImg/Cleaning.png') },
  { id: 'ironing', title: 'Ironing', image: require('../../Images/serachImg/ironing.png') },
  { id: 'handyman', title: 'Handyman', image: require('../../Images/serachImg/Handyman.png') },
  { id: 'painting', title: 'Painting', image: require('../../Images/serachImg/Painting.png') },
  { id: 'interior', title: 'Interior Design', image: require('../../Images/serachImg/interior.png') },
  { id: 'pest', title: 'Pest Control', image: require('../../Images/serachImg/PestControl.png') },
  { id: 'kitchen', title: 'Kitchen Installation', image: require('../../Images/serachImg/Kitchen.png') },
];

const beautySubCategories = [
  { id: 'salon', title: 'Salon at home', image: require('../../Images/serachImg/Salon.png') },
  { id: 'manicure', title: 'Manicure & Pedicure', image: require('../../Images/serachImg/Manicure.png') },
  { id: 'haircut', title: 'Haircut & Styling', image: require('../../Images/serachImg/Haircut.png') },
];

const mediaSubCategories = [
  { id: 'photo', title: 'Photo/Video grapher', image: require('../../Images/serachImg/Photo.png') },
  { id: 'birthday', title: 'Birthday/ Event Planner', image: require('../../Images/serachImg/Birthday.png') },
  { id: 'dj', title: 'DJ & Sounds Setup', image: require('../../Images/serachImg/Sounds.png') },
  { id: 'mc', title: 'MC', image: require('../../Images/serachImg/MC.png') },
  { id: 'comedian', title: 'Comedian', image: require('../../Images/serachImg/Comedian.png') },
];

const repairSubCategories = [
  { id: 'electrician', title: 'Electrician', image: require('../../Images/serachImg/Electrician.png') },
  { id: 'plumber', title: 'Plumber', image: require('../../Images/serachImg/Plumber.png') },
  { id: 'appliances', title: 'Appliances', image: require('../../Images/serachImg/Appliances.png') },
  { id: 'ac', title: 'AC Servicing', image: require('../../Images/serachImg/AC.png') },
];

const autoSubCategories = [
  { id: 'carwash', title: 'Car Wash', image: require('../../Images/serachImg/Car.png') },
  { id: 'bike', title: 'Bike Services', image: require('../../Images/serachImg/Bike.png') },
  { id: 'carrepair', title: 'Car Repair', image: require('../../Images/serachImg/CarRepair.png') },
  { id: 'battery', title: 'Battery Jumpstart', image: require('../../Images/serachImg/Battery.png') },
];

const CIRCLE_SIZE = wp(20);
const CIRCLE_SIZE_SUB = wp(22);

export default function CreateListingScreen() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<{ id: string; title: string } | null>(
    null
  );

  const subItemsMap: Record<string, typeof homeSubCategories> = {
    home: homeSubCategories,
    beauty: beautySubCategories,
    media: mediaSubCategories,
    repair: repairSubCategories,
    auto: autoSubCategories,
  };
  const subItems = selectedCategory ? subItemsMap[selectedCategory.id] ?? [] : [];
  const displayItems = selectedCategory ? subItems : mainCategories;

  const filteredItems = search
    ? displayItems.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    : displayItems;

  const handleCategoryPress = (cat: (typeof mainCategories)[0]) => {
    if (subItemsMap[cat.id]) {
      setSelectedCategory({ id: cat.id, title: cat.title });
    }
  };

  const handleBreadcrumbPress = () => {
    setSelectedCategory(null);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: '33%' }]} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Icon name="chevron-back" size={scale(24)} color={PRIMARY_GREEN} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create your listing</Text>
        <Text style={styles.subtitle}>
          Select or search for the service you want to offer
        </Text>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Icon
            name="search-outline"
            size={scale(20)}
            color={colors.textMuted}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Handyman, cleaning, ironing"
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
        </View>

        {/* Breadcrumb: ← Home */}
        {selectedCategory && (
          <TouchableOpacity
            style={styles.breadcrumb}
            onPress={handleBreadcrumbPress}
            activeOpacity={0.7}
          >
            <Icon name="chevron-back" size={scale(20)} color={PRIMARY_GREEN} />
            <Text style={styles.breadcrumbText}>{selectedCategory.title}</Text>
          </TouchableOpacity>
        )}

        {/* Categories Grid - 3 columns for sub-categories */}
        <View style={[styles.categoriesGrid, selectedCategory && styles.categoriesGridThreeCol]}>
          {selectedCategory ? (
            filteredItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.categoryCircle, styles.categoryCircleThreeCol]}
                activeOpacity={0.7}
                onPress={() => navigate('ListingPrice', { serviceName: item.title })}
              >
                <View style={[styles.categoryIconWrap, styles.categoryIconWrapSub]}>
                  <Image
                    source={item.image}
                    style={styles.categoryImageSub}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.categoryLabel} numberOfLines={2}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            filteredItems.map((cat, index) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryCircle,
                  index % 2 === 1 && styles.categoryCircleOffset,
                ]}
                activeOpacity={0.7}
                onPress={() => handleCategoryPress(cat)}
              >
                <View style={styles.categoryIconWrap}>
                  <Image
                    source={cat.image}
                    style={styles.categoryImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.categoryLabel} numberOfLines={2}>
                  {cat.title}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
  },
  backButton: {
    padding: padding.xs,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    paddingHorizontal: padding.xl,
    paddingBottom: margin.xxxl,
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: '700',
    color: PRIMARY_GREEN,
    marginBottom: padding.sm,
  },
  subtitle: {
    fontSize: fontSize(14),
    color: colors.textSecondary,
    marginBottom: margin.xl,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    paddingHorizontal: padding.lg,
    marginBottom: margin.xxl,
  },
  searchIcon: {
    marginRight: padding.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize(16),
    color: colors.text,
    paddingVertical: padding.lg,
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: margin.lg,
    gap: padding.xs,
  },
  breadcrumbText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.text,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -padding.sm,
  },
  categoriesGridThreeCol: {
    marginTop: 0,
  },
  categoryCircle: {
    width: '50%',
    alignItems: 'center',
    padding: padding.sm,
    marginBottom: margin.lg,
  },
  categoryCircleThreeCol: {
    width: '33.33%',
  },
  categoryCircleOffset: {
    marginTop: margin.lg,
  },
  categoryIconWrap: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.borderLight,
    marginBottom: padding.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIconWrapSub: {
    width: CIRCLE_SIZE_SUB,
    height: CIRCLE_SIZE_SUB,
    borderRadius: CIRCLE_SIZE_SUB / 2,
  },
  categoryImage: {
    width: CIRCLE_SIZE * 0.5,
    height: CIRCLE_SIZE * 0.5,
  },
  categoryImageSub: {
    width: CIRCLE_SIZE_SUB * 0.5,
    height: CIRCLE_SIZE_SUB * 0.5,
  },
  categoryLabel: {
    fontSize: fontSize(13),
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
});
