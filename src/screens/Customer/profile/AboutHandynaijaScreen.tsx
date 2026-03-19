import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomIcon from '../../../components/Icon';
import { goBack } from '../../../navigation/navigationService';
import { scale, fontSize, padding } from '../../../utils/responsive';

const LOREM_PARAGRAPHS = [
  'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.',
  'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years.',
  'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
  'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form.',
];

export default function AboutHandynaijaScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.headerLeft}>
          <CustomIcon name="arrow-back" size={scale(24)} color="#3FA565" />
          <Text style={styles.headerTitle}>About Handynaija App</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {LOREM_PARAGRAPHS.map((para, index) => (
          <Text key={index} style={styles.paragraph}>
            {para}
          </Text>
        ))}
        <View style={{ height: scale(40) }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  paragraph: {
    fontSize: fontSize(15),
    color: '#333',
    lineHeight: scale(24),
    marginBottom: scale(16),
  },
});
