import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import CustomIcon from '../Icon';
import { scale, fontSize, padding } from '../../utils/responsive';

interface ShareAppModalProps {
  visible: boolean;
  onCancel: () => void;
  onShare: () => void;
}

export default function ShareAppModal({
  visible,
  onCancel,
  onShare,
}: ShareAppModalProps) {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onCancel}
      onBackButtonPress={onCancel}
      backdropOpacity={0.5}
      style={styles.modal}
    >
      <View style={styles.container}>
        <CustomIcon
          name="share-social"
          size={scale(48)}
          color="#1877F2"
          style={styles.icon}
        />
        <Text style={styles.title}>Share Handynija App</Text>
        <Text style={styles.description}>
          Tap share to share this app with you friends.
        </Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={onShare}
            activeOpacity={0.7}
          >
            <CustomIcon name="share-social" size={scale(18)} color="#fff" />
            <Text style={styles.shareText}>Share</Text>
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
  icon: {
    marginBottom: scale(16),
  },
  title: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: '#000',
    marginBottom: scale(8),
    textAlign: 'center',
  },
  description: {
    fontSize: fontSize(14),
    color: '#666',
    textAlign: 'center',
    marginBottom: scale(24),
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
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: scale(14),
    borderRadius: scale(12),
    backgroundColor: '#3FA565',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(8),
  },
  shareText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: '#fff',
  },
});
