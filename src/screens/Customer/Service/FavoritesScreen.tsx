import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigate } from '../../../navigation/navigationService';
import { scale, fontSize, padding, margin } from '../../../utils/responsive';
import CustomIcon, { IconNames } from '../../../components/Icon';
import { CommonAppHeader, EmptyState } from '../../../components';
import ServiceScreenHeader from './ServiceScreenHeader';
import { COLORS } from '../../../utils/constants';
import { Commands } from 'react-native-maps/dist/src/MapViewNativeComponent';

interface FavoriteCategory {
  id: string;
  name: string;
  professionalCount: number;
  professionalAvatars?: string[];
}

const AVATAR_URI = 'https://i.pravatar.cc/100?img=';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<FavoriteCategory[]>([
    {
      id: '1',
      name: 'Handyman',
      professionalCount: 1,
      professionalAvatars: [`${AVATAR_URI}12`],
    },
    {
      id: '2',
      name: 'Cleaning',
      professionalCount: 4,
      professionalAvatars: [
        `${AVATAR_URI}1`,
        `${AVATAR_URI}5`,
        `${AVATAR_URI}9`,
      ],
    },
  ]);

  const isEmpty = favorites.length === 0;

  const handleCategoryPress = (category: FavoriteCategory) => {
    navigate('ProfessionalProfile' as any , { categoryId: category.id });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CommonAppHeader />
      <ServiceScreenHeader
        title="Favorites"
        titleColor={COLORS.PRIMARY}
        titleStyle={styles.favoritesTitle}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {isEmpty ? (
          <EmptyState
            title="No favorites"
            image={require('../../../Images/favourite.png')}
            instruction={
              <Text style={styles.emptyInstruction}>
                To save a professional, tap the heart icon (
                <CustomIcon name={IconNames.heart} size={fontSize(16)} color="#FF3B30" />)
              </Text>
            }
            actionLabel="Find professional"
            onAction={() => navigate('FindProfessionals' as any)}
          />
        ) : (
          <View style={styles.list}>
            {favorites.map((category, index) => (
              <View key={category.id}>
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => handleCategoryPress(category)}
                  activeOpacity={0.7}
                >
                  {/* Left - Circular icon with toolbox */}
                  <View style={styles.iconCircle}>
                    <Image source={require('../../../Images/serachImg/Handyman.png')} style={styles.avatar} />
                  </View>

                  {/* Center - Content */}
                  <View style={styles.itemContent}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.professionalCount}>
                      {category.professionalCount}{' '}
                      {category.professionalCount === 1 ? 'professional' : 'professionals'}
                    </Text>
                    <View style={styles.avatarRow}>
                      {category.professionalAvatars
                        ?.slice(0, 3)
                        .map((uri, i) => (
                          <Image
                            key={i}
                            source={{ uri }}
                            style={[
                              styles.avatar2,
                              { marginLeft: i > 0 ? scale(-10) : 0 },
                            ]}
                          />
                        ))}
                      {(category.professionalAvatars?.length ?? 0) > 3 && (
                        <View style={styles.avatarBadge}>
                          <Text style={styles.avatarBadgeText}>
                            {(category.professionalCount ?? 0) - 3}+
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Right - Chevron */}
                  <CustomIcon
                    name="chevron-forward"
                    size={scale(20)}
                    color="#999"
                  />
                </TouchableOpacity>
                {index < favorites.length - 1 && (
                  <View style={styles.itemSeparator} />
                )}
              </View>
            ))}
          </View>
        )}
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
    paddingHorizontal: padding.lg,
    paddingTop: padding.lg,
    paddingBottom: padding.md,
  },
  favoritesTitle: {
    fontSize: fontSize(24),
    fontWeight: '700',
  },
  scrollContent: {
    paddingBottom: margin.xxxl,
  },
  emptyInstruction: {
    fontSize: fontSize(16),
    color: '#666',
    textAlign: 'center',
    lineHeight: fontSize(24),
    marginBottom: margin.xl,
  },
  list: {
    paddingHorizontal: padding.lg,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(16),
  },
  iconCircle: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: padding.lg,
  },
  itemContent: {
    flex: 1,
  },
  categoryName: {
    fontSize: fontSize(18),
    fontWeight: '600',
    color: '#222',
    marginBottom: scale(4),
  },
  professionalCount: {
    fontSize: fontSize(14),
    color: '#999',
    marginBottom: scale(8),
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: scale(42),
    height: scale(42),
    borderRadius: scale(16),
  },
  avatar2: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#E0E0E0',
  },
  avatarBadge: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(4),
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarBadgeText: {
    fontSize: fontSize(11),
    color: '#fff',
    fontWeight: '700',
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginLeft: scale(72),
  },
});
