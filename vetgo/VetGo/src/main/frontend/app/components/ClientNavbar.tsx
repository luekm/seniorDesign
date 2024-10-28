import * as React from 'react'
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components"
import { useState, useEffect } from "react"
import { FontAwesome5 } from '@expo/vector-icons'
import { styles } from "../screens/shared/Styles"
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList, UserDetailsParams } from '../utils/params'
import { LocationInterface } from '../screens/shared/Interfaces'
import { HomeScreenParams } from '../screens/Home/HomeScreen'
import { MyAppointmentsScreenParams } from '../screens/ViewAppointment/MyAppointmentsScreen'
import { SettingsScreenParams } from '../screens/SettingsScreen/SettingsScreen'
import { colors } from '../screens/shared/Colors'
import { ViewNearbyVetsParams } from '../screens/ClientVetInteraction/ViewNearbyVetsScreen'


export interface ClientNavbarParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface,
    navigation: NavigationProp<RootStackParamList, any>
}
// TODO: added another navbar for vets
const ClientNavbar: React.FC<ClientNavbarParams> = ({ userId, userIsVet, location, navigation }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    
    if (!userId) {
        console.log('Client Navbar is missing user details')
        return null
    }

    useEffect(() => {
        switch (navigation.getState().routes[navigation.getState().routes.length - 1].name) {
            case "HomeClient":
                setSelectedIndex(0)
                break;
            case "MyAppointments":
                setSelectedIndex(1)
                break;
            case "ViewNearbyVets":
                setSelectedIndex(2)
                break;
            case "Settings":
                setSelectedIndex(3)
                break;
            default:
                break;
        }
    }, [navigation]);

    const handleTabSelect = (index: number) => {
        setSelectedIndex(index)

        // Use a switch statement or if-else to trigger different functions
        switch (index) {
            case 0:
                // TODO
                let homeScreenParams: HomeScreenParams = {
                    userId: userId,
                    userIsVet: userIsVet,
                    location: location,
                }
                navigation.navigate("Home", homeScreenParams)
                break
            case 1:
                // TODO
                let myAppointmentsParams: MyAppointmentsScreenParams = {
                    userId: userId,
                    userIsVet: userIsVet,
                    location: location,
                }

                navigation.navigate("MyAppointments", myAppointmentsParams)
                break
            case 2:
                let viewNearbyVetsParams: ViewNearbyVetsParams = {
                    userId: userId,
                    userIsVet: userIsVet,
                    location: location,
                }
                navigation.navigate("ViewNearbyVets", viewNearbyVetsParams)
                break
            case 3:
                let settingParams: SettingsScreenParams = {
                    userId: userId,
                    userIsVet: userIsVet,
                    location: location,
                }
                navigation.navigate("Settings", settingParams)
                break
            default:
                break
        }
    }

    return (
        <BottomNavigation
            selectedIndex={selectedIndex}
            onSelect={handleTabSelect}
        >
            <BottomNavigationTab
                title='Pets'
                icon={<FontAwesome5 name='dog' color={selectedIndex === 0 ? colors.blue : colors.darkGrey} size={24} />}
            />
            <BottomNavigationTab
                title='Appointments'
                selected={selectedIndex === 1}
                icon={<FontAwesome5 name='calendar-alt' color={selectedIndex === 1 ? colors.blue : colors.darkGrey} size={24} />}
            />
            <BottomNavigationTab
                title='Veterinarians'
                icon={<FontAwesome5 name='user-md' color={selectedIndex === 2 ? colors.blue : colors.darkGrey} size={24} />}

            />
            <BottomNavigationTab
                title='Settings'
                icon={<FontAwesome5 name='cog' color={selectedIndex === 3 ? colors.blue : colors.darkGrey} size={24} />}

            />
        </BottomNavigation>
    )
}

export default ClientNavbar
