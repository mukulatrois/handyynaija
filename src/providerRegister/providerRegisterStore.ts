import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'providerRegister';

export type ProviderRegisterProfileInfo = {
  name: string;
  surname: string;
  gender: string;
  dateOfBirth: string;
  countryOfBirth: string;
  cityOfBirth: string;
  docType: 'government_id' | 'passport';
  countryOfDoc: string;
  documentNumber: string;
  street: string;
  streetNumber: string;
  zipCode: string;
  city: string;
  region: string;
  country: string;
};

export type ProviderRegisterState = {
  profileInfo?: ProviderRegisterProfileInfo;
  photoSelected?: boolean;
};

let memoryState: ProviderRegisterState | null = null;

async function loadFromStorage(): Promise<ProviderRegisterState> {
  if (memoryState) return memoryState;
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      memoryState = {};
      return memoryState;
    }
    memoryState = JSON.parse(raw) as ProviderRegisterState;
    return memoryState;
  } catch {
    memoryState = {};
    return memoryState;
  }
}

async function saveToStorage(next: ProviderRegisterState) {
  memoryState = next;
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore storage errors in dummy implementation
  }
}

export async function setProviderProfileInfo(
  profileInfo: ProviderRegisterProfileInfo,
) {
  const current = await loadFromStorage();
  const next: ProviderRegisterState = {
    ...current,
    profileInfo,
  };
  await saveToStorage(next);
  // Debug log so you can see the stored data in the console
  // (Metro / React Native dev tools).
  // Remove this in production if not needed.
  // eslint-disable-next-line no-console
  console.log('providerRegister.profileInfo ->', next.profileInfo);
}

export async function setProviderPhotoSelected(selected: boolean) {
  const current = await loadFromStorage();
  const next: ProviderRegisterState = {
    ...current,
    photoSelected: selected,
  };
  await saveToStorage(next);
  // eslint-disable-next-line no-console
  console.log('providerRegister.photoSelected ->', next.photoSelected);
}

export async function clearProviderRegister() {
  memoryState = {};
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export async function getProviderRegisterState(): Promise<ProviderRegisterState> {
  return loadFromStorage();
}

