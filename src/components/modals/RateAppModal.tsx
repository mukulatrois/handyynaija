import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomIcon from '../Icon';
import { scale, fontSize, padding } from '../../utils/responsive';

interface RateAppModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (rating: number) => void;
}

export default function RateAppModal({
  visible,
  onCancel,
  onSubmit,
}: RateAppModalProps) {
  const [rating, setRating] = useState(3);

  const handleSubmit = () => {
    onSubmit(rating);
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onCancel}
      onBackButtonPress={onCancel}
      backdropOpacity={0.5}
      style={styles.modal}
    >
      <View style={styles.container}>
        <Text style={styles.starEmoji}>⭐</Text>
        <Text style={styles.title}>Rate Handynija App</Text>
        <Text style={styles.instruction}>Tap a star to give your rating.</Text>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              style={styles.starButton}
              activeOpacity={0.7}
            >
              <FontAwesome
                name={star <= rating ? 'star' : 'star-o'}
                size={scale(36)}
                color={star <= rating ? '#FFA500' : '#D0D0D0'}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.7}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: scale(20),
    padding: padding.xxl,
    alignItems: 'center',
  },
  starEmoji: {
    fontSize: scale(48),
    marginBottom: scale(12),
  },
  title: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: '#000',
    marginBottom: scale(8),
    textAlign: 'center',
  },
  instruction: {
    fontSize: fontSize(14),
    color: '#333',
    textAlign: 'center',
    marginBottom: scale(20),
  },
  starsRow: {
    flexDirection: 'row',
    gap: scale(8),
    marginBottom: scale(24),
  },
  starButton: {
    padding: scale(4),
  },
  buttons: {
    flexDirection: 'row',
    gap: scale(12),
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: scale(14),
    borderRadius: scale(12),
    borderWidth: 2,
    borderColor: '#3FA565',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: '#3FA565',
  },
  submitButton: {
    flex: 1,
    paddingVertical: scale(14),
    borderRadius: scale(12),
    backgroundColor: '#3FA565',
    alignItems: 'center',
  },
  submitText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: '#fff',
  },
});
