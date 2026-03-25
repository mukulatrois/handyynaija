import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Platform,
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
import { useAppDispatch } from '../../store/hooks';
import {
  resetListingDraft,
  setActiveStep,
  setServiceName,
} from '../../store/listingDraftSlice';
import { COLORS } from '../../utils/constants';

const PRIMARY_GREEN = COLORS.PRIMARY;
const SERVICE_IMAGE_URL = (serviceId: string) =>
  `https://jolloyard-be.myfileshosting.com/api/v1/services/${encodeURIComponent(serviceId)}/image`;

type ApiCategory = {
  id?: string;
  _id?: string;
  name?: string;
  title?: string;
  slug?: string;
  imagePath?: string;
  imageUrl?: string;
  image?: string;
  subcategories?: ApiCategory[];
};

type ApiCategoriesResponse = {
  categories?: ApiCategory[];
};

type CategoryItem = {
  id: string;
  title: string;
  image?: any;
  subcategories?: CategoryItem[];
};

type ApiService = {
  id?: string;
  _id?: string;
  name?: string;
  title?: string;
  imagePath?: string;
};

type ApiServicesResponse = {
  services?: ApiService[];
  data?: ApiService[];
  results?: ApiService[];
};

const fallbackMainCategories: CategoryItem[] = [
  { id: 'home', title: 'Home', image: require('../../Images/serachImg/Home.png') },
  { id: 'tech', title: 'Tech & IT Support', image: require('../../Images/serachImg/Tech.png') },
  { id: 'beauty', title: 'Beauty', image: require('../../Images/serachImg/Beauty.png') },
  { id: 'repair', title: 'Repair & Maintenance', image: require('../../Images/serachImg/repair.png') },
  { id: 'auto', title: 'Automobile', image: require('../../Images/serachImg/Automobile.png') },
  { id: 'media', title: 'Media & Events', image: require('../../Images/serachImg/media.png') },
  { id: 'others', title: 'Others', image: require('../../Images/serachImg/Others.png') },
];

const homeSubCategories: CategoryItem[] = [
  { id: 'cleaning', title: 'Cleaning', image: require('../../Images/serachImg/Cleaning.png') },
  { id: 'ironing', title: 'Ironing', image: require('../../Images/serachImg/ironing.png') },
  { id: 'handyman', title: 'Handyman', image: require('../../Images/serachImg/Handyman.png') },
  { id: 'painting', title: 'Painting', image: require('../../Images/serachImg/Painting.png') },
  { id: 'interior', title: 'Interior Design', image: require('../../Images/serachImg/interior.png') },
  { id: 'pest', title: 'Pest Control', image: require('../../Images/serachImg/PestControl.png') },
  { id: 'kitchen', title: 'Kitchen Installation', image: require('../../Images/serachImg/Kitchen.png') },
];

const beautySubCategories: CategoryItem[] = [
  { id: 'salon', title: 'Salon at home', image: require('../../Images/serachImg/Salon.png') },
  { id: 'manicure', title: 'Manicure & Pedicure', image: require('../../Images/serachImg/Manicure.png') },
  { id: 'haircut', title: 'Haircut & Styling', image: require('../../Images/serachImg/Haircut.png') },
];

const mediaSubCategories: CategoryItem[] = [
  { id: 'photo', title: 'Photo/Video grapher', image: require('../../Images/serachImg/Photo.png') },
  { id: 'birthday', title: 'Birthday/ Event Planner', image: require('../../Images/serachImg/Birthday.png') },
  { id: 'dj', title: 'DJ & Sounds Setup', image: require('../../Images/serachImg/Sounds.png') },
  { id: 'mc', title: 'MC', image: require('../../Images/serachImg/MC.png') },
  { id: 'comedian', title: 'Comedian', image: require('../../Images/serachImg/Comedian.png') },
];

const repairSubCategories: CategoryItem[] = [
  { id: 'electrician', title: 'Electrician', image: require('../../Images/serachImg/Electrician.png') },
  { id: 'plumber', title: 'Plumber', image: require('../../Images/serachImg/Plumber.png') },
  { id: 'appliances', title: 'Appliances', image: require('../../Images/serachImg/Appliances.png') },
  { id: 'ac', title: 'AC Servicing', image: require('../../Images/serachImg/AC.png') },
];

const autoSubCategories: CategoryItem[] = [
  { id: 'carwash', title: 'Car Wash', image: require('../../Images/serachImg/Car.png') },
  { id: 'bike', title: 'Bike Services', image: require('../../Images/serachImg/Bike.png') },
  { id: 'carrepair', title: 'Car Repair', image: require('../../Images/serachImg/CarRepair.png') },
  { id: 'battery', title: 'Battery Jumpstart', image: require('../../Images/serachImg/Battery.png') },
];

const CIRCLE_SIZE = wp(20);
const CIRCLE_SIZE_SUB = wp(22);

export default function CreateListingScreen() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<{ id: string; title: string } | null>(
    null
  );
  const [apiCategories, setApiCategories] = useState<CategoryItem[] | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [services, setServices] = useState<Array<{ id: string; title: string; imageUrl?: string }>>(
    []
  );
  const [loadingServices, setLoadingServices] = useState(false);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [failedServiceImages, setFailedServiceImages] = useState<Record<string, true>>({});

  const subItemsMap: Record<string, typeof homeSubCategories> = {
    home: homeSubCategories,
    beauty: beautySubCategories,
    media: mediaSubCategories,
    repair: repairSubCategories,
    auto: autoSubCategories,
  };

  const resolveApiImageSource = (value?: string) => {
    if (!value) return undefined;
    if (value.startsWith('http://') || value.startsWith('https://')) {
      return { uri: value };
    }
    // Keep the same base used elsewhere in this file for service images.
    const normalized = value.replace(/^\/+/, '');
    return { uri: `https://jolloyard-be.myfileshosting.com/${normalized}` };
  };

  const mapApiCategory = (c: ApiCategory): CategoryItem => ({
    id: String(c.id ?? c._id ?? ''),
    title: String(c.name ?? c.title ?? '').trim(),
    image:
      resolveApiImageSource(c.imageUrl ?? c.imagePath ?? c.image) ??
      undefined,
    subcategories: (c.subcategories ?? []).map(mapApiCategory),
  });

  const fetchCategories = useCallback(async () => {
    setLoadingCategories(true);
    setCategoriesError(null);
    try {
      const res = await fetch('https://jolloyard-be.myfileshosting.com/api/v1/categories/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data: ApiCategoriesResponse = await res.json().catch(() => ({}));


      console.log(data, "categories");
      if (!res.ok) {
        throw new Error('Failed to load categories');
      }

      const mapped = (data.categories ?? [])
        .map(mapApiCategory)
        .filter((c) => c.id && c.title);
      setApiCategories(mapped.length ? mapped : null);
    } catch (e) {
      setApiCategories(null);
      setCategoriesError('Could not load categories. Please try again.');
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  const fetchServicesByCategory = useCallback(async (categoryId: string) => {
    setLoadingServices(true);
    setServicesError(null);
    try {
      const url = `https://jolloyard-be.myfileshosting.com/api/v1/services?categoryId=${encodeURIComponent(
        categoryId
      )}&page=1&limit=10`;
      const res = await fetch(url, { method: 'GET' });
      const data: ApiServicesResponse = await res.json().catch(() => ({}));

      console.log(data, "services");
      if (!res.ok) throw new Error('Failed to load services');

      const raw = data.services ?? data.data ?? data.results ?? [];
      const mapped = raw
        .map((s) => ({
          id: String(s.id ?? s._id ?? ''),
          title: String(s.name ?? s.title ?? '').trim(),
          imageUrl: `https://jolloyard-be.myfileshosting.com/${s.imagePath}`,
        }))
        .filter((s) => s.id && s.title);

      setServices(mapped);
      setFailedServiceImages({});
    } catch (e) {
      setServices([]);
      setServicesError('Could not load services. Tap to retry.');
    } finally {
      setLoadingServices(false);
    }
  }, []);

  useEffect(() => {
    // Start a fresh draft when user enters the create listing flow.
    dispatch(resetListingDraft());
    fetchCategories();
  }, [dispatch, fetchCategories]);

  const goToListingPrice = (serviceTitle: string) => {
    const title = String(serviceTitle ?? '').trim();
    dispatch(setServiceName(title || undefined));
    dispatch(setActiveStep('listingPrice'));
    navigate('ListingPrice' as any, { serviceName: title } as any);
  };

  const mainCategories = useMemo(
    () => (apiCategories && apiCategories.length ? apiCategories : fallbackMainCategories),
    [apiCategories]
  );

  const selectedApiCategory = useMemo(() => {
    if (!selectedCategory || !apiCategories?.length) return null;
    return apiCategories.find((c) => c.id === selectedCategory.id) ?? null;
  }, [apiCategories, selectedCategory]);

  const subItems: CategoryItem[] = useMemo(() => {
    if (!selectedCategory) return [];
    const apiSubs = selectedApiCategory?.subcategories ?? [];
    if (apiSubs.length) return apiSubs;
    return subItemsMap[selectedCategory.id] ?? [];
  }, [selectedApiCategory, selectedCategory, subItemsMap]);

  const displayItems: CategoryItem[] = selectedCategory ? subItems : mainCategories;

  const filteredItems = search
    ? displayItems.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    : displayItems;

  const handleCategoryPress = (cat: CategoryItem) => {
    const apiHasSubs = (cat.subcategories?.length ?? 0) > 0;
    const fallbackHasSubs = !!subItemsMap[cat.id];

    if (apiHasSubs || fallbackHasSubs) {
      setSelectedCategory({ id: cat.id, title: cat.title });
      return;
    }

    // If categories came from API, treat tapping a category as "load services under this category"
    const isApiCategory = !!apiCategories?.find((c) => c.id === cat.id);
    if (isApiCategory) {
      setSelectedCategory({ id: cat.id, title: cat.title });
      fetchServicesByCategory(cat.id);
      return;
    }

    goToListingPrice(cat.title);
  };

  const handleBreadcrumbPress = () => {
    setSelectedCategory(null);
    setServices([]);
    setServicesError(null);
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

        {!selectedCategory && loadingCategories && (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color={PRIMARY_GREEN} />
            <Text style={styles.loadingText}>Loading categories...</Text>
          </View>
        )}

        {!selectedCategory && !!categoriesError && (
          <TouchableOpacity style={styles.errorRow} onPress={fetchCategories} activeOpacity={0.8}>
            <Icon name="alert-circle-outline" size={scale(18)} color="#DC2626" />
            <Text style={styles.errorText}>{categoriesError} Tap to retry.</Text>
          </TouchableOpacity>
        )}

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
            <>
              {loadingServices && (
                <View style={styles.loadingRow}>
                  <ActivityIndicator size="small" color={PRIMARY_GREEN} />
                  <Text style={styles.loadingText}>Loading services...</Text>
                </View>
              )}

              {!!servicesError && (
                <TouchableOpacity
                  style={styles.errorRow}
                  onPress={() => selectedCategory?.id && fetchServicesByCategory(selectedCategory.id)}
                  activeOpacity={0.8}
                >
                  <Icon name="alert-circle-outline" size={scale(18)} color="#DC2626" />
                  <Text style={styles.errorText}>{servicesError}</Text>
                </TouchableOpacity>
              )}

              {services.length > 0
                ? services
                  .filter((s) =>
                    search ? s.title.toLowerCase().includes(search.toLowerCase()) : true
                  )
                  .map((svc) => (
                    <TouchableOpacity
                      key={svc.id}
                      style={styles.categoryTile}
                      activeOpacity={0.7}
                      onPress={() =>
                        goToListingPrice(svc.title)
                      }
                    >
                      <View style={styles.categoryCard}>
                        <View style={[styles.categoryIconWrap, styles.categoryIconWrapSub]}>
                          {svc.imageUrl && !failedServiceImages[svc.id] ? (
                            <Image
                              source={{ uri: svc.imageUrl }}
                              style={styles.categoryImageSub}
                              resizeMode="contain"
                              onError={() =>
                                setFailedServiceImages((prev) => ({ ...prev, [svc.id]: true }))
                              }
                            />
                          ) : (
                            <Icon
                              name="construct-outline"
                              size={scale(24)}
                              color={PRIMARY_GREEN}
                            />
                          )}
                        </View>
                        <Text style={styles.categoryLabel} numberOfLines={2}>
                          {svc.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))
                : filteredItems.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.categoryTile}
                    activeOpacity={0.7}
                    onPress={() =>
                      goToListingPrice(item.title)
                    }
                  >
                    <View style={styles.categoryCard}>
                      <View style={[styles.categoryIconWrap, styles.categoryIconWrapSub]}>
                        {item.image ? (
                          <Image
                            source={item.image}
                            style={styles.categoryImageSub}
                            resizeMode="contain"
                          />
                        ) : (
                          <Icon name="construct-outline" size={scale(24)} color={PRIMARY_GREEN} />
                        )}
                      </View>
                      <Text style={styles.categoryLabel} numberOfLines={2}>
                        {item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </>
          ) : (
            filteredItems.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryTile}
                activeOpacity={0.7}
                onPress={() => handleCategoryPress(cat)}
              >
                <View style={styles.categoryCard}>
                  <View style={styles.categoryIconWrap}>
                    {cat.image ? (
                      <Image
                        source={cat.image}
                        style={styles.categoryImage}
                        resizeMode="contain"
                      />
                    ) : (
                      <Icon name="grid-outline" size={scale(26)} color={PRIMARY_GREEN} />
                    )}
                  </View>
                  <Text style={styles.categoryLabel} numberOfLines={2}>
                    {cat.title}
                  </Text>
                </View>
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
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.sm,
    marginBottom: margin.md,
  },
  loadingText: {
    fontSize: fontSize(13),
    color: colors.textSecondary,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.sm,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
    borderRadius: borderRadius.lg,
    marginBottom: margin.md,
  },
  errorText: {
    flex: 1,
    fontSize: fontSize(13),
    color: colors.text,
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
    justifyContent: 'space-between',
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
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: padding.sm,
  },
  categoryIconWrapSub: {
    width: CIRCLE_SIZE_SUB,
    height: CIRCLE_SIZE_SUB,
    borderRadius: borderRadius.lg,
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
  categoryTile: {
    width: '33.33%',
    alignItems: 'center',
    padding: padding.sm,
    marginBottom: margin.lg,
  },
  categoryCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    paddingVertical: padding.md,
    paddingHorizontal: padding.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
});
