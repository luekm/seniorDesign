import { IndexPath, Menu, MenuItem } from '@ui-kitten/components'
import { useState } from 'react'
import { View, Text } from 'react-native'
import { LocationInterface } from '../shared/Interfaces'
import ClientNavbar from '../../components/ClientNavbar'

export interface MenuScreenParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface
}
const MenuScreen = (props: any) => {
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0))
    const params = props.route.params as MenuScreenParams

    console.log(`### menu screen ${JSON.stringify(params)}`)

    return (
        <View>
            <Menu
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}
            >
                <MenuItem title='My Pets' onPress={() => props.navigation.navigate('Home', params)} />
                <MenuItem title='Appointments' onPress={() => props.navigation.navigate('ViewAppointment')} />
                <MenuItem title='Account' onPress={() => props.navigation.navigate('Account', params)} />
                <MenuItem title='Settings' onPress={() => props.navigation.navigate('Settings')} />
                <MenuItem title='Logout' onPress={() => props.navigation.navigate('Welcome')} />
                <MenuItem title='Create review' onPress={() => props.navigation.navigate('CreateReview',
                    {
                        appointment: 1,
                        reviewer: { userAccount: { id: 6 }, vetLicense: 1 },
                        reviewee: { firstName: "ree", userAccount: { id: 7, averageRating: 5 } },
                        reviewerlocation: { latitude: 1, longitude: 1 }
                    }
                )} />


            </Menu>

            <ClientNavbar navigation={props.navigation} {...params} />
        </View>
    )
}

export default MenuScreen
