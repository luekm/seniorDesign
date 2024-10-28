import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Pressable,
    Alert,
    TouchableHighlight,
    TextInput
} from "react-native"
import { Input, Button } from "@ui-kitten/components"
import * as Location from 'expo-location'
import { GoogleAutoComplete } from "../shared/Components"
// import { useStateContext } from '../../utils/stateContext'
import { UserDetailsParams, UserDetails_Location, UserDetails_User } from '../../utils/params'
import { LocationScreenNavigationProp, LocationScreenRouteProp } from '../../utils/props'
import { locationStyles } from "./LocationStyles"
import { LocationInterface } from '../shared/Interfaces'
import { HomeScreenParams } from '../Home/HomeScreen'
import { BASE_URL } from '../shared/Constants'
import axios from 'axios'

export interface LocationScreenParams {
    userId: string,
    userIsVet: boolean,
}

function LocationScreen(props: { route: LocationScreenRouteProp, navigation: LocationScreenNavigationProp }) {

    // hydrate the params
    let params: LocationScreenParams = props.route.params as LocationScreenParams

    const [errors, setError] = useState<any>({})
    const [destinationCoords, setDestinationCoords] = useState<LocationInterface>({
        latitude: 0,
        longitude: 0,
    })

    useEffect(() => {
        getLocationByUserId(params.userId).then((location) => {
            // if location is already specified, fetch coords and navigate to home
            if (location.latitude && location.longitude) {
                let homeScreenParams: HomeScreenParams = {
                    userId: params.userId,
                    userIsVet: params.userIsVet,
                    location: { latitude: location.latitude, longitude: location.longitude } as LocationInterface,
                }

                props.navigation.navigate("Home", homeScreenParams)
            }
        }).catch((error) => {
            console.log(error.message)
        })

    }, [])



    const fetchDestinationCoords = (latitude: number, longitude: number) => {
        setDestinationCoords({
            latitude,
            longitude
        })
    }

    const handleSubmit = async () => {
        if (destinationCoords.latitude === 0 && destinationCoords.longitude === 0) {
            setError({ location: "Location is required" })
            return
        }

        // api call to update location
        setLocationCoordinates(params.userId, destinationCoords)

        let homeScreenParams: HomeScreenParams = {
            userId: params.userId,
            userIsVet: params.userIsVet,
            location: destinationCoords as LocationInterface,
        }

        props.navigation.navigate("Home", homeScreenParams)

    }

    return (
        <SafeAreaView style={locationStyles.background}>
            <View style={locationStyles.container}>
                <Text style={locationStyles.titleText}>Location</Text>

                <View style={{ minWidth: "100%", height: 300 }}>
                    <Text style={locationStyles.titleText}>If you would like to change location, enter here</Text>
                    <GoogleAutoComplete
                        placeholderText="Enter Destination Location"
                        fetchAddress={fetchDestinationCoords}
                    />
                    <Text style={locationStyles.errorText}>{errors.location}</Text>
                </View>


                <Button style={locationStyles.create} onPress={handleSubmit}>
                    <Text> Submit </Text>
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default LocationScreen

export const getLocationByUserId = async (userId: string): Promise<LocationInterface> => {
    const response = await axios.get(`${BASE_URL}/api/user/id/${userId}`)
    const latitude = response.data.latitude
    const longitude = response.data.longitude

    return {
        latitude, longitude
    }
}

export const setLocationCoordinates = async (userId: string, location: LocationInterface) => {
    const response = axios.put(`${BASE_URL}/api/user/update/location/${userId}`, location).then((response) =>
        console.log(response.data)).catch((error: any) => console.log(error))
}
