import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { countries } from 'countries-list';

type CountryItem = {
  code: string;
  name: string;
};

export default function SelectCountryScreen({ navigation }: any) {

  // convert countries object → array
  const countryList: CountryItem[] = useMemo(() => {
    return Object.entries(countries).map(([code, value]) => ({
      code,
      name: value.name,
    }));
  }, []);

  const renderItem = ({ item }: { item: CountryItem }) => (
    <TouchableOpacity
      style={[
        styles.item,
        item.name === 'Nigeria' && styles.activeItem
      ]}
      onPress={() => navigation.navigate('ChooseCity')}
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select country</Text>
      <Text style={styles.subtitle}>
        In which country do you want to offer your services?
      </Text>

      <FlatList
        data={countryList}
        keyExtractor={(item) => item.code}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>
          Haven’t we reached your area yet?
        </Text>
        <Text style={styles.footerText}>
          Request an opening in your area
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2FA36B',
  },

  subtitle: {
    marginVertical: 10,
    color: '#555',
  },

  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  activeItem: {
    backgroundColor: '#e8f5ee',
  },

  itemText: {
    fontSize: 16,
  },

  footer: {
    paddingVertical: 10,
  },

  footerTitle: {
    fontWeight: '600',
  },

  footerText: {
    color: '#2FA36B',
  },
});
