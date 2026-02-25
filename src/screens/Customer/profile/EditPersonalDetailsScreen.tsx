import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput as RNTextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomIcon from '../../../components/Icon';
import { Button } from '../../../components';
import { goBack } from '../../../navigation/navigationService';
import { scale, fontSize, hp, padding } from '../../../utils/responsive';

const MAX_NAME_LENGTH = 50;

export default function EditPersonalDetailsScreen() {
  const [name, setName] = useState('Paschaloliver');
  const [email, setEmail] = useState('Paschaloliver@example.com');
  const [phone, setPhone] = useState('');

  const handleSave = () => {
    goBack();
  };

  const handleDeleteAccount = () => {
    // TODO: Implement delete account flow
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.headerLeft}>
            <CustomIcon name="arrow-back" size={scale(24)} color="#3FA565" />
            <Text style={styles.headerTitle}>Personal Details</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Profile Picture with Camera Overlay */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.cameraButton} activeOpacity={0.7}>
                <CustomIcon
                  name="camera"
                  size={scale(20)}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Input Fields */}
          <View style={styles.inputSection}>
            <View style={styles.inputRow}>
              <RNTextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={(text) =>
                  setName(text.slice(0, MAX_NAME_LENGTH))
                }
                maxLength={MAX_NAME_LENGTH}
              />
              <Text style={styles.charCount}>
                {name.length}/{MAX_NAME_LENGTH}
              </Text>
            </View>
            <View style={styles.inputDivider} />

            <View style={styles.inputRow}>
              <RNTextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputDivider} />

            <View style={styles.inputRow}>
              <RNTextInput
                style={styles.input}
                placeholder="Phone"
                placeholderTextColor="#999"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Save Button */}
          <View style={styles.buttonSection}>
            <Button title="Save" onPress={handleSave} variant="primary" />
          </View>

          {/* Delete Account Link */}
          <TouchableOpacity
            onPress={handleDeleteAccount}
            style={styles.deleteButton}
            activeOpacity={0.7}
          >
            <Text style={styles.deleteText}>Delete account permanently</Text>
          </TouchableOpacity>

          <View style={{ height: hp(5) }} />
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingHorizontal: padding.lg,
    paddingTop: scale(24),
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: scale(32),
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#3FA565',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSection: {
    marginBottom: scale(32),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: fontSize(16),
    color: '#000',
    paddingVertical: scale(14),
  },
  charCount: {
    fontSize: fontSize(14),
    color: '#999',
    marginLeft: scale(8),
  },
  inputDivider: {
    height: 1,
    backgroundColor: '#E8E8E8',
  },
  buttonSection: {
    marginBottom: scale(20),
  },
  deleteButton: {
    alignSelf: 'center',
  },
  deleteText: {
    fontSize: fontSize(14),
    color: '#3FA565',
    fontWeight: '500',
  },
});
