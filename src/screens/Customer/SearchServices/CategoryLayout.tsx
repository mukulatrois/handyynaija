import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { wp, hp, scale, fontSize, padding, margin, borderRadius } from '../../../utils/responsive';
import { goBack, navigate } from '../../../navigation/navigationService';
import CustomIcon, { IconNames } from '../../../components/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { height, width } from '../../../components/common';
import { COLORS } from '../../../utils/constants';

const CARD_WIDTH = wp(27.5);

const chunkArray = (arr: any[], size: number) => {
    const result = [];

    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }

    return result;
};

interface CircleItem {
  title: string;
  image: any;
}

interface CircleProps {
  item: CircleItem;
  onPress?: () => void;
}

const Circle = ({ item, onPress }: CircleProps) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
    <Image source={item.image} style={styles.icon} resizeMode="contain" />
    <Text style={styles.label}>{item.title}</Text>
  </TouchableOpacity>
);

interface CategoryLayoutProps {
  title: string;
  items: CircleItem[];
  layout?: 'grid' | 'center';
  onItemPress?: (item: CircleItem) => void;
}

const CategoryLayout = ({ title, items, layout = 'grid', onItemPress }: CategoryLayoutProps) => {
  const rows = chunkArray(items, 3);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../../Images/homebg.png')} style={styles.background}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={require('../../../Images/logo2.png')}
            tintColor="white"
            style={{ width: width / 4, height: height / 30, marginBottom: 10 }}
          />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => navigate('SearchService')}
            >
              <CustomIcon name={IconNames.search} size={fontSize(22)} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => navigate('Notification')}
            >
              <CustomIcon name={IconNames.notifications} size={fontSize(22)} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          <TouchableOpacity style={styles.backRow} onPress={goBack}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionSubtitle}>Need a helping hand today ?</Text>

          {layout === 'grid' &&
            rows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((item, i) => (
                  <Circle
                    key={i}
                    item={item}
                    onPress={() => onItemPress?.(item)}
                  />
                ))}
                {row.length < 3 &&
                  Array.from({ length: 3 - row.length }).map((_, idx) => (
                    <View key={`empty-${idx}`} style={styles.emptyCard} />
                  ))}
              </View>
            ))}

          {layout === 'center' && (
            <>
              {rows[0] && (
                <View style={styles.row}>
                  {rows[0].map((item, i) => (
                    <Circle
                      key={i}
                      item={item}
                      onPress={() => onItemPress?.(item)}
                    />
                  ))}
                  {rows[0].length < 3 &&
                    Array.from({ length: 3 - rows[0].length }).map((_, idx) => (
                      <View key={`empty-0-${idx}`} style={styles.emptyCard} />
                    ))}
                </View>
              )}

              {rows[1] && (
                <View style={styles.centerRow}>
                  {rows[1].map((item, i) => (
                    <Circle
                      key={i}
                      item={item}
                      onPress={() => onItemPress?.(item)}
                    />
                  ))}
                </View>
              )}
            </>
          )}
        </View>

        {/* ADD ADDRESS */}
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addText}>＋ Add address</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CategoryLayout;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.PRIMARY },
  background: { flex: 1 },
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
    paddingTop: hp(0.6),
    paddingBottom: hp(12),
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: margin.sm,
  },
  backText: {
    color: '#fff',
    fontSize: fontSize(16),
    fontWeight: '500',
    marginLeft: margin.xs,
  },
  sectionTitle: {
    fontSize: fontSize(24),
    color: '#fff',
    fontWeight: '600',
    marginBottom: margin.xs,
  },
  sectionSubtitle: {
    fontSize: fontSize(14),
    color: 'rgba(255,255,255,0.72)',
    fontWeight: '400',
    marginBottom: margin.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1.3),
  },
  centerRow: {
    marginTop: hp(0.2),
    flexDirection: 'row',
    justifyContent: 'center',
    gap: wp(4),
  },
  card: {
    width: CARD_WIDTH,
    minHeight: hp(12),
    borderRadius: borderRadius.lg,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(1.2),
    paddingHorizontal: padding.sm,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: scale(6),
    elevation: 5,
  },
  emptyCard: {
    width: CARD_WIDTH,
  },
  icon: {
    width: CARD_WIDTH * 0.5,
    height: CARD_WIDTH * 0.42,
    marginBottom: margin.xs,
  },
  label: {
    textAlign: 'center',
    fontSize: fontSize(12),
    fontWeight: '600',
    color: '#1D1D1D',
  },
  addBtn: {
    position: 'absolute',
    bottom: hp(4),
    left: padding.xl,
    right: padding.xl,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: borderRadius.lg,
    paddingVertical: padding.lg,
    alignItems: 'center',
  },
  addText: {
    color: '#fff',
    fontSize: fontSize(14),
    fontWeight: '500',
    textTransform: 'uppercase',
  },
});
