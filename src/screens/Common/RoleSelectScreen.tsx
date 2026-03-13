import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { navigate, goBack } from '../../navigation/navigationService';
import { scale, fontSize, padding, margin, borderRadius } from '../../utils/responsive';
import CustomIcon, { IconNames } from '../../components/Icon';
import { Button } from '../../components';

export default function RoleSelectScreen() {

  const [selected, setSelected] = useState<'client' | 'pro' | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    const roleKey = selected === 'client' ? 3 : 2;
    navigate('CreateNewAccount', { roleKey });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <CustomIcon name={IconNames.arrowBack} size={fontSize(20)} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>
        What will you do on HandyNaija?
      </Text>

      <Text style={styles.subtitle}>
        This decision is not final. you can later be both a client and a professional from the same account if you wish.
      </Text>

      {/* Client card */}
      <TouchableOpacity
        style={[styles.card, selected === 'client' && styles.activeCard]}
        onPress={() => setSelected('client')}>

        <Image
          source={require('../../Images/logo.png')}
          style={styles.img}
        />

        <View style={styles.cardContent}>
          <Text style={styles.big}>Book a service</Text>
          <Text style={styles.small}>(I'm a Client)</Text>
        </View>
      </TouchableOpacity>

      {/* Pro card */}
      <TouchableOpacity
        style={[styles.card, selected === 'pro' && styles.activeCard]}
        onPress={() => setSelected('pro')}>

        <Image
          source={require('../../Images/logo.png')}
          style={styles.img}
        />

        <View style={styles.cardContent}>
          <Text style={styles.big}>Offer services</Text>
          <Text style={styles.small}>(I'm a Professional)</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          disabled={!selected}
        />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: padding.xl,
    backgroundColor: 'white', // soft grey like screenshot
  },

  backButton: {
    marginBottom: margin.xl,
    width: scale(40),
  },

  title: {
    fontSize: fontSize(28),
    fontWeight: '700',
    marginBottom: margin.md,
    color: '#1B3556', // navy blue
  },

  subtitle: {
    fontSize: fontSize(18),
    color: '#555',
    marginBottom: margin.xxl,
    lineHeight: fontSize(20),
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: padding.lg,
    borderRadius: borderRadius.xl,
    marginBottom: margin.lg,
    borderWidth: 1.5,
    borderColor: "lightgrey",
  },

  activeCard: {
    borderWidth: 1.5,
    borderColor: '#1B3556', // highlighted card
  },

  img: {
    width: scale(72),
    height: scale(72),
    borderRadius: borderRadius.lg,
    marginRight: padding.lg,
  },

  cardContent: {
    flex: 1,
  },

  big: {
    fontWeight: '700',
    fontSize: fontSize(18),
    color: '#1B3556',
    marginBottom: scale(4),
  },

  small: {
    color: '#333',
    fontSize: fontSize(14),
  },

  footer: {
    marginTop: 'auto',
    paddingTop: margin.xl,
  },
});
