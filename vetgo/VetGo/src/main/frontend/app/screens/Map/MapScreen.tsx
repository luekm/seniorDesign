//install npm i react-native-maps-directions
//install npm i react-native-geolocation-service

import React, { useEffect, useRef, useState } from 'react'
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import MapView, { Marker, AnimatedRegion, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_APIKEY } from "../shared/Constants"
import { mapStyles } from './MapStyles'
import { LocationInterface } from '../shared/Interfaces'
import { MapScreenNavigationProp, MapScreenRouteProp } from '../../utils/props'

export interface MapScreenParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface,
    destinationLocation: LocationInterface
}


function MapScreen(props: { route: MapScreenRouteProp, navigation: MapScreenNavigationProp }) {
	
	let globalLat = null;
    let globalLng = null;

    const params: MapScreenParams = props.route.params as MapScreenParams

    const screen = Dimensions.get('window')
    const ASPECT_RATIO = screen.width / screen.height
    const LATITUDE_DELTA = 0.0922
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

    const mapRef = useRef<any>()
    
    const findClosestVet = async (latitude, longitude) => {
    	const radius = 5000; // Search within a 5km radius
    	const type = 'veterinary_care';
    	const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${GOOGLE_MAPS_APIKEY}`;

    	try {
        	const response = await fetch(url);
        	const json = await response.json();
        	if (json.results.length > 0) {
            	const closestVet = json.results[0]; // Assuming the first result is the closest
            	globalLat = closestVet.geometry.location.lat;
            	globalLng = closestVet.geometry.location.lng;
        	}
    	} catch (error) {
        	console.error(error);
    	}
	};


    //change origin and destination to look up from backend
    const [state, setState] = useState({
        origin: params.location,
        //destination: null,
         destination: {
        latitude: 42.010382,
        longitude: -93.682144
    },
        time: 0,
        distance: 0,
    })

// Function to find nearest vet using API
useEffect(() => {
    findClosestVet(params.location.latitude, params.location.longitude).then(() => {
        if (globalLat && globalLng) {
            setState(prevState => ({
                ...prevState,
                destination: {
                    latitude: globalLat,
                    longitude: globalLng,
                },
            }));
        }
    });
// This effect depends on params.location, so im including it in the dependencies array
}, [params.location]);

    
    const { origin, destination, time, distance } = state

    const fetchTime = (d: any, t: any) => {
        setState(state => ({ ...state, distance: d, time: t }))
    }

    return (
        <View style={{ flex: 1 }}>
            {distance !== 0 && time !== 0 && (<View style={{ alignItems: 'center', marginVertical: 16 }}>
                <Text> Time left: {time.toFixed(1)} min</Text>
                <Text> Distance left: {distance.toFixed(2)} mile</Text>
            </View>)}
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
                        strokeColor="green"
                        optimizeWaypoints={true}
                        onReady={result => {
                            console.log(`Distance: ${result.distance} km`)
                            console.log(`Distance: ${result.duration} min`)
                            fetchTime(result.distance * 0.621371, result.duration)
                            // mapRef.current.fitToCoordinates(result.coordinates, {
                            //     edgePadding: {}
                            // })
                        }}
                    />
                </MapView>
            </View>
        </View>
    )
};


export default MapScreen
