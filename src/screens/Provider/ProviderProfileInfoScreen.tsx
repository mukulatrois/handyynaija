import React, { useEffect, useRef, useState } from 'react';
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
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
  TextInput as RNTextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { countries } from 'countries-list';
import {
  scale,
  fontSize,
  padding,
  margin,
  borderRadius,
} from '../../utils/responsive';
import { TextInput, Button } from '../../components';
import { goBack, navigate } from '../../navigation/navigationService';
import { RootStackParamList } from '../../navigation/navigationService';
import { setProviderProfileInfo } from '../../providerRegister/providerRegisterStore';
import { Loadingcomponent } from '../../components/LoadingComponent';
import { RouteProp, useRoute } from '@react-navigation/native';

const SAVE_PROVIDER_DETAIL_API_URL = 'https://jolloyard-be.myfileshosting.com/api/v1/providers/save-provider-detail';
const AUTH_TOKEN_KEY = 'auth_accessToken';
const AUTH_USER_KEY = 'auth_user';

const PRIMARY_GREEN = '#3FA565';
const ERROR_RED = '#D32F2F';

const GENDERS = ['Male', 'Female', 'Other'];
const COUNTRIES = Object.values(countries)
  .map((c) => c.name)
  .sort((a, b) => a.localeCompare(b));
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
  disabled,
}: {
  label?: string;
  placeholder: string;
  value: string;
  options: string[];
  onSelect: (item: string) => void;
  error?: string;
  disabled?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');

  const selectedIndex = options.findIndex((opt) => opt === value);

  const rawFiltered =
    search.trim().length === 0
      ? options
      : options.filter((opt) =>
        opt.toLowerCase().includes(search.trim().toLowerCase()),
      );

  const filteredOptions =
    search.trim().length === 0 && value && selectedIndex >= 0
      ? [value, ...rawFiltered.filter((opt) => opt !== value)]
      : rawFiltered;
  return (
    <View style={styles.fieldContainer}>
      {label ? <Text style={styles.dropdownLabel}>{label}</Text> : null}
      <TouchableOpacity
        style={[styles.dropdownTouch, error && styles.inputError, disabled && styles.dropdownDisabledTouch]}
        onPress={() => {
          if (disabled) return;
          setVisible(true);
        }}
        activeOpacity={0.7}
        disabled={disabled}
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
            {options.length > 10 && (
              <View style={styles.searchContainer}>
                <RNTextInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search..."
                  placeholderTextColor="#999"
                  style={styles.searchInput}
                />
              </View>
            )}
            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    item === value && styles.modalItemSelected,
                  ]}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      item === value && styles.modalItemTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

function formatDateForApi(isoDate: string): string {
  if (!isoDate) return '';
  const d = new Date(isoDate);
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export default function ProviderProfileInfoScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'ProviderProfileInfo'>>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [saving, setSaving] = useState(false);
  const [identityDocFrontUri, setIdentityDocFrontUri] = useState<string | null>(null);
  const [identityDocBackUri, setIdentityDocBackUri] = useState<string | null>(null);
  const [selfieUri, setSelfieUri] = useState<string | null>(null);
  const [docModalVisible, setDocModalVisible] = useState(false);
  const [activeDocSide, setActiveDocSide] = useState<'front' | 'back' | null>(null);

  const nameRef = useRef<RNTextInput | null>(null);
  const surnameRef = useRef<RNTextInput | null>(null);
  const documentNumberRef = useRef<RNTextInput | null>(null);
  const streetRef = useRef<RNTextInput | null>(null);
  const streetNumberRef = useRef<RNTextInput | null>(null);
  const zipCodeRef = useRef<RNTextInput | null>(null);

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setSaving(true);
      try {
        const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        const userJson = await AsyncStorage.getItem(AUTH_USER_KEY);
        let providerId = '';
        let phoneNumber = '';
        if (userJson) {
          try {
            const user = JSON.parse(userJson) as { id?: string; phone?: string; phone_number?: string; provider_id?: string };
            providerId = String(user?.id ?? user?.provider_id ?? '');
            phoneNumber = user?.phone ?? user?.phone_number ?? '';
          } catch {
            // ignore
          }
        }

        const formData = new FormData();
        formData.append('provider_id', providerId);
        formData.append('phone_number', phoneNumber);
        formData.append('name', values.name.trim());
        formData.append('surname', values.surname.trim());
        formData.append('gender', values.gender.toLowerCase());
        formData.append('date_of_birth', formatDateForApi(values.dateOfBirth));
        formData.append('birth_country', values.countryOfBirth);
        formData.append('birth_city', values.cityOfBirth);
        formData.append('country', values.country);
        formData.append('city', values.city);
        formData.append('street', values.street.trim());
        formData.append('street_number', values.streetNumber.trim());
        formData.append('postal_code', values.zipCode.trim());
        formData.append('work_country', values.country);
        formData.append('work_city', values.city);
        formData.append('work_area_name', JSON.stringify([values.region]));
        formData.append('document_type', values.docType);
        formData.append('document_number', values.documentNumber.trim());
        formData.append('document_country', values.countryOfDoc);

        if (identityDocFrontUri) {
          formData.append('identity_document_front', {
            uri: identityDocFrontUri,
            type: 'image/jpeg',
            name: 'identity_document_front.jpg',
          } as any);
        }
        if (identityDocBackUri) {
          formData.append('identity_document_back', {
            uri: identityDocBackUri,
            type: 'image/jpeg',
            name: 'identity_document_back.jpg',
          } as any);
        }
        if (selfieUri) {
          formData.append('selfie_image', {
            uri: selfieUri,
            type: 'image/jpeg',
            name: 'selfie.jpg',
          } as any);
        }


        // Alert.alert("All Fields are required")
        const headers: Record<string, string> = {};
        if (token) headers.Authorization = `Bearer ${token}`;


        // const res :any=''
        const res = await fetch(SAVE_PROVIDER_DETAIL_API_URL, {
          method: 'POST',
          headers,
          body: formData,
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const message = data?.message ?? data?.error ?? `Request failed (${res.status})`;
          Alert.alert('Error', typeof message === 'string' ? message : JSON.stringify(message));
          return;
        }

        await setProviderProfileInfo(values);
        navigate('ProviderTabs');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Network error. Please try again.';
        Alert.alert('Error', message);
        // Alert.alert("All Fields are required")
      } finally {
        setSaving(false);
      }
    },
  });

  const { values, errors, touched, submitCount, handleSubmit, setFieldValue, setFieldTouched } = formik;

  const workAddressParams = route.params;
  const isWorkAddressReadOnly = Boolean(workAddressParams?.address || workAddressParams?.coordinates);

  const inferredWorkAddress = (address?: string) => {
    const input = (address ?? '').toLowerCase();

    const matchCity = (token: string) => input.includes(token);
    const cityByToken: Array<{ token: string; city: string; region: string }> = [
      { token: 'lagos', city: 'Lagos', region: 'Lagos' },
      { token: 'abuja', city: 'Abuja', region: 'Abuja' },
      { token: 'port harcourt', city: 'Port Harcourt', region: 'Rivers' },
      { token: 'rivers', city: 'Port Harcourt', region: 'Rivers' },
      { token: 'kano', city: 'Kano', region: 'Kano' },
      { token: 'ibadan', city: 'Ibadan', region: 'Oyo' },
      { token: 'oyo', city: 'Ibadan', region: 'Oyo' },
      { token: 'ilorin', city: 'Ilorin', region: 'Oyo' },
      { token: 'calabar', city: 'Calabar', region: 'Others' },
      { token: 'owerri', city: 'Owerri', region: 'Others' },
      { token: 'abeokuta', city: 'Abeokuta', region: 'Others' },
      { token: 'akure', city: 'Akure', region: 'Others' },
      { token: 'kaduna', city: 'Kano', region: 'Kaduna' }, // fallback city (options don't include Kaduna)
    ];

    const match = cityByToken.find((m) => matchCity(m.token));
    const inferredCity = match?.city ?? 'Lagos';
    const inferredRegion = match?.region ?? 'Others';

    const streetNumberMatch = input.match(/\b(\d{1,6})\b/);
    const streetNumber = streetNumberMatch ? streetNumberMatch[1] : '1';

    const zipMatch = input.match(/\b(\d{4,6})\b/);
    const zipCode = zipMatch ? zipMatch[1] : '00000';

    return {
      street: address ?? '',
      streetNumber,
      zipCode,
      country: 'Nigeria',
      city: inferredCity,
      region: inferredRegion,
    };
  };

  useEffect(() => {
    if (!workAddressParams?.address) return;

    const next = inferredWorkAddress(workAddressParams.address);

    // Prefill + lock fields so the user can't change the selected work address.
    setFieldValue('street', next.street);
    setFieldValue('streetNumber', next.streetNumber);
    setFieldValue('zipCode', next.zipCode);
    setFieldValue('country', next.country);
    setFieldValue('city', next.city);
    setFieldValue('region', next.region);

    setFieldTouched('street', false);
    setFieldTouched('streetNumber', false);
    setFieldTouched('zipCode', false);
    setFieldTouched('country', false);
    setFieldTouched('city', false);
    setFieldTouched('region', false);
  }, [workAddressParams?.address]);

  // Show field error when touched or after submit attempt, but never when the field has a value
  // (avoids showing "Please fill in the field" after user has selected a value)
  const showError = (field: keyof FormValues) => {
    const err = errors[field];
    if (!err) return undefined;
    const val = values[field];
    const hasValue = typeof val === 'string' ? val.trim() !== '' : !!val;
    if (hasValue) return undefined;
    return (touched[field] || submitCount > 0) ? err : undefined;
  };

  const onSavePress = () => {
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

  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera access',
          message: 'HandyNaija needs camera access to take photos for your documents.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return result === PermissionsAndroid.RESULTS.GRANTED;
    } catch {
      return false;
    }
  };

  const requestGalleryPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;
    const apiLevel = (Platform.Version as number) || 0;
    const permission =
      apiLevel >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    try {
      const result = await PermissionsAndroid.request(permission, {
        title: 'Photo access',
        message: 'HandyNaija needs access to your photos to select images.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      return result === PermissionsAndroid.RESULTS.GRANTED;
    } catch {
      return false;
    }
  };

  const pickImageFromGallery = async (onSuccess: (path: string) => void) => {
    const granted = await requestGalleryPermission();
    if (!granted) {
      Alert.alert(
        'Permission required',
        'Photo access is needed to choose an image. Please enable it in Settings.',
      );
      return;
    }
    try {
      const image = await ImageCropPicker.openPicker({ cropping: false });
      onSuccess(image.path);
    } catch (e: any) {
      if (e?.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', e?.message ?? 'Failed to pick image');
      }
    }
  };

  const takePhotoWithCamera = async (
    onSuccess: (path: string) => void,
    useFrontCamera = false,
  ) => {
    const granted = await requestCameraPermission();
    if (!granted) {
      Alert.alert(
        'Permission required',
        'Camera access is needed to take a photo. Please enable it in Settings.',
      );
      return;
    }
    try {
      const image = await ImageCropPicker.openCamera({
        cropping: false,
        useFrontCamera: !!useFrontCamera,
      });
      onSuccess(image.path);
    } catch (e: any) {
      if (e?.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', e?.message ?? 'Failed to take photo');
      }
    }
  };

  const showImageSourceAlert = (
    title: string,
    onCamera: () => void,
    onGallery: () => void,
  ) => {
    Alert.alert(title, 'Take a photo or choose from gallery', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Take Photo', onPress: onCamera },
      { text: 'Choose from Gallery', onPress: onGallery },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
      { saving && <Loadingcomponent />}
        {/* Header with back arrow and progress bar */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.headerButton} activeOpacity={0.7}>
            <Icon name="chevron-back" size={scale(24)} color={PRIMARY_GREEN} />
          </TouchableOpacity>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.screenTitle}>Information about your profile</Text>
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
            inputRef={nameRef}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => surnameRef.current?.focus()}
            error={showError('name')}
          />
          <TextInput
            placeholder="Surname"
            value={values.surname}
            onChangeText={(text) => setFieldValue('surname', text)}
            onBlur={() => setFieldTouched('surname')}
            inputRef={surnameRef}
            returnKeyType="next"
            blurOnSubmit={false}
            error={showError('surname')}
          />
          <DropdownField
            placeholder="Gender"
            value={values.gender}
            options={GENDERS}
            onSelect={(item) => {
              setFieldValue('gender', item);
              setFieldTouched('gender', true);
            }}
            error={showError('gender')}
          />
          <View style={styles.fieldContainer}>
            <TouchableOpacity
              style={[
                styles.dropdownTouch,
                showError('dateOfBirth') && styles.inputError,
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
            {showError('dateOfBirth') ? (
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
            error={showError('countryOfBirth')}
          />
          <DropdownField
            placeholder="City of birth"
            value={values.cityOfBirth}
            options={NIGERIAN_CITIES}
            onSelect={(item) => {
              setFieldValue('cityOfBirth', item);
              setFieldTouched('cityOfBirth', true);
            }}
            error={showError('cityOfBirth')}
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
            error={showError('countryOfDoc')}
          />
          <TextInput
            placeholder="Document number"
            value={values.documentNumber}
            onChangeText={(text) => setFieldValue('documentNumber', text)}
            onBlur={() => setFieldTouched('documentNumber')}
            inputRef={documentNumberRef}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => streetRef.current?.focus()}
            error={showError('documentNumber')}
          />
          <Text style={styles.uploadLabel}>Identity document (front)</Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => {
              setActiveDocSide('front');
              setDocModalVisible(true);
            }}
            activeOpacity={0.7}
          >
            <View style={styles.uploadButtonLeft}>
              <Icon name="document-attach-outline" size={scale(20)} color={PRIMARY_GREEN} />
              <Text style={styles.uploadButtonText}>
                {identityDocFrontUri ? 'Document front selected' : 'Take photo or choose file'}
              </Text>
            </View>
            {identityDocFrontUri ? (
              <Image
                source={{ uri: identityDocFrontUri }}
                style={styles.imagePreview}
                resizeMode="cover"
              />
            ) : null}
          </TouchableOpacity>
          <Text style={styles.uploadLabel}>Identity document (back)</Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => {
              setActiveDocSide('back');
              setDocModalVisible(true);
            }}
            activeOpacity={0.7}
          >
            <View style={styles.uploadButtonLeft}>
              <Icon name="document-attach-outline" size={scale(20)} color={PRIMARY_GREEN} />
              <Text style={styles.uploadButtonText}>
                {identityDocBackUri ? 'Document back selected' : 'Take photo or choose file'}
              </Text>
            </View>
            {identityDocBackUri ? (
              <Image
                source={{ uri: identityDocBackUri }}
                style={styles.imagePreview}
                resizeMode="cover"
              />
            ) : null}
          </TouchableOpacity>
          <Text style={styles.uploadLabel}>Selfie</Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => takePhotoWithCamera(setSelfieUri, true)}
            activeOpacity={0.7}
          >
            <View style={styles.uploadButtonLeft}>
              <Icon name="person-outline" size={scale(20)} color={PRIMARY_GREEN} />
              <Text style={styles.uploadButtonText}>
                {selfieUri ? 'Selfie selected' : 'Take selfie'}
              </Text>
            </View>
            {selfieUri ? (
              <Image
                source={{ uri: selfieUri }}
                style={styles.imagePreview}
                resizeMode="cover"
              />
            ) : null}
          </TouchableOpacity>
          <Text style={styles.emailPrompt}>
            Don't have any of these document?{' '}
            <Text style={styles.emailLink} onPress={openEmail}>
              Send us an email to contact@apphandynaija.com
            </Text>
          </Text>

          {/* Address */}
          <Text style={styles.sectionTitle}>Address</Text>
          {workAddressParams?.distanceKm ? (
            <Text style={styles.noticeText}>
              Service distance: {workAddressParams.distanceKm} km
            </Text>
          ) : null}
          <TextInput
            placeholder="Street"
            value={values.street}
            onChangeText={(text) => setFieldValue('street', text)}
            onBlur={() => setFieldTouched('street')}
            inputRef={streetRef}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => streetNumberRef.current?.focus()}
            error={showError('street')}
            editable={!isWorkAddressReadOnly}
          />
          <TextInput
            placeholder="Street number"
            value={values.streetNumber}
            onChangeText={(text) => setFieldValue('streetNumber', text)}
            onBlur={() => setFieldTouched('streetNumber')}
            inputRef={streetNumberRef}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => zipCodeRef.current?.focus()}
            error={showError('streetNumber')}
            editable={!isWorkAddressReadOnly}
          />
          <TextInput
            placeholder="Zip/Postal Code"
            value={values.zipCode}
            onChangeText={(text) => setFieldValue('zipCode', text)}
            onBlur={() => setFieldTouched('zipCode')}
            keyboardType="numeric"
            inputRef={zipCodeRef}
            returnKeyType="done"
            error={showError('zipCode')}
            editable={!isWorkAddressReadOnly}
          />
          <DropdownField
            placeholder="Country"
            value={values.country}
            options={COUNTRIES}
            onSelect={(item) => {
              setFieldValue('country', item);
              setFieldTouched('country', true);
            }}
            error={showError('country')}
            disabled={isWorkAddressReadOnly}
          />

          <DropdownField
            placeholder="City"
            value={values.city}
            options={NIGERIAN_CITIES}
            onSelect={(item) => {
              setFieldValue('city', item);
              setFieldTouched('city', true);
            }}
            error={showError('city')}
            disabled={isWorkAddressReadOnly}
          />
          <DropdownField
            placeholder="Street/Country/Region"
            value={values.region}
            options={REGIONS}
            onSelect={(item) => {
              setFieldValue('region', item);
              setFieldTouched('region', true);
            }}
            error={showError('region')}
            disabled={isWorkAddressReadOnly}
          />

          <Button
            title={saving ? 'Saving…' : 'Save'}
            onPress={onSavePress}
            variant="primary"
            style={styles.saveButton}
            disabled={saving}
          />
          {saving ? (
            <ActivityIndicator size="small" color={PRIMARY_GREEN} style={styles.loader} />
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
      {/* Identity document full-screen modal */}
      <Modal
        visible={docModalVisible}
        transparent={false}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setDocModalVisible(false)}
      >
        <SafeAreaView style={styles.docModalOverlay}>
          <View style={styles.docModalHeader}>
            <TouchableOpacity
              onPress={() => setDocModalVisible(false)}
              style={styles.docModalBackButton}
              activeOpacity={0.7}
            >
              <Icon name="chevron-back" size={scale(24)} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.docModalCard}>
            <Text style={styles.docModalTitle}>
              {activeDocSide === 'back'
                ? 'Upload ID (Back Side)'
                : 'Upload ID (Front Side)'}
            </Text>
            <Text style={styles.docModalSubtitle}>
              Take a clear photo of the {activeDocSide === 'back' ? 'back' : 'front'} side of
              your ID
            </Text>
            <View style={styles.docModalFrame}>
              {activeDocSide === 'back' && identityDocBackUri ? (
                <Image
                  source={{ uri: identityDocBackUri }}
                  style={styles.docModalPreviewImage}
                  resizeMode="cover"
                />
              ) : null}
              {activeDocSide !== 'back' && identityDocFrontUri ? (
                <Image
                  source={{ uri: identityDocFrontUri }}
                  style={styles.docModalPreviewImage}
                  resizeMode="cover"
                />
              ) : null}
              {((activeDocSide === 'back' && !identityDocBackUri) ||
                (activeDocSide !== 'back' && !identityDocFrontUri)) && (
                  <>
                    <Icon name="camera-outline" size={scale(40)} color={PRIMARY_GREEN} />
                    <Text style={styles.docModalFrameText}>Position your ID within the frame</Text>
                  </>
                )}
            </View>
            <View style={styles.docModalChecklist}>
              <View style={styles.docModalChecklistRow}>
                <Icon name="checkmark-circle" size={scale(16)} color={PRIMARY_GREEN} />
                <Text style={styles.docModalChecklistText}>Make sure Image is clear</Text>
              </View>
              <View style={styles.docModalChecklistRow}>
                <Icon name="checkmark-circle" size={scale(16)} color={PRIMARY_GREEN} />
                <Text style={styles.docModalChecklistText}>Make sure No shadows detected</Text>
              </View>
              <View style={styles.docModalChecklistRow}>
                <Icon name="checkmark-circle" size={scale(16)} color={PRIMARY_GREEN} />
                <Text style={styles.docModalChecklistText}>Make sure No glare detected</Text>
              </View>
              <View style={styles.docModalChecklistRow}>
                <Icon name="checkmark-circle" size={scale(16)} color={PRIMARY_GREEN} />
                <Text style={styles.docModalChecklistText}>Make sure Text is readable</Text>
              </View>
            </View>
            <View style={styles.docModalButtonsRow}>
              <TouchableOpacity
                style={styles.docModalButton}
                activeOpacity={0.7}
                onPress={() => {
                  if (activeDocSide === 'back') {
                    takePhotoWithCamera(setIdentityDocBackUri, false);
                  } else {
                    takePhotoWithCamera(setIdentityDocFrontUri, false);
                  }
                }}
              >
                <Icon name="camera-outline" size={scale(18)} color="#fff" />
                <Text style={styles.docModalButtonText}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.docModalButtonOutline}
                activeOpacity={0.7}
                onPress={() => {
                  if (activeDocSide === 'back') {
                    pickImageFromGallery(setIdentityDocBackUri);
                  } else {
                    pickImageFromGallery(setIdentityDocFrontUri);
                  }
                }}
              >
                <Icon name="cloud-upload-outline" size={scale(18)} color={PRIMARY_GREEN} />
                <Text style={styles.docModalButtonTextOutline}>Upload</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
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
    paddingHorizontal: padding.xl,
    paddingVertical: padding.lg,
    paddingBottom: padding.md,
    gap: padding.md,
  },
  headerButton: {
    padding: padding.xs,
  },
  progressBar: {
    flex: 1,
    height: scale(6),
    backgroundColor: '#E0E0E0',
    borderRadius: scale(10),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3FA565',
    borderRadius: scale(10),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: padding.xl,
    paddingTop: padding.lg,
    paddingBottom: margin.xxxl,
  },
  screenTitle: {
    fontSize: fontSize(24),
    fontWeight: 'bold',
    color: PRIMARY_GREEN,
    marginBottom: margin.lg,
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
  dropdownDisabledTouch: {
    backgroundColor: '#F5F5F5',
    opacity: 0.9,
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
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: padding.md,
    paddingHorizontal: padding.lg,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: borderRadius.lg,
    marginBottom: margin.lg,
  },
  uploadButtonText: {
    fontSize: fontSize(14),
    color: PRIMARY_GREEN,
    fontWeight: '500',
  },
  uploadButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.sm,
    flexShrink: 1,
  },
  imagePreview: {
    width: scale(48),
    height: scale(32),
    borderRadius: borderRadius.sm,
    marginLeft: padding.sm,
  },
  saveButton: {
    marginTop: margin.xl,
  },
  loader: {
    marginTop: margin.md,
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
  searchContainer: {
    paddingHorizontal: padding.xl,
    paddingBottom: padding.sm,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: borderRadius.lg,
    paddingHorizontal: padding.lg,
    paddingVertical: padding.sm,
    fontSize: fontSize(14),
    color: '#1A1A1A',
    backgroundColor: '#fafafa',
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
  modalItemSelected: {
    backgroundColor: '#E8F5E9',
  },
  modalItemTextSelected: {
    fontWeight: '700',
    color: PRIMARY_GREEN,
  },
  docModalOverlay: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: padding.xl,
    paddingBottom: padding.xl,
  },
  docModalCard: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 0,
    paddingTop: padding.sm,
  },
  docModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: padding.sm,
  },
  docModalBackButton: {
    paddingVertical: padding.xs,
    paddingRight: padding.md,
  },
  docModalTitle: {
    fontSize: fontSize(20),
    fontWeight: '700',
    color: '#000',
    marginBottom: padding.sm,
  },
  docModalSubtitle: {
    fontSize: fontSize(14),
    color: '#555',
    marginBottom: margin.lg,
  },
  docModalFrame: {
    borderWidth: 1,
    borderColor: PRIMARY_GREEN,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: margin.xl,
    overflow: 'hidden',
    height: scale(180),
    width: '100%',
  },
  docModalFrameText: {
    fontSize: fontSize(14),
    color: '#555',
    marginTop: padding.md,
    textAlign: 'center',
  },
  docModalPreviewImage: {
    width: '100%',
    height: '100%',
  },
  docModalChecklist: {
    marginBottom: margin.xl,
  },
  docModalChecklistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: padding.xs,
    gap: padding.sm,
  },
  docModalChecklistText: {
    fontSize: fontSize(14),
    color: 'black',
  },
  docModalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: margin.md,
  },
  docModalButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: padding.md,
    borderRadius: borderRadius.lg,
    backgroundColor: PRIMARY_GREEN,
    gap: padding.sm,
  },
  docModalButtonOutline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: padding.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: PRIMARY_GREEN,
    gap: padding.sm,
  },
  docModalButtonText: {
    fontSize: fontSize(14),
    color: '#fff',
    fontWeight: '600',
  },
  docModalButtonTextOutline: {
    fontSize: fontSize(14),
    color: PRIMARY_GREEN,
    fontWeight: '600',
  },
});
