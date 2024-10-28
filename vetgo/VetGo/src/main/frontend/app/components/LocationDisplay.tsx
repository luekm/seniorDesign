import { Text, View } from 'react-native'
import { GOOGLE_MAPS_APIKEY } from '../screens/shared/Constants'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { UserDetailsParams } from '../utils/params'
import { ClientHomeScreenNavigationProp, VetHomeScreenNavigationProp } from '../utils/props'
import { LocationInterface } from '../screens/shared/Interfaces'
import { LocationScreenParams } from '../screens/Location/LocationScreen'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'

interface LocationDisplayProps {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface
    navigation: ClientHomeScreenNavigationProp
}

export const LocationDisplay: React.FC<LocationDisplayProps> = ({ userId, userIsVet, location, navigation }) => {
    const [locationName, setLocationName] = useState<String>("")

    useEffect(() => {
        getLocationString(location.latitude, location.longitude).then((locationString) =>
            setLocationName(locationString))
    }, [])

    return <View>
        <View style={{ display: 'flex' }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', width: "100%" }}>{locationName}</Text>
            <Text style={{ fontSize: 12, textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Location', { userId: userId, userIsVet: userIsVet, location: location } as LocationScreenParams)}>Tap to change</Text>
        </View>

    </View>
}

export const getLocationString = async (latitude: number, longitude: number) => {
    const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=${GOOGLE_MAPS_APIKEY}`)
    const locationString = res.data.plus_code.compound_code
    const splitLocationString = locationString.split(" ")
    return splitLocationString.slice(1, splitLocationString.length).join(" ")
}