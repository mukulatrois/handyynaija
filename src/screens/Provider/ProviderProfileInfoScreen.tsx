import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  scale,
  fontSize,
  padding,
  margin,
  borderRadius,
} from '../../utils/responsive';
import { TextInput, Button } from '../../components';
import { goBack, navigate } from '../../navigation/navigationService';
import { setProviderProfileInfo } from '../../providerRegister/providerRegisterStore';

const PRIMARY_GREEN = '#3FA565';
const ERROR_RED = '#D32F2F';

const GENDERS = ['Male', 'Female', 'Other'];
const COUNTRIES = ['Nigeria', 'Ghana', 'Cameroon'];
const NIGERIAN_CITIES = [
  'Abuja',
  'Lagos',
  'Ibadan',
  'Port Harcourt',
  'Kano',
  'Ilorin',
  'Calabar',
  'Owerri',
  'Abeokuta',
  'Akure',
];
const REGIONS = ['Lagos', 'Abuja', 'Rivers', 'Kano', 'Oyo', 'Kaduna', 'Others'];

type DocType = 'government_id' | 'passport';

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Please fill in the field'),
  surname: Yup.string().trim().required('Please fill in the field'),
  gender: Yup.string().required('Please fill in the field'),
  dateOfBirth: Yup.string().required('Please fill in the field'),
  countryOfBirth: Yup.string().required('Please fill in the field'),
  cityOfBirth: Yup.string().required('Please fill in the field'),
  countryOfDoc: Yup.string().required('Please fill in the field'),
  documentNumber: Yup.string().trim().required('Please fill in the field'),
  street: Yup.string().trim().required('Please fill in the field'),
  streetNumber: Yup.string().trim().required('Please fill in the field'),
  zipCode: Yup.string().trim().required('Please fill in the field'),
  city: Yup.string().required('Please fill in the field'),
  region: Yup.string().required('Please fill in the field'),
  country: Yup.string().required('Please fill in the field'),
});

type FormValues = {
  name: string;
  surname: string;
  gender: string;
  dateOfBirth: string;
  countryOfBirth: string;
  cityOfBirth: string;
  docType: DocType;
  countryOfDoc: string;
  documentNumber: string;
  street: string;
  streetNumber: string;
  zipCode: string;
  city: string;
  region: string;
  country: string;
};

const initialValues: FormValues = {
  name: '',
  surname: '',
  gender: '',
  dateOfBirth: '',
  countryOfBirth: '',
  cityOfBirth: '',
  docType: 'government_id',
  countryOfDoc: '',
  documentNumber: '',
  street: '',
  streetNumber: '',
  zipCode: '',
  city: '',
  region: '',
  country: 'Nigeria',
};

function DropdownField({
  label,
  placeholder,
  value,
  options,
  onSelect,
  error,
}: {
  label?: string;
  placeholder: string;
  value: string;
  options: string[];
  onSelect: (item: string) => void;
  error?: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.fieldContainer}>
      {label ? <Text style={styles.dropdownLabel}>{label}</Text> : null}
      <TouchableOpacity
        style={[styles.dropdownTouch, error && styles.inputError]}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={[styles.dropdownText, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
        <Icon name="chevron-down" size={scale(20)} color="#333" />
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default function ProviderProfileInfoScreen() {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      await setProviderProfileInfo(values);
      navigate('ProviderUploadPhoto');
    },
  });

  const { values, errors, touched, handleSubmit, setFieldValue, setFieldTouched, setTouched } = formik;

  const onSavePress = () => {
    setTouched({
      name: true,
      surname: true,
      gender: true,
      dateOfBirth: true,
      countryOfBirth: true,
      cityOfBirth: true,
      countryOfDoc: true,
      documentNumber: true,
      street: true,
      streetNumber: true,
      zipCode: true,
      city: true,
      region: true,
      country: true,
    });
    handleSubmit();
  };

  const openEmail = () => {
    Linking.openURL('mailto:contact@apphandynaija.com');
  };

  const formatDate = (d: Date) => {
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const dateOfBirthDate = values.dateOfBirth ? new Date(values.dateOfBirth) : null;

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      if (event?.type === 'set' && selectedDate) {
        setFieldValue('dateOfBirth', selectedDate.toISOString());
        setFieldTouched('dateOfBirth', true);
      }
      setShowDatePicker(false);
      return;
    }
    if (selectedDate) {
      setFieldValue('dateOfBirth', selectedDate.toISOString());
      setFieldTouched('dateOfBirth', true);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.headerButton} activeOpacity={0.7}>
            <Icon name="chevron-back" size={scale(24)} color={PRIMARY_GREEN} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            Information about your profile
          </Text>
          <View style={styles.headerButton} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Important notice */}
          <View style={styles.noticeBox}>
            <Icon name="bulb-outline" size={scale(24)} color="#E6A800" />
            <View style={styles.noticeTextWrap}>
              <Text style={styles.noticeBold}>Important</Text>
              <Text style={styles.noticeText}>
                Check that the information is correct so that you can charge for the services
                correctly.
              </Text>
            </View>
          </View>

          {/* Personal details */}
          <Text style={styles.sectionTitle}>Personal details</Text>
          <TextInput
            placeholder="Name"
            value={values.name}
            onChangeText={(text) => setFieldValue('name', text)}
            onBlur={() => setFieldTouched('name')}
            error={touched.name && errors.name ? errors.name : undefined}
          />
          <TextInput
            placeholder="Surname"
            value={values.surname}
            onChangeText={(text) => setFieldValue('surname', text)}
            onBlur={() => setFieldTouched('surname')}
            error={touched.surname && errors.surname ? errors.surname : undefined}
          />
          <DropdownField
            placeholder="Gender"
            value={values.gender}
            options={GENDERS}
            onSelect={(item) => {
              setFieldValue('gender', item);
              setFieldTouched('gender', true);
            }}
            error={touched.gender && errors.gender ? errors.gender : undefined}
          />
          <View style={styles.fieldContainer}>
            <TouchableOpacity
              style={[
                styles.dropdownTouch,
                touched.dateOfBirth && errors.dateOfBirth && styles.inputError,
              ]}
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dropdownText,
                  !values.dateOfBirth && styles.placeholder,
                ]}
              >
                {dateOfBirthDate ? formatDate(dateOfBirthDate) : 'Date of birth'}
              </Text>
              <Icon name="chevron-down" size={scale(20)} color="#333" />
            </TouchableOpacity>
            {touched.dateOfBirth && errors.dateOfBirth ? (
              <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
            ) : null}
            {showDatePicker && Platform.OS === 'android' && (
              <DateTimePicker
                value={dateOfBirthDate || new Date(2000, 0, 1)}
                mode="date"
                display="default"
                onChange={onDateChange}
                maximumDate={new Date()}
              />
            )}
            {showDatePicker && Platform.OS === 'ios' && (
              <Modal visible transparent animationType="slide">
                <TouchableOpacity
                  style={styles.datePickerOverlay}
                  activeOpacity={1}
                  onPress={() => setShowDatePicker(false)}
                />
                <View style={styles.iosDatePickerContainer}>
                  <View style={styles.iosDatePickerActions}>
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(false)}
                      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                    >
                      <Text style={styles.iosDatePickerCancel}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(false)}
                      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                    >
                      <Text style={styles.iosDatePickerDone}>Done</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={dateOfBirthDate || new Date(2000, 0, 1)}
                    mode="date"
                    display="spinner"
                    onChange={onDateChange}
                    maximumDate={new Date()}
                    style={styles.iosDatePicker}
                  />
                </View>
              </Modal>
            )}
          </View>
          <DropdownField
            placeholder="Country of birth"
            value={values.countryOfBirth}
            options={COUNTRIES}
            onSelect={(item) => {
              setFieldValue('countryOfBirth', item);
              setFieldTouched('countryOfBirth', true);
            }}
            error={touched.countryOfBirth && errors.countryOfBirth ? errors.countryOfBirth : undefined}
          />
          <DropdownField
            placeholder="City of birth"
            value={values.cityOfBirth}
            options={NIGERIAN_CITIES}
            onSelect={(item) => {
              setFieldValue('cityOfBirth', item);
              setFieldTouched('cityOfBirth', true);
            }}
            error={touched.cityOfBirth && errors.cityOfBirth ? errors.cityOfBirth : undefined}
          />

          {/* Identify Documents */}
          <Text style={styles.sectionTitle}>Identify Documents</Text>
          <View style={styles.docOptions}>
            <TouchableOpacity
              style={[styles.docCard, values.docType === 'government_id' && styles.docCardSelected]}
              onPress={() => setFieldValue('docType', 'government_id')}
              activeOpacity={0.7}
            >
              <View style={[styles.radioOuter, values.docType === 'government_id' && styles.radioSelected]}>
                {values.docType === 'government_id' && (
                  <Icon name="checkmark" size={scale(16)} color="#fff" />
                )}
              </View>
              <Text style={styles.docCardText}>Government ID</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.docCard, values.docType === 'passport' && styles.docCardSelected]}
              onPress={() => setFieldValue('docType', 'passport')}
              activeOpacity={0.7}
            >
              <View style={[styles.radioOuter, values.docType === 'passport' && styles.radioSelected]}>
                {values.docType === 'passport' && (
                  <Icon name="checkmark" size={scale(16)} color="#fff" />
                )}
              </View>
              <Text style={styles.docCardText}>Passport</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.uploadLabel}>Upload the documents</Text>
          <DropdownField
            placeholder="Country of the document"
            value={values.countryOfDoc}
            options={COUNTRIES}
            onSelect={(item) => {
              setFieldValue('countryOfDoc', item);
              setFieldTouched('countryOfDoc', true);
            }}
            error={touched.countryOfDoc && errors.countryOfDoc ? errors.countryOfDoc : undefined}
          />
          <TextInput
            placeholder="Document number"
            value={values.documentNumber}
            onChangeText={(text) => setFieldValue('documentNumber', text)}
            onBlur={() => setFieldTouched('documentNumber')}
            error={touched.documentNumber && errors.documentNumber ? errors.documentNumber : undefined}
          />
          <Text style={styles.emailPrompt}>
            Don't have any of these document?{' '}
            <Text style={styles.emailLink} onPress={openEmail}>
              Send us an email to contact@apphandynaija.com
            </Text>
          </Text>

          {/* Address */}
          <Text style={styles.sectionTitle}>Address</Text>
          <TextInput
            placeholder="Street"
            value={values.street}
            onChangeText={(text) => setFieldValue('street', text)}
            onBlur={() => setFieldTouched('street')}
            error={touched.street && errors.street ? errors.street : undefined}
          />
          <TextInput
            placeholder="Street number"
            value={values.streetNumber}
            onChangeText={(text) => setFieldValue('streetNumber', text)}
            onBlur={() => setFieldTouched('streetNumber')}
            error={touched.streetNumber && errors.streetNumber ? errors.streetNumber : undefined}
          />
          <TextInput
            placeholder="Zip/Postal Code"
            value={values.zipCode}
            onChangeText={(text) => setFieldValue('zipCode', text)}
            onBlur={() => setFieldTouched('zipCode')}
            keyboardType="numeric"
            error={touched.zipCode && errors.zipCode ? errors.zipCode : undefined}
          />
          <DropdownField
            placeholder="City"
            value={values.city}
            options={NIGERIAN_CITIES}
            onSelect={(item) => {
              setFieldValue('city', item);
              setFieldTouched('city', true);
            }}
            error={touched.city && errors.city ? errors.city : undefined}
          />
          <DropdownField
            placeholder="Street/Country/Region"
            value={values.region}
            options={REGIONS}
            onSelect={(item) => {
              setFieldValue('region', item);
              setFieldTouched('region', true);
            }}
            error={touched.region && errors.region ? errors.region : undefined}
          />
          <DropdownField
            placeholder="Country"
            value={values.country}
            options={COUNTRIES}
            onSelect={(item) => {
              setFieldValue('country', item);
              setFieldTouched('country', true);
            }}
            error={touched.country && errors.country ? errors.country : undefined}
          />

          <Button
            title="Save"
            onPress={onSavePress}
            variant="primary"
            style={styles.saveButton}
          />
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
    justifyContent: 'space-between',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerButton: {
    minWidth: scale(40),
  },
  headerTitle: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: padding.xl,
    paddingTop: padding.lg,
    paddingBottom: margin.xxxl,
  },
  noticeBox: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: borderRadius.lg,
    padding: padding.lg,
    marginBottom: margin.xl,
    alignItems: 'flex-start',
    gap: padding.md,
  },
  noticeTextWrap: {
    flex: 1,
  },
  noticeBold: {
    fontSize: fontSize(14),
    fontWeight: '700',
    color: '#333',
    marginBottom: padding.xs,
  },
  noticeText: {
    fontSize: fontSize(14),
    color: '#555',
    lineHeight: fontSize(20),
  },
  sectionTitle: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: PRIMARY_GREEN,
    marginBottom: margin.lg,
    marginTop: margin.md,
  },
  fieldContainer: {
    marginBottom: margin.lg,
  },
  dropdownTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: borderRadius.lg,
    padding: padding.lg,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: fontSize(16),
    color: '#1A1A1A',
  },
  dropdownLabel: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: '#000',
    marginBottom: padding.sm,
  },
  placeholder: {
    color: '#999',
  },
  inputError: {
    borderColor: ERROR_RED,
  },
  errorText: {
    fontSize: fontSize(12),
    color: ERROR_RED,
    marginTop: padding.xs,
  },
  datePickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  iosDatePickerContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    paddingBottom: padding.xl,
  },
  iosDatePickerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: padding.xl,
    paddingVertical: padding.md,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iosDatePickerCancel: {
    fontSize: fontSize(16),
    color: '#666',
  },
  iosDatePickerDone: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: PRIMARY_GREEN,
  },
  iosDatePicker: {
    height: scale(200),
  },
  docOptions: {
    gap: margin.sm,
    marginBottom: margin.sm,
  },
  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: borderRadius.lg,
    padding: padding.lg,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: padding.md,
  },
  docCardSelected: {
    borderColor: PRIMARY_GREEN,
  },
  radioOuter: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: PRIMARY_GREEN,
    borderColor: PRIMARY_GREEN,
  },
  docCardText: {
    fontSize: fontSize(16),
    color: '#1A1A1A',
  },
  uploadLabel: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: '#000',
    marginBottom: padding.sm,
    marginTop: margin.sm,
  },
  emailPrompt: {
    fontSize: fontSize(14),
    color: '#333',
    marginBottom: margin.xl,
    lineHeight: fontSize(20),
  },
  emailLink: {
    color: PRIMARY_GREEN,
    fontWeight: '600',
  },
  saveButton: {
    marginTop: margin.xl,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '50%',
    paddingBottom: padding.xl,
  },
  modalHandle: {
    width: scale(40),
    height: scale(4),
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: padding.md,
    marginBottom: padding.sm,
  },
  modalItem: {
    paddingVertical: padding.lg,
    paddingHorizontal: padding.xl,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: fontSize(16),
    color: '#1A1A1A',
  },
});
