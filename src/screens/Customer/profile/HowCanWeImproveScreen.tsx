import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import CustomIcon from '../../../components/Icon';
import { goBack } from '../../../navigation/navigationService';
import { scale, fontSize, padding } from '../../../utils/responsive';
import { COLORS } from '../../../utils/constants';

export default function HowCanWeImproveScreen() {
  const [feedback, setFeedback] = useState('');
  const [thankYouModalVisible, setThankYouModalVisible] = useState(false);

  const handleSubmit = () => {
    setThankYouModalVisible(true);
  };

  const handleCloseThankYou = () => {
    setThankYouModalVisible(false);
    setFeedback('');
    goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.headerLeft}>
          <CustomIcon name="arrow-back" size={scale(24)} color={COLORS.PRIMARY} />
          <Text style={styles.headerTitle}>How can we improve?</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.description}>
            Your feedback helps us make Jolloyard better. Share your thoughts,
            suggestions, or ideas below.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Tell us how we can improve..."
            placeholderTextColor="#999"
            value={feedback}
            onChangeText={setFeedback}
            multiline
            numberOfLines={8}
            textAlignVertical="top"
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.7}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        isVisible={thankYouModalVisible}
        onBackdropPress={handleCloseThankYou}
        onBackButtonPress={handleCloseThankYou}
        backdropOpacity={0.5}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <CustomIcon
            name="checkmark-circle"
            size={scale(56)}
            color={COLORS.PRIMARY}
            style={styles.modalIcon}
          />
          <Text style={styles.modalTitle}>Thank you!</Text>
          <Text style={styles.modalMessage}>
            Thank you for sharing your feedback with us. Your input helps us
            improve Jolloyard for everyone.
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={handleCloseThankYou}
            activeOpacity={0.7}
          >
            <Text style={styles.modalButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.lg,
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  headerTitle: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: '#000',
  },
  scrollContent: {
    padding: padding.lg,
  },
  description: {
    fontSize: fontSize(15),
    color: '#555',
    lineHeight: scale(22),
    marginBottom: scale(20),
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: scale(12),
    padding: padding.lg,
    fontSize: fontSize(16),
    color: '#000',
    minHeight: scale(180),
    marginBottom: scale(24),
  },
  submitButton: {
    backgroundColor: '#3FA565',
    borderRadius: scale(12),
    paddingVertical: scale(16),
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: '#fff',
  },
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: scale(20),
    padding: padding.xxl,
    alignItems: 'center',
  },
  modalIcon: {
    marginBottom: scale(16),
  },
  modalTitle: {
    fontSize: fontSize(22),
    fontWeight: '700',
    color: '#000',
    marginBottom: scale(8),
  },
  modalMessage: {
    fontSize: fontSize(15),
    color: '#555',
    textAlign: 'center',
    lineHeight: scale(22),
    marginBottom: scale(24),
  },
  modalButton: {
    width: '100%',
    backgroundColor: '#3FA565',
    borderRadius: scale(12),
    paddingVertical: scale(14),
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: '#fff',
  },
});
