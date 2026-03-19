import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import MessageScreen from '../inbox/Message';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../../../components';
import ServiceScreenHeader from './ServiceScreenHeader';

export default function InboxScreen() {
  const refRBSheet = useRef<any>(null);

  useEffect(() => {
    const checkFirstTime = async () => {
      const hasOpened = await AsyncStorage.getItem('inboxSheetShown');

      if (!hasOpened) {
        setTimeout(() => {
          refRBSheet.current?.open();
        }, 500); // thoda delay taaki screen properly render ho

        await AsyncStorage.setItem('inboxSheetShown', 'true');
      }
    };

    checkFirstTime();
  }, []);


  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ServiceScreenHeader title="Inbox" titleColor="#3FA565" titleStyle={{ fontSize: 28 }} />

      <View style={{ flex: 1 }}>
        <MessageScreen />
      </View>

      <RBSheet
        ref={refRBSheet}
        height={620}
        openDuration={250}
        closeOnPressMask
        customStyles={{
          container: styles.sheet,
          wrapper: styles.wrapper,
        }}
      >
        <View style={styles.handle} />
        <TouchableOpacity style={styles.closeBtn} onPress={() => refRBSheet.current?.close()} activeOpacity={0.7}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Image
            source={require('../../../Images/secure.png')}
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={styles.heading}>Helps us to protect you</Text>

          <Text style={styles.subText}>
            Book and communicate with professionals always though handynija.
          </Text>

          <Text style={styles.description}>
            This way you will be protected against scams and our satisfaction
            guarantee.
          </Text>
        </View>

        <Button
          title="Got it"
          onPress={() => refRBSheet.current?.close()}
          variant="primary"
          style={styles.button}
        />
      </RBSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  sheet: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
    backgroundColor: '#fff',
  },

  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#DADADA',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 18,
    color: '#666',
  },
  content: {
    alignItems: 'center',
    marginTop: 80,
  },

  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },

  heading: {
    fontSize: 28,
    fontWeight: '600',
    color: '#3FA565',
    textAlign: 'center',
    marginBottom: 15,
  },

  subText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#222',
    marginBottom: 10,
  },

  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 10,
  },

  button: {
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: '#4FA96B',
  },
});
