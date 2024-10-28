import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { EvaIconsPack } from "@ui-kitten/eva-icons"
import { StripeProvider } from '@stripe/stripe-react-native'

import WelcomeScreen from "./app/screens/WelcomeLogin/WelcomeScreen"
import LoginScreen from "./app/screens/WelcomeLogin/LoginScreen"
import SignUpScreen from "./app/screens/SignUp/SignUpScreen"

import HomeScreen from "./app/screens/Home/HomeScreen"

import HomeVetScreen from "./app/screens/Home/HomeVetScreen"
import HomeClientScreen from "./app/screens/Home/HomeClientScreen"


import CalendarScreen from "./app/screens/Calendar/CalendarScreen"

import MapScreen from "./app/screens/Map/MapScreen"
import ViewAppointmentScreen from "./app/screens/ViewAppointment/ViewAppointmentScreen"
import ViewAppointmentClientScreen from "./app/screens/ViewAppointment/ViewAppointmentClientScreen"
import SettingsScreen from "./app/screens/SettingsScreen/SettingsScreen"
import ChangePasswordScreen from "./app/screens/ChangePassword/ChangePasswordScreen"

import PaymentStripeScreen from "./app/screens/PaymentStripe/PaymentStripeScreen"
import CreatePetScreen from "./app/screens/CreatePet/CreatePetScreen"
import HistoryFormScreen from "./app/screens/CreatePet/CreateHistoryFormScreen"
import EditPetScreen from "./app/screens/EditPet/EditPetScreen"
import EditHistoryFormScreen from "./app/screens/EditPet/EditHistoryFormScreen"
import LocationScreen from "./app/screens/Location/LocationScreen"

import CreateReviewScreen from "./app/screens/CreateReview/CreateReviewScreen"
import CreateReviewClientScreen from "./app/screens/CreateReview/CreateReviewClientScreen"
import CreateReviewVetScreen from "./app/screens/CreateReview/CreateReviewVetScreen"

import AccountScreen from './app/screens/Account/AccountScreen'
import CreateAppointmentScreen from './app/screens/CreateAppointment/CreateAppointmentScreen'
import ViewAppointmentVetScreen from './app/screens/ViewAppointment/ViewAppointmentVetScreen'
import VetDuringAppointment1Screen from './app/screens/DuringAppointment/VetDuringAppointment1Screen'
import VetDuringAppointment2Screen from './app/screens/DuringAppointment/VetDuringAppointment2Screen'
import VetAddChargesScreen from './app/screens/VetAddCharges/VetAddChargesScreen'
import MyAppointmentsScreen from './app/screens/ViewAppointment/MyAppointmentsScreen'
import ViewNearbyVetsScreen from './app/screens/ClientVetInteraction/ViewNearbyVetsScreen'
import VetDuringAppointmentMedicalHistoryScreen from './app/screens/DuringAppointment/VetDuringAppointmentMedicalHistoryScreen'
import AddtionalPetInfo from './app/screens/AdditionalPetInfo/AddtionalPetInfo'

import EmergencyScreen from "./app/screens/Emergency/EmergencyScreen"
import AnnualScreen from "./app/screens/AnnualCheckup/AnnualScreen"
import CheckupExamScreen from './app/screens/DuringAppointment/CheckupExamScreen'
import CheckupSummaryScreen from './app/screens/DuringAppointment/CheckupSummaryScreen'

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <>
            <StripeProvider
                publishableKey="pk_test_51NuSFtAKQypxdsPLEN8Es2E2rsjiHIoc1HciGPGkGJWlLXh7Swe6BzFmjatoB6Rzz3YMjrOzzpaWQGPv803HNRF100zjr9j19s"
                urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
                merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
            >
                <IconRegistry icons={EvaIconsPack} />
                <ApplicationProvider {...eva} theme={eva.light}>
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen name="Welcome" component={WelcomeScreen as React.FC} options={{ headerShown: false }} />
                            <Stack.Screen name="Login" component={LoginScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="SignUp" component={SignUpScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="Location" component={LocationScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="Home" component={HomeScreen as React.FC} options={{ title: "", headerShown: false }} />
                            <Stack.Screen name="HomeClient" component={HomeClientScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="VetHome" component={HomeVetScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="CreateAppointment" component={CreateAppointmentScreen as React.FC}
                                options={{ title: "" }} />
                            <Stack.Screen name="MyAppointments" component={MyAppointmentsScreen as React.FC}
                                options={{ title: "" }} />
                            <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={{ title: "" }} />
                            <Stack.Screen name="ViewAppointment" component={ViewAppointmentScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="ViewAppointmentClient" component={ViewAppointmentClientScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="ViewAppointmentVet" component={ViewAppointmentVetScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="ViewNearbyVets" component={ViewNearbyVetsScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="Map" component={MapScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="Settings" component={SettingsScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="PaymentStripe" component={PaymentStripeScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="EditPet" component={EditPetScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="EditHistoryForm" component={EditHistoryFormScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="CreatePet" component={CreatePetScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="HistoryForm" component={HistoryFormScreen as React.FC} options={{ title: ""}} />
                            <Stack.Screen name="CreateReview" component={CreateReviewScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="CreateReviewClient" component={CreateReviewClientScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="CreateReviewVet" component={CreateReviewVetScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="VetAddCharges" component={VetAddChargesScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="AdditionalPetInfo" component={AddtionalPetInfo as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="VetDuringAppointmentMedicalHistory" component={VetDuringAppointmentMedicalHistoryScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="VetDuringAppointment1" component={VetDuringAppointment1Screen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="VetDuringAppointment2" component={VetDuringAppointment2Screen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="CheckupExam" component={CheckupExamScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="CheckupSummary" component={CheckupSummaryScreen as React.FC} options={{ title: "" }} />
                            <Stack.Screen name="Account" component={AccountScreen as React.FC} options={{ title: "" }} />

                            <Stack.Screen name="Emergency" component={EmergencyScreen as React.FC} options={{ title: "" }} />

                            <Stack.Screen name="AnnualCheckup" component={AnnualScreen as React.FC} options={{title: ""}} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </ApplicationProvider>
            </StripeProvider>
        </>
    )
}
