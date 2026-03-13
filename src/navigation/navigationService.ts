import {
  CommonActions,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

/* ---------------- ROUTE TYPES ---------------- */

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  RoleSelect: { type?: string; name?: string; email?: string } | undefined;
  Login: undefined;
  EmailLogin: undefined;
  CreateNewAccount: { roleKey?: 2 | 3 };
  PhoneSignup: undefined;
  ForgotPassword: undefined;
  OTP: { phoneNumber?: string; email?: string; type?: 'email' | 'phone' };
  ResetPassword: { email: string; otp: string };
  ProfileSetup: undefined;
  BecomeProfessionalIntro: undefined;
  OfferServicesIntro: undefined;
  ProviderSelectCountry: undefined;
  ProviderChooseCity: undefined;
  WorkAreas: undefined;
  ProviderWorkSchedule: undefined;
  SelectCountry: undefined;
  MainTabs: undefined;
  ProviderTabs: undefined;
  SearchService: undefined;
  ProfessionalProfile: { categoryId?: string };
  ChatConversation: { chatId?: string };
  Search: undefined;
  Home: {
    title: string;
    items: any[];
    layout?: string;
  };
  Beauty: undefined;
  MediaEvent: undefined;
  TechIT: undefined;
  Others: undefined;
  RepairMaintenance: undefined;
  Automobile: undefined;
  AddAddress: { fromBooking?: boolean } | undefined;
  ServiceAddress: { address?: string } | undefined;
  FindProfessionals: undefined;
  SelectDateTime: { serviceTitle?: string } | undefined;
  ProfessionalDetail: { professionalId: string };
  ServiceBookingDetail: { bookingId?: string };
  PersonalDetails: undefined;
  EditPersonalDetails: undefined;
  ShareAndEarn: undefined;
  MyCodes: undefined;
  MyBookings: undefined;
  MyAddresses: undefined;
  ChooseLanguage: undefined;
  PaymentsAndRefunds: undefined;
  Help: undefined;
  AboutHandynaija: undefined;
  HowCanWeImprove: undefined;
  Notification: undefined;
  UpdateEvent: undefined;
  RequestDetail: { requestId?: string };
  ProviderPersonalDetails: undefined;
  ProviderProfileInfo: undefined;
  ProviderUploadPhoto: undefined;
  ProviderVerifyPhoto: undefined;
  ListingVerification: undefined;
  ListingPrice: undefined;
  ListingPhone: undefined;
  ListingAboutMe: undefined;
  ProviderEditProfile: undefined;
  CreateListing: undefined;
  ProviderChangePassword: undefined;
};

/* ---------------- NAV REF ---------------- */

export const navigationRef =
  createNavigationContainerRef<RootStackParamList>();

/* ---------------- RESET ---------------- */

export function resetNavigation<T extends keyof RootStackParamList>(
  routeName: T,
  params?: RootStackParamList[T]
) {
  if (!navigationRef.isReady()) return;

  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }],
    })
  );
}

/* ---------------- NAVIGATE ---------------- */

export function navigate<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T]
) {
  if (!navigationRef.isReady()) return;
  navigationRef.navigate(name as any, params as any);
}

/* ---------------- REPLACE ---------------- */

export function replace<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T]
) {
  if (!navigationRef.isReady()) return;

  navigationRef.dispatch(StackActions.replace(name, params));
}

/* ---------------- BACK ---------------- */

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

/* ---------------- CURRENT ROUTE ---------------- */

export function getCurrentRouteName() {
  return navigationRef.getCurrentRoute()?.name;
}
