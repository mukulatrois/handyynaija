import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/Common/SplashScreen';
import WelcomeScreen from '../screens/Common/WelcomeScreen';
import RoleSelectScreen from '../screens/Common/RoleSelectScreen';
import { navigationRef, RootStackParamList } from './navigationService';
import LoginSheet from '../screens/Common/LoginScreen';
import EmailLoginScreen from '../screens/Common/EmailLoginScreen';
import CreateNewAccountScreen from '../screens/Common/CreateNewAccountScreen';
import PhoneSignupScreen from '../screens/Common/PhoneSignupScreen';
import ForgotPasswordScreen from '../screens/Common/ForgotPasswordScreen';
import OTPScreen from '../screens/Common/OTPScreen';
import ResetPasswordScreen from '../screens/Common/ResetPasswordScreen';
import ProfileSetupScreen from '../screens/Common/ProfileSetupScreen';
import BecomeProfessionalIntroScreen from '../screens/Provider/BecomeProfessionalIntroScreen';
import OfferServicesIntroScreen from '../screens/Provider/OfferServicesIntroScreen';
import ProviderSelectCountryScreen from '../screens/Provider/SelectCountryScreen';
import ProviderChooseCityScreen from '../screens/Provider/ChooseCityScreen';
import WorkAreasScreen from '../screens/Provider/WorkAreasScreen';
import WorkScheduleScreen from '../screens/Provider/WorkScheduleScreen';
import UpdateEventScreen from '../screens/Provider/UpdateEventScreen';
import RequestDetailScreen from '../screens/Provider/RequestDetailScreen';
import ProviderPersonalDetailsScreen from '../screens/Provider/PersonalDetailsScreen';
import ListingVerificationScreen from '../screens/Provider/ListingVerificationScreen';
import ListingPriceScreen from '../screens/Provider/ListingPriceScreen';
import ListingPhoneScreen from '../screens/Provider/ListingPhoneScreen';
import ListingAboutMeScreen from '../screens/Provider/ListingAboutMeScreen';
import ProviderEditProfileScreen from '../screens/Provider/EditProfileScreen';
import CreateListingScreen from '../screens/Provider/CreateListingScreen';
import ProviderChangePasswordScreen from '../screens/Provider/ChangePasswordScreen';
import SelectCountryScreen from '../screens/Common/SelectCountryScreen';
import ProfessionalProfileScreen from '../screens/Customer/Service/ProfessionalProfileScreen';
import ChatConversationScreen from '../screens/Common/ChatConversationScreen';
import TabNavigator from './TabNavigator';
import ProviderTabNavigator from './ProviderTabNavigator';
import SearchScreen from '../screens/Customer/SearchServices/SearchScreen';
import RepairMaintenance from '../screens/Customer/SearchServices/RepairMaintenance';
import Home from '../screens/Customer/SearchServices/Home';
import Beauty from '../screens/Customer/SearchServices/Beauty';
import MediaEvent from '../screens/Customer/SearchServices/MediaEvent';
import TechIT from '../screens/Customer/SearchServices/TectIT';
import Automobile from '../screens/Customer/SearchServices/Automobile';
import Others from '../screens/Customer/SearchServices/Others';
import AddAddressScreen from '../screens/Common/AddAddress';
import FindProfessionalsScreen from '../screens/Customer/Service/FindProfessionals';
import ProfessionalDetailScreen from '../screens/Customer/Service/ProfessionalDetail';
import ServiceBookingDetailScreen from '../screens/Customer/Service/ServiceBookingDetailScreen';
import PersonalDetailsScreen from '../screens/Customer/profile/PersonalDetailsScreen';
import EditPersonalDetailsScreen from '../screens/Customer/profile/EditPersonalDetailsScreen';
import ShareAndEarnScreen from '../screens/Customer/profile/ShareAndEarnScreen';
import MyCodesScreen from '../screens/Customer/profile/MyCodesScreen';
import MyAddressesScreen from '../screens/Customer/profile/MyAddressesScreen';
import ChooseLanguageScreen from '../screens/Customer/profile/ChooseLanguageScreen';
import PaymentsAndRefundsScreen from '../screens/Customer/profile/PaymentsAndRefundsScreen';
import AboutHandynaijaScreen from '../screens/Customer/profile/AboutHandynaijaScreen';
import HowCanWeImproveScreen from '../screens/Customer/profile/HowCanWeImproveScreen';
import MyBookingsScreen from '../screens/Customer/profile/MyBookingsScreen';
import HelpScreen from '../screens/Customer/profile/HelpScreen';
import NotificationScreen from '../screens/Common/NotificationScreen';

// Wrapper component with default props for initial route

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
        initialRouteName='Splash'
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
        <Stack.Screen
          name="Login"
          component={LoginSheet}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="EmailLogin"
          component={EmailLoginScreen}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="CreateNewAccount"
          component={CreateNewAccountScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="PhoneSignup"
          component={PhoneSignupScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="OTP"
          component={OTPScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ProfileSetup"
          component={ProfileSetupScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ProviderTabs"
          component={ProviderTabNavigator}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="BecomeProfessionalIntro"
          component={BecomeProfessionalIntroScreen}
        />
        <Stack.Screen
          name="OfferServicesIntro"
          component={OfferServicesIntroScreen}
        />
        <Stack.Screen
          name="ProviderSelectCountry"
          component={ProviderSelectCountryScreen}
        />
        <Stack.Screen
          name="ProviderChooseCity"
          component={ProviderChooseCityScreen}
        />
        <Stack.Screen
          name="WorkAreas"
          component={WorkAreasScreen}
        />
        <Stack.Screen
          name="ProviderWorkSchedule"
          component={WorkScheduleScreen}
        />
        <Stack.Screen
          name="SelectCountry"
          component={SelectCountryScreen}
        />
        <Stack.Screen
          name="ProfessionalProfile"
          component={ProfessionalProfileScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ChatConversation"
          component={ChatConversationScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="RepairMaintenance"
          component={RepairMaintenance}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="Beauty"
          component={Beauty}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="MediaEvent"
          component={MediaEvent}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="TechIT"
          component={TechIT}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="Automobile"
          component={Automobile}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="Others"
          component={Others}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddressScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="FindProfessionals"
          component={FindProfessionalsScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ProfessionalDetail"
          component={ProfessionalDetailScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ServiceBookingDetail"
          component={ServiceBookingDetailScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="PersonalDetails"
          component={PersonalDetailsScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="EditPersonalDetails"
          component={EditPersonalDetailsScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ShareAndEarn"
          component={ShareAndEarnScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="MyCodes"
          component={MyCodesScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="MyBookings"
          component={MyBookingsScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="MyAddresses"
          component={MyAddressesScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ChooseLanguage"
          component={ChooseLanguageScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="PaymentsAndRefunds"
          component={PaymentsAndRefundsScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="Help"
          component={HelpScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="AboutHandynaija"
          component={AboutHandynaijaScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="HowCanWeImprove"
          component={HowCanWeImproveScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />

        {/* Provider flow screens */}
        <Stack.Screen
          name="UpdateEvent"
          component={UpdateEventScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="RequestDetail"
          component={RequestDetailScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ProviderPersonalDetails"
          component={ProviderPersonalDetailsScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ListingVerification"
          component={ListingVerificationScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ListingPrice"
          component={ListingPriceScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ListingPhone"
          component={ListingPhoneScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ListingAboutMe"
          component={ListingAboutMeScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ProviderEditProfile"
          component={ProviderEditProfileScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="CreateListing"
          component={CreateListingScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="ProviderChangePassword"
          component={ProviderChangePasswordScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}