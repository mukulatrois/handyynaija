import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { goBack, navigate } from '../../navigation/navigationService';
import { Button } from '../../components';
import { scale, fontSize, padding, margin, borderRadius } from '../../utils/responsive';

const PRIMARY_GREEN = '#3FA565';

export default function ProviderVerifyPhotoScreen() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<'success' | 'failed' | null>(null);

  const handleStartVerification = () => {
    if (isVerifying) return;

    // Dummy verification: show progress, then success and continue flow
    setIsVerifying(true);
    setResult(null);

    setTimeout(() => {
      setIsVerifying(false);
      setResult('success');
      navigate('WorkAreas');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goBack}
          style={styles.headerButton}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={scale(24)} color={PRIMARY_GREEN} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Photo verification</Text>
        <View style={styles.headerButton} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Private photo verification</Text>
        <Text style={styles.subtitle}>
          We just need to confirm that it&apos;s really you in the photo you uploaded.
          This helps us keep your account and the Jolloyard community safe.
        </Text>

        {/* Preview placeholder */}
        <View style={styles.previewCard}>
          <Ionicons
            name="person-circle-outline"
            size={scale(72)}
            color={PRIMARY_GREEN}
            style={{ marginBottom: margin.sm }}
          />
          <Text style={styles.previewText}>
            Your photo preview will appear here during verification.
          </Text>
        </View>

        <Text style={styles.noteText}>
          Don&apos;t worry, this photo is used only for verification and will not be
          visible on your public profile.
        </Text>

        {isVerifying && (
          <Text style={styles.statusText}>Verifying your face…</Text>
        )}
        {result === 'success' && !isVerifying && (
          <Text style={styles.statusTextSuccess}>Face verified successfully!</Text>
        )}

        <Button
          title="Start verification"
          onPress={handleStartVerification}
          variant="primary"
          style={styles.verifyButton}
          disabled={isVerifying}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: padding.xl,
    paddingVertical: padding.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerButton: {
    width: scale(40),
    alignItems: 'flex-start',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontSize(18),
    fontWeight: '700',
    color: '#1A1A1A',
  },
  content: {
    flex: 1,
    paddingHorizontal: padding.xl,
    paddingTop: margin.xl,
  },
  title: {
    fontSize: fontSize(22),
    fontWeight: '700',
    color: '#000',
    marginBottom: margin.sm,
  },
  subtitle: {
    fontSize: fontSize(14),
    color: '#555',
    lineHeight: fontSize(20),
    marginBottom: margin.xl,
  },
  previewCard: {
    width: '70%',
    aspectRatio: 0.85,
    borderRadius: borderRadius.xl,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#D4D4D4',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: padding.lg,
    marginBottom: margin.lg,
  },
  previewText: {
    fontSize: fontSize(13),
    color: '#666',
    textAlign: 'center',
  },
  noteText: {
    fontSize: fontSize(14),
    color: '#555',
    textAlign: 'center',
    lineHeight: fontSize(20),
    marginBottom: margin.xxxl,
    paddingHorizontal: padding.lg,
  },
  statusText: {
    fontSize: fontSize(14),
    color: '#666',
    textAlign: 'center',
    marginBottom: margin.md,
  },
  statusTextSuccess: {
    fontSize: fontSize(14),
    color: PRIMARY_GREEN,
    textAlign: 'center',
    marginBottom: margin.md,
    fontWeight: '600',
  },
  verifyButton: {
    marginTop: margin.lg,
  },
});

