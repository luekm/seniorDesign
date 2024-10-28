import React, { useEffect, useRef, useState } from 'react'
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, Dimensions, PermissionsAndroid, Platform, ActivityIndicator } from 'react-native'
import MapView, { Marker, AnimatedRegion, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_APIKEY } from "../shared/Constants"
import { mapStyles } from './MapStyles'
import { LocationInterface } from '../shared/Interfaces'
import { MapScreenNavigationProp, MapScreenRouteProp } from '../../utils/props'
import * as Location from 'expo-location';
import call from 'react-native-phone-call'


export interface EmergencyScreenParams {
    userId: string,
    userIsVet: boolean
}

/*
function EmergencyMapScreen(props: { navigation: any }) {
    const [state, setState] = useState({
        origin: { latitude: 0, longitude: 0 },
        destination: { latitude: 0, longitude: 0 },
        phoneNumber: '', // Added this to hold the phone number
        time: 0,
        distance: 0,
    });
    */
   
   function EmergencyMapScreen(props) {
    const [state, setState] = useState({
        origin: null, // Set initial origin to null
        destination: { latitude: 0, longitude: 0 },
        phoneNumber: '', //holds phone number
        clinicName: '', // New state variable to hold the clinic name
        time: 0,
        distance: 0,
        isLoading: true // Add a loading state
    });

    const mapRef = useRef<any>();
    const screen = Dimensions.get('window');
    const ASPECT_RATIO = screen.width / screen.height;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                setState(s => ({ ...s, isLoading: false }));
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setState(prevState => ({
                ...prevState,
                origin: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                },
                destination: prevState.destination, // maintain existing destination if any
                isLoading: false // Set loading to false once location is fetched
            }));
            findEmergencyVet(location.coords.latitude, location.coords.longitude);
        })();
    }, []);

    const findEmergencyVet = async (latitude, longitude) => {
        const radius = 10000;
        const type = 'veterinary_care';
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${GOOGLE_MAPS_APIKEY}`;

        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);
            if (json.results.length > 0) {
                const closestVet = json.results[0];
                const placeId = closestVet.place_id;  // Extract the place_id of the closest vet
                const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_phone_number&key=${GOOGLE_MAPS_APIKEY}`;
                const detailsResponse = await fetch(detailsUrl);
                //console.log("Full details response:", detailsJson);
            	const detailsJson = await detailsResponse.json();
            	
            	
            	const phoneNumber = detailsJson.result.formatted_phone_number || 'No Number Found'; // Fallback
            	const clinicName = detailsJson.result.name || "No Name Found"; // Fetch the clinic name
            	
            	//console.log("Phone Number:", phoneNumber); // Verify phone number
				//console.log("Clinic Name:", clinicName); // Verify clinic name
                
                //const phoneNumber = 'No Number Found'; // Testing with my number
                
                console.log(closestVet);  // Log the first result to inspect its structure
                setState(prevState => ({
                    ...prevState,
                    destination: {
                        latitude: closestVet.geometry.location.lat,
                        longitude: closestVet.geometry.location.lng,
                    },
                    phoneNumber: phoneNumber, // set phone number
                    //clinicName: clinicName,  // Set clinic name from details response
                }));
            }
        } catch (error) {
            console.error("Error fetching vet details: ", error);
        }
    };
    
    const triggerCall = (phoneNumber) => {
        if (phoneNumber) {
            const args = {
                number: phoneNumber,
                prompt: true,
            };
            call(args).catch(console.error);
        } else {
            alert("No phone number available");
        }
    };

    const { origin, destination, time, distance, phoneNumber, isLoading } = state;
    
    if (isLoading) {
        // Render a loading spinner or similar indicator
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

return (            
 <View style={{ flex: 1 }}>
        {distance !== 0 && time !== 0 && (
            <View style={{ alignItems: 'center', marginVertical: 16 }}>
                <TouchableOpacity onPress={() => triggerCall(phoneNumber)} style={{ padding: 10, backgroundColor: '#ddd', alignItems: 'center' }}>
                    <Text>Call Vet Clinic: {phoneNumber}</Text>
                </TouchableOpacity>
                <Text>Distance: {distance.toFixed(2)} mile</Text>
            </View>
        )}
        <View style={{ flex: 1 }}>
                <MapView
                    // ref={mapRef}
                    style={StyleSheet.absoluteFill}
                    initialRegion={{
                        ...origin,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }}
                >
                    <Marker
                        coordinate={origin}
                    />
                    <Marker
                        coordinate={destination}
                    />
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={5}
                        strokeColor="red"
                        onReady={result => {
                            console.log(`Distance: ${result.distance} km`)
                            console.log(`Distance: ${result.duration} min`)
                            setState(prevState => ({
                                ...prevState,
                                distance: result.distance * 0.621371, // Convert km to miles
                                time: result.duration,
                            }));
                        }}
                        onError={(errorMessage) => {
                            console.log('GMAPS route request error: ', errorMessage);
                        }}
                    />
            </MapView>
        </View>
    </View>
);
}
export default EmergencyMapScreen;