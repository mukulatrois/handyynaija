import React from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, Image } from 'react-native';
import { fontSize, padding, margin, scale } from '../utils/responsive';
import Button from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  image?: ImageSourcePropType;
  title: string;
  subtitle?: string;
  instruction?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon,
  image,
  title,
  subtitle,
  instruction,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {image && (
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} resizeMode="contain" />
        </View>
      )}
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      {instruction && <View style={styles.instructionRow}>{instruction}</View>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          variant="primary"
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: margin.xxxl,
    paddingHorizontal: padding.xl,
  },
  title: {
    fontSize: fontSize(24),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: margin.xxl,
  },
  imageContainer: {
    width: scale(200),
    height: scale(200),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: margin.xxl,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    marginBottom: margin.xxl,
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: margin.md,
  },
  subtitle: {
    fontSize: fontSize(14),
    color: '#666',
    textAlign: 'center',
    marginBottom: margin.xl,
  },
  button: {
    marginTop: margin.xxl,
    width: '100%',
  },
});
