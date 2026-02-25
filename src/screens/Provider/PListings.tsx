import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  scale,
  fontSize,
  padding,
  margin,
  borderRadius,
} from '../../utils/responsive';
import { colors } from '../../theme/colors';
import { navigate } from '../../navigation/navigationService';

export default function PListings() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Listing</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIcon} activeOpacity={0.7}>
            <Icon
              name="search-outline"
              size={scale(22)}
              color={colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} activeOpacity={0.7}>
            <Icon
              name="notifications-outline"
              size={scale(22)}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Published Section */}
        <Text style={styles.sectionTitle}>Published</Text>
        <TouchableOpacity style={styles.listingCard} activeOpacity={0.7}>
          <View style={[styles.listingIcon, { backgroundColor: '#FBCFE8' }]}>
            <Icon
              name="shirt-outline"
              size={scale(24)}
              color="#EC4899"
            />
          </View>
          <View style={styles.listingContent}>
            <Text style={styles.listingTitle}>Ironing</Text>
            <Text style={styles.listingSubtext}>Listing visible</Text>
            <View style={styles.bronzeTag}>
              <Icon name="medal-outline" size={scale(14)} color="#B45309" />
              <Text style={styles.bronzeText}>Bronze</Text>
            </View>
          </View>
          <Icon
            name="chevron-forward"
            size={scale(20)}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        {/* In Progress Section */}
        <Text style={[styles.sectionTitle, { marginTop: margin.xxl }]}>
          In progress
        </Text>
        <TouchableOpacity style={styles.listingCard} activeOpacity={0.7}>
          <View style={[styles.listingIcon, { backgroundColor: '#BAE6FD' }]}>
            <Icon
              name="water-outline"
              size={scale(24)}
              color="#0EA5E9"
            />
          </View>
          <View style={styles.listingContent}>
            <Text style={styles.listingTitle}>Cleaning</Text>
            <Text style={styles.listingSubtext}>Listing not visible yet</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '70%' }]} />
            </View>
            <Text style={styles.progressText}>70% Complete</Text>
            <View style={styles.incompleteTag}>
              <Text style={styles.incompleteText}>Incomplete</Text>
            </View>
          </View>
          <Icon
            name="chevron-forward"
            size={scale(20)}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        {/* Add New Listing Button */}
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={() => navigate('CreateListing')}
        >
          <Icon name="add" size={scale(24)} color={colors.primary} />
          <Text style={styles.addButtonText}>Add new listing</Text>
        </TouchableOpacity>

        <View style={{ height: margin.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: padding.xl,
    paddingVertical: padding.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: fontSize(20),
    fontWeight: '700',
    color: colors.text,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.lg,
  },
  headerIcon: {
    padding: padding.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: padding.xl,
    paddingTop: margin.xl,
  },
  sectionTitle: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: margin.md,
  },
  listingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: padding.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: margin.md,
  },
  listingIcon: {
    width: scale(48),
    height: scale(48),
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: padding.lg,
  },
  listingContent: {
    flex: 1,
  },
  listingTitle: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.text,
  },
  listingSubtext: {
    fontSize: fontSize(13),
    color: colors.textSecondary,
    marginTop: padding.xs,
  },
  bronzeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: padding.sm,
    paddingVertical: padding.xs,
    borderRadius: borderRadius.sm,
    marginTop: margin.sm,
    gap: padding.xs,
  },
  bronzeText: {
    fontSize: fontSize(12),
    fontWeight: '600',
    color: '#166534',
  },
  progressBar: {
    height: scale(6),
    backgroundColor: colors.border,
    borderRadius: borderRadius.round,
    marginTop: padding.md,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.round,
  },
  progressText: {
    fontSize: fontSize(13),
    fontWeight: '500',
    color: colors.text,
    marginTop: padding.xs,
  },
  incompleteTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FEF08A',
    paddingHorizontal: padding.sm,
    paddingVertical: padding.xs,
    borderRadius: borderRadius.sm,
    marginTop: margin.sm,
  },
  incompleteText: {
    fontSize: fontSize(13),
    fontWeight: '600',
    color: '#854D0E',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.primary,
    paddingVertical: padding.lg,
    borderRadius: borderRadius.lg,
    marginTop: margin.xxl,
    gap: padding.sm,
  },
  addButtonText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: colors.primary,
  },
});