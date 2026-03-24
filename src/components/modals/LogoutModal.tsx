import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import CustomIcon from '../Icon';
import { scale, fontSize, padding } from '../../utils/responsive';
import { COLORS } from '../../utils/constants';

interface LogoutModalProps {
  visible: boolean;
  onCancel: () => void;
  onLogout: () => void;
}

export default function LogoutModal({
  visible,
  onCancel,
  onLogout,
}: LogoutModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropTouchable} onPress={onCancel} />
        <View style={styles.container}>
          <CustomIcon
          name="log-out-outline"
          size={scale(48)}
          color={COLORS.PRIMARY}
          style={styles.icon}
        />
        <Text style={styles.title}>Are you sure want to Log out</Text>
        <Text style={styles.description}>
          Tap log out to Log out from this app.
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
            style={styles.logoutButton}
            onPress={onLogout}
            activeOpacity={0.7}
          >
            <CustomIcon name="log-out-outline" size={scale(18)} color="#fff" />
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropTouchable: {
    ...StyleSheet.absoluteFillObject,
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
    borderColor: '#E53935',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: '#E53935',
  },
  logoutButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: scale(14),
    borderRadius: scale(12),
    backgroundColor: '#E53935',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(8),
  },
  logoutText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: '#fff',
  },
});
